// "use client";
// // components/FaceRecognition.js
// import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";

// export default function FaceRecognition() {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [newUserData, setNewUserData] = useState<{
//     name: string;
//     descriptor: number[];
//   }>({ name: "", descriptor: [] });

//   useEffect(() => {
//     const loadModels = async () => {
//       await Promise.all([
//         faceapi.nets.ageGenderNet.loadFromUri("/models/age_gender_model"),
//         faceapi.nets.ssdMobilenetv1.loadFromUri("/models/ssd_mobilenetv1"),
//         faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector"),
//         faceapi.nets.faceLandmark68Net.loadFromUri("/models/face_landmark_68"),
//         faceapi.nets.faceRecognitionNet.loadFromUri("/models/face_recognition"),
//         faceapi.nets.faceExpressionNet.loadFromUri("/models/face_expression"),
//       ]);
//       startVideo();
//     };

//     const startVideo = () => {
//       navigator.getUserMedia(
//         { video: {} },
//         (stream) => (videoRef.current.srcObject = stream),
//         (err) => console.error(err)
//       );
//     };

//     loadModels();
//   }, []);

//   useEffect(() => {
//     const handleVideoPlay = async () => {
//       const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//       document.body.append(canvas);
//       const displaySize = {
//         width: videoRef.current.width,
//         height: videoRef.current.height,
//       };
//       faceapi.matchDimensions(canvas, displaySize);

//       setInterval(async () => {
//         const detections = await faceapi
//           .detectAllFaces(
//             videoRef.current,
//             new faceapi.TinyFaceDetectorOptions()
//           )
//           .withFaceExpressions()
//           .withAgeAndGender()
//           .withFaceDescriptors();

//         const resizedDetections = faceapi.resizeResults(
//           detections,
//           displaySize
//         );
//         canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//         for (const detection of resizedDetections) {
//           const box = detection.detection.box;
//           const drawBox = new faceapi.draw.DrawBox(box, {
//             label: "Processing...",
//           });

//           console.log(detection.descriptor);

//           drawBox.draw(canvas);

//           setNewUserData((prev) => ({
//             ...prev,
//             descriptor: Array.from(detection.descriptor),
//           }));

//           try {
//             const response = await fetch(
//               "http://localhost:3001/check-attendance",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   faceDescriptor: Array.from(detection.descriptor),
//                 }),
//               }
//             );
//             const result = await response.json();

//             console.log(result);

//             const {
//               label = "unknown",
//               age = "unknown",
//               gender = "unknown",
//               genderProbability,
//             } = result;
//             new faceapi.draw.DrawTextField(
//               [
//                 `${label}`,
//                 `${Math.round(age)} years`,
//                 `${gender} ${Math.round(genderProbability)}`,
//               ],
//               detection.detection.box.bottomRight
//             ).draw(canvas);
//           } catch (error) {
//             console.error("Error recognizing face:", error);
//             new faceapi.draw.DrawTextField(
//               [
//                 "Error",
//                 `${Math.round(detection.age)} years`,
//                 `${detection.gender} ${Math.round(
//                   detection.genderProbability
//                 )}`,
//               ],
//               detection.detection.box.bottomRight
//             ).draw(canvas);
//           }
//         }

//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       }, 3000);
//     };

//     videoRef.current.addEventListener("play", handleVideoPlay);
//   }, []);

//   async function handleRegisterUser() {
//     try {
//       const response = await fetch("http://localhost:3001/save-face", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: newUserData.name,
//           faceDescriptor: Array.from(newUserData.descriptor),
//         }),
//       });
//       const result = await response.json();
//       console.log(result);
//     } catch (error) {
//       console.error("Error recognizing face:", error);
//     }
//   }

//   console.log(newUserData);

//   return (
//     <>
//       <video ref={videoRef} width="720" height="560" autoPlay muted />
//       <input
//         className="mt-8"
//         type="text"
//         onChange={(e) => {
//           setNewUserData((prev) => ({ ...prev, name: e.target.value }));
//         }}
//       />
//       <button type="submit" onClick={handleRegisterUser}>
//         add new user
//       </button>
//     </>
//   );
// }

// "use client";
// import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";

// interface FaceData {
//   name: string;
//   faceDescriptor: number[];
// }

// const loggedFaceDatabase: FaceData[] = [];

// const DISTANCE_THRESHOLD = 0.6;

// const euclideanDistance = (desc1: number[], desc2: number[]): number => {
//   let sum = 0;
//   for (let i = 0; i < desc1.length; i++) {
//     sum += Math.pow(desc1[i] - desc2[i], 2);
//   }
//   return Math.sqrt(sum);
// };

// function checkIsUserLogged(faceDescriptor: number[]) {
//   if (!Array.isArray(faceDescriptor)) {
//     return false;
//   }

//   let bestMatch = null;
//   let smallestDistance = Infinity;

//   loggedFaceDatabase.forEach((faceData) => {
//     const distance = euclideanDistance(faceDescriptor, faceData.faceDescriptor);
//     if (distance < smallestDistance) {
//       smallestDistance = distance;
//       bestMatch = faceData.name;
//     }
//   });

//   if (smallestDistance <= DISTANCE_THRESHOLD && bestMatch) {
//     return true;
//   } else {
//     return false;
//   }
// }

// export default function FaceRecognition() {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [isFecthing, setIsFetching] = useState(false);
//   const [newUserData, setNewUserData] = useState<{
//     name: string;
//     descriptor: number[];
//   }>({ name: "", descriptor: [] });

//   useEffect(() => {
//     const loadModels = async () => {
//       await Promise.all([
//         faceapi.nets.ssdMobilenetv1.loadFromUri("/models/ssd_mobilenetv1"),
//         faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector"),
//         faceapi.nets.faceLandmark68Net.loadFromUri("/models/face_landmark_68"),
//         faceapi.nets.faceRecognitionNet.loadFromUri("/models/face_recognition"),
//       ]);
//       startVideo();
//     };

//     const startVideo = () => {
//       navigator.getUserMedia(
//         { video: {} },
//         (stream) => (videoRef.current.srcObject = stream),
//         (err) => console.error(err)
//       );
//     };

//     loadModels();
//   }, []);

//   useEffect(() => {
//     const handleVideoPlay = async () => {
//       const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//       document.body.append(canvas);
//       const displaySize = {
//         width: videoRef.current.width,
//         height: videoRef.current.height,
//       };
//       faceapi.matchDimensions(canvas, displaySize);

//       setInterval(async () => {
//         const detections = await faceapi
//           .detectAllFaces(
//             videoRef.current,
//             new faceapi.TinyFaceDetectorOptions()
//           )
//           .withFaceLandmarks()
//           .withFaceDescriptors();

//         const resizedDetections = faceapi.resizeResults(
//           detections,
//           displaySize
//         );
//         canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//         for (const detection of resizedDetections) {
//           const box = detection.detection.box;
//           const drawBox = new faceapi.draw.DrawBox(box, {
//             label: "Processing...",
//           });

//           drawBox.draw(canvas);

//           const descriptor = Array.from(detection.descriptor);

//           setNewUserData((prev) => ({
//             ...prev,
//             descriptor: Array.from(detection.descriptor),
//           }));

//           if (checkIsUserLogged(descriptor)) {
//             console.log("User already recognized, skipping backend call");
//             continue;
//           }

//           if (!isFecthing) {
//             try {
//               setIsFetching(true);
//               const response = await fetch(
//                 "http://localhost:3001/check-attendance",
//                 {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({ faceDescriptor: descriptor }),
//                 }
//               );
//               const result = await response.json();

//               const { label = "unknown" } = result;

//               canvas
//                 .getContext("2d")
//                 .clearRect(0, 0, canvas.width, canvas.height);

//               new faceapi.draw.DrawTextField(
//                 [`${label}`],
//                 detection.detection.box.bottomRight
//               ).draw(canvas);

//               // Mark the user as recognized
//               if (!checkIsUserLogged(descriptor)) {
//                 loggedFaceDatabase.push({
//                   name: result.name,
//                   faceDescriptor: descriptor,
//                 });
//               }
//               setIsFetching(false);
//             } catch (error) {
//               setIsFetching(false);
//               console.error("Error recognizing face:", error);
//               canvas
//                 .getContext("2d")
//                 .clearRect(0, 0, canvas.width, canvas.height);
//               new faceapi.draw.DrawTextField(
//                 ["Error"],
//                 detection.detection.box.bottomRight
//               ).draw(canvas);
//             }
//           }
//         }

//         faceapi.draw.drawDetections(canvas, resizedDetections);
//       }, 100);
//     };

//     videoRef.current.addEventListener("play", handleVideoPlay);
//   }, []);

//   async function handleRegisterUser() {
//     try {
//       const response = await fetch("http://localhost:3001/save-face", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: newUserData.name,
//           faceDescriptor: Array.from(newUserData.descriptor),
//         }),
//       });
//       const result = await response.json();
//       console.log(result);
//     } catch (error) {
//       console.error("Error recognizing face:", error);
//     }
//   }

//   return (
//     <>
//       <video ref={videoRef} width="720" height="560" autoPlay muted />
//       <input
//         className="mt-8"
//         type="text"
//         onChange={(e) => {
//           setNewUserData((prev) => ({ ...prev, name: e.target.value }));
//         }}
//       />
//       <button type="submit" onClick={handleRegisterUser}>
//         add new user
//       </button>
//     </>
//   );
// }

// "use client";
// import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";

// interface FaceData {
//   name: string;
//   faceDescriptor: number[];
// }

// let loggedFaceDatabase: FaceData[] = [];

// const DISTANCE_THRESHOLD = 0.6;

// const euclideanDistance = (desc1: number[], desc2: number[]): number => {
//   let sum = 0;
//   for (let i = 0; i < desc1.length; i++) {
//     sum += Math.pow(desc1[i] - desc2[i], 2);
//   }
//   return Math.sqrt(sum);
// };

// function checkIsUserLogged(faceDescriptor: number[]): string | boolean {
//   if (!Array.isArray(faceDescriptor)) {
//     return false;
//   }

//   let bestMatch = null;
//   let smallestDistance = Infinity;

//   loggedFaceDatabase.forEach((faceData) => {
//     const distance = euclideanDistance(faceDescriptor, faceData.faceDescriptor);
//     if (distance < smallestDistance) {
//       smallestDistance = distance;
//       bestMatch = faceData.name;
//     }
//   });

//   return smallestDistance <= DISTANCE_THRESHOLD && bestMatch !== null
//     ? bestMatch
//     : false;
// }

// export default function FaceRecognition() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isFetching, setIsFetching] = useState(false);
//   const [newUserData, setNewUserData] = useState<{
//     name: string;
//     descriptor: number[];
//   }>({ name: "", descriptor: [] });

//   useEffect(() => {
//     const loadModels = async () => {
//       await Promise.all([
//         faceapi.nets.ssdMobilenetv1.loadFromUri("/models/ssd_mobilenetv1"),
//         faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector"),
//         faceapi.nets.faceLandmark68Net.loadFromUri("/models/face_landmark_68"),
//         faceapi.nets.faceRecognitionNet.loadFromUri("/models/face_recognition"),
//       ]);
//       startVideo();
//     };

//     const startVideo = () => {
//       navigator.getUserMedia(
//         { video: {} },
//         (stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         },
//         (err) => console.error(err)
//       );
//     };

//     loadModels();
//   }, []);

//   useEffect(() => {
//     const handleVideoPlay = async () => {
//       if (!videoRef.current) return;

//       const video = videoRef.current;
//       const canvas = faceapi.createCanvasFromMedia(video);
//       canvasRef.current = canvas;
//       document.body.append(canvas);
//       const displaySize = {
//         width: video.width,
//         height: video.height,
//       };
//       faceapi.matchDimensions(canvas, displaySize);

//       setInterval(async () => {
//         console.log(loggedFaceDatabase);
//         if (!video.paused && !video.ended) {
//           const detections = await faceapi
//             .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//             .withFaceLandmarks()
//             .withFaceDescriptors();

//           const resizedDetections = faceapi.resizeResults(
//             detections,
//             displaySize
//           );

//           const context = canvas.getContext("2d");
//           context?.clearRect(0, 0, canvas.width, canvas.height);
//           faceapi.draw.drawDetections(canvas, resizedDetections);

//           for (const detection of resizedDetections) {
//             const descriptor = Array.from(detection.descriptor);

//             setNewUserData((prev) => ({
//               ...prev,
//               descriptor: descriptor,
//             }));

//             if (checkIsUserLogged(descriptor)) {
//               console.log("User already recognized, skipping backend call");
//               new faceapi.draw.DrawTextField(
//                 [checkIsUserLogged(descriptor).toString()],
//                 detection.detection.box.bottomRight
//               ).draw(canvas);
//               continue;
//             }

//             if (!isFetching) {
//               try {
//                 setIsFetching(true);
//                 const response = await fetch(
//                   "http://localhost:3001/check-attendance",
//                   {
//                     method: "POST",
//                     headers: {
//                       "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ faceDescriptor: descriptor }),
//                   }
//                 );

//                 if (response.status === 404) {
//                   new faceapi.draw.DrawTextField(
//                     ["unknown"],
//                     detection.detection.box.bottomRight
//                   ).draw(canvas);
//                   if (!checkIsUserLogged(descriptor)) {
//                     loggedFaceDatabase = [
//                       {
//                         name: "unknown",
//                         faceDescriptor: descriptor,
//                       },
//                     ];
//                   }
//                 } else {
//                   const result = await response.json();
//                   const { name = "unknown" } = result;

//                   new faceapi.draw.DrawTextField(
//                     [`${name}`],
//                     detection.detection.box.bottomRight
//                   ).draw(canvas);

//                   // Mark the user as recognized
//                   if (!checkIsUserLogged(descriptor)) {
//                     loggedFaceDatabase = [
//                       {
//                         name: result.name,
//                         faceDescriptor: descriptor,
//                       },
//                     ];
//                   }
//                   setIsFetching(false);
//                 }
//               } catch (error) {
//                 setIsFetching(false);
//                 console.error("Error recognizing face:", error);
//                 new faceapi.draw.DrawTextField(
//                   ["Unkown"],
//                   detection.detection.box.bottomRight
//                 ).draw(canvas);
//               }
//             }
//           }
//         }
//       }, 100); // Increased interval to 500ms for better performance
//     };

//     if (videoRef.current) {
//       videoRef.current.addEventListener("play", handleVideoPlay);
//     }

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.removeEventListener("play", handleVideoPlay);
//       }
//     };
//   }, []);

//   async function handleRegisterUser() {
//     try {
//       const response = await fetch("http://localhost:3001/save-face", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: newUserData.name,
//           faceDescriptor: Array.from(newUserData.descriptor),
//         }),
//       });
//       const result = await response.json();
//       console.log(result);
//       loggedFaceDatabase = [
//         { name: newUserData.name, faceDescriptor: newUserData.descriptor },
//       ];
//       setNewUserData({ name: "", descriptor: [] });
//     } catch (error) {
//       console.error("Error recognizing face:", error);
//     }
//   }

//   return (
//     <>
//       <video ref={videoRef} width="720" height="560" autoPlay muted />
//       <input
//         className="mt-8"
//         type="text"
//         onChange={(e) => {
//           setNewUserData((prev) => ({ ...prev, name: e.target.value }));
//         }}
//       />
//       <button type="submit" onClick={handleRegisterUser}>
//         Add New User
//       </button>
//     </>
//   );
// }

import React from "react";

export default function FaceRecognition() {
  return <div>FaceRecognition</div>;
}

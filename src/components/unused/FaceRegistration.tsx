// "use client";

// import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import { useRouter } from "next/navigation";

// const BACKEND_URL = "http://localhost:3000/";

// const generateRandomName = () => {
//   const names = [
//     "John",
//     "Alice",
//     "Bob",
//     "Emma",
//     "David",
//     "Sarah",
//     "Michael",
//     "Emily",
//     "Daniel",
//   ];
//   const randomIndex = Math.floor(Math.random() * names.length);
//   return names[randomIndex];
// };

// const FaceRegistration: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [log, setLog] = useState<string[]>([]);
//   const [isFaceDataSaved, setIsFaceDataSaved] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     const startVideo = async () => {
//       try {
//         await faceapi.nets.tinyFaceDetector.loadFromUri(
//           "/models/tiny_face_detector"
//         );
//         await faceapi.nets.faceLandmark68Net.loadFromUri(
//           "/models/face_landmark_68"
//         );
//         await faceapi.nets.faceRecognitionNet.loadFromUri(
//           "/models/face_recognition"
//         );

//         navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         });
//       } catch (error) {
//         console.error("Error loading models:", error);
//       }
//     };

//     startVideo();

//     const saveFaceData = async (name: string, faceDescriptor: Float32Array) => {
//       try {
//         const response = await fetch(`${BACKEND_URL}/save-face`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "true",
//           },
//           body: JSON.stringify({
//             name,
//             faceDescriptor: Array.from(faceDescriptor),
//           }),
//         });
//         if (response.ok) {
//           console.log("Face data saved successfully");
//           setIsFaceDataSaved(true); // Set this to true after saving face data successfully
//           router.push("/success"); // Redirect to success page
//         } else {
//           console.error("Failed to save face data");
//         }
//       } catch (error) {
//         console.error("Error saving face data:", error);
//       }
//     };

//     const isGoodDetection = (detection: any) => {
//       return detection.detection.score > 0.99;
//     };

//     let isProcessing = false; // Flag to prevent multiple processing

//     if (videoRef.current && canvasRef.current) {
//       videoRef.current.addEventListener("play", () => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const displaySize = {
//           width: videoRef.current.videoWidth,
//           height: videoRef.current.videoHeight,
//         };
//         faceapi.matchDimensions(canvas, displaySize);

//         const updateCanvasSize = () => {
//           if (videoRef.current) {
//             const displaySize = {
//               width: videoRef.current.clientWidth,
//               height: videoRef.current.clientHeight,
//             };
//             canvas.width = displaySize.width;
//             canvas.height = displaySize.height;
//             faceapi.matchDimensions(canvas, displaySize);
//           }
//         };

//         updateCanvasSize();
//         window.addEventListener("resize", updateCanvasSize);

//         const interval = setInterval(async () => {
//           if (!isFaceDataSaved && !isProcessing) {
//             const detections = await faceapi
//               .detectAllFaces(
//                 videoRef.current!,
//                 new faceapi.TinyFaceDetectorOptions()
//               )
//               .withFaceLandmarks()
//               .withFaceDescriptors();

//             if (detections.length > 0) {
//               const goodDetections = detections.filter(isGoodDetection);
//               if (goodDetections.length > 0 && !isFaceDataSaved) {
//                 const detectionsString = JSON.stringify(goodDetections);
//                 setLog((prevLog) => [
//                   ...prevLog,
//                   `Good Detections: ${detectionsString}`,
//                 ]);
//                 console.log("Good detections:", detectionsString);

//                 const faceDescriptor = goodDetections[0].descriptor;
//                 const randomName = generateRandomName();
//                 saveFaceData(randomName, faceDescriptor);
//                 isProcessing = true; // Set flag to true to prevent further saves in this interval
//               }

//               const resizedDetections = faceapi.resizeResults(goodDetections, {
//                 width: canvas.width,
//                 height: canvas.height,
//               });
//               canvas
//                 .getContext("2d")
//                 ?.clearRect(0, 0, canvas.width, canvas.height);
//               faceapi.draw.drawDetections(canvas, resizedDetections);
//               faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//             }
//           }
//         }, 100);

//         return () => clearInterval(interval);
//       });
//     }
//   }, [isFaceDataSaved, router]); // The effect will re-run only if isFaceDataSaved or router changes

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100vh" }}>
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         style={{
//           transform: "scaleX(-1)",
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           top: 10,
//           left: 10,
//           background: "rgba(255, 255, 255, 0.7)",
//           padding: 10,
//         }}
//       >
//         <h3>Log:</h3>
//         <div style={{ maxHeight: 200, overflowY: "scroll" }}>
//           {log.map((entry, index) => (
//             <div key={index}>{entry}</div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FaceRegistration;

import React from "react";

export default function FaceRegistration() {
  return <div>FaceRegistration</div>;
}

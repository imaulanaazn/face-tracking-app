"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faCamera,
  faMountainSun,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const FaceRecognizer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedUser, setDetectedUser] = useState<{
    name: string;
    status: string;
  }>({
    name: "unknown",
    status: "not marked",
  });
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const inputFile = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState("");

  const knownFaces = useRef<{ name: string; descriptor: Float32Array }[]>([]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        "/models/tiny_face_detector"
      );
      await faceapi.nets.faceLandmark68Net.loadFromUri(
        "/models/face_landmark_68"
      );
      await faceapi.nets.faceRecognitionNet.loadFromUri(
        "/models/face_recognition"
      );
    };
    // loadModels()
    toast.promise(loadModels(), {
      pending: "Loading models",
      success: "Models loaded",
      error: "Failed to load models",
    });
  }, []);

  const startVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  }, []);

  const stopVideo = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const updateCanvasSize = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const displaySize = {
        width: videoRef.current.clientWidth,
        height: videoRef.current.clientHeight,
      };
      canvasRef.current.width = displaySize.width;
      canvasRef.current.height = displaySize.height;
      faceapi.matchDimensions(canvasRef.current, displaySize);
    }
  }, []);

  const isKnownFace = (descriptor: Float32Array) => {
    const distanceThreshold = 0.6;
    return knownFaces.current.some((face) => {
      const distance = faceapi.euclideanDistance(face.descriptor, descriptor);
      return distance < distanceThreshold;
    });
  };

  const handleNewFace = (descriptor: Float32Array) => {
    if (!isKnownFace(descriptor)) {
      checkAttendance(descriptor);
      const newFace = { name: "unknown", descriptor };
      knownFaces.current = [newFace];
    } else {
      console.error("face already detected");
    }
  };

  async function checkAttendance(descriptor: Float32Array) {
    const arrayDescriptor = Array.from(descriptor);
    try {
      const response = await fetch("http://localhost:3001/check-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ faceDescriptor: arrayDescriptor }),
      });
      if (response.status === 404) {
        setDetectedUser({ name: "unknown", status: "not marked" });
      } else {
        const result = await response.json();
        setDetectedUser({ name: result.name, status: "marked" });
      }
    } catch (error) {
      console.error("Error recognizing face:", error);
    }
  }

  useEffect(() => {
    const isGoodDetection = (detection: any) => detection.detection.score > 0.9;

    if (cameraActive) {
      startVideo();
      if (videoRef.current && canvasRef.current) {
        videoRef.current.addEventListener("play", () => {
          updateCanvasSize();
          window.addEventListener("resize", updateCanvasSize);

          const interval = setInterval(async () => {
            const detections = await faceapi
              .detectAllFaces(
                videoRef.current!,
                new faceapi.TinyFaceDetectorOptions()
              )
              .withFaceLandmarks()
              .withFaceDescriptors();

            if (detections.length > 0) {
              const goodDetections = detections.filter(isGoodDetection);
              if (goodDetections.length > 0) {
                const faceDescriptor = goodDetections[0].descriptor;
                handleNewFace(faceDescriptor);
              }

              if (canvasRef.current) {
                const context = canvasRef.current.getContext("2d");

                // Clear the previous frame
                context?.clearRect(
                  0,
                  0,
                  canvasRef.current.width,
                  canvasRef.current.height
                );

                // Flip context horizontally
                context?.scale(-1, 1);
                context?.translate(-canvasRef.current.width, 0);

                const resizedDetections = faceapi.resizeResults(
                  goodDetections,
                  {
                    width: canvasRef.current.width,
                    height: canvasRef.current.height,
                  }
                );

                // Draw detections and landmarks
                faceapi.draw.drawDetections(
                  canvasRef.current,
                  resizedDetections
                );
                faceapi.draw.drawFaceLandmarks(
                  canvasRef.current,
                  resizedDetections
                );

                // Reset context after drawing
                context?.setTransform(1, 0, 0, 1, 0, 0);
              }
            }
          }, 200);

          return () => {
            clearInterval(interval);
            window.removeEventListener("resize", updateCanvasSize);
          };
        });
      }
    } else {
      stopVideo();
    }
  }, [cameraActive, startVideo, stopVideo, updateCanvasSize]);

  const captureImage = () => {
    if (videoRef.current && cameraActive) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");

      if (context) {
        context.scale(-1, 1); // Mirror the capture
        context.translate(-canvas.width, 0);
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setPreviewImage(imageData); // Save captured image
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (
      file &&
      file.size <= 2 * 1024 * 1024 &&
      ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
    ) {
      // Check file size and type
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert(
        "Please select a valid image file (png, jpg, jpeg) with size up to 2MB."
      );
    }
  };

  return (
    <div className="attendance-wrapper w-full lg:w-3/5 p-4 md:p-6 bg-white rounded-xl md:rounded-2xl">
      <div className="header flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Face Recognition
        </h2>

        <button
          onClick={() => setCameraActive(!cameraActive)}
          className={`act-button flex items-center gap-2 w-max ${
            cameraActive
              ? "bg-gray-200 text-gray-500"
              : "bg-emerald-100 text-emerald-700"
          } py-2 px-4 rounded-full`}
        >
          {cameraActive ? "Matikan" : "Aktifkan"}
          <FontAwesomeIcon icon={cameraActive ? faPause : faPlay} />
        </button>
      </div>
      <div className="relative w-full h-auto aspect-[4/3] bg-gray-200 rounded-lg lg:rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-full aspect-square object-cover absolute top-0 left-0 transform scale-x-[-1]"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full aspect-square"
        />
        <div className="absolute bottom-0 left-0 bg-[rgba(255,255,255,0.6)] w-full flex items-center justify-end text-center py-3 gap-10 px-4 md:px-6">
          <div className="hidden md:flex gap-1 text-base">
            <p className="text-gray-700">nama :</p>
            <span className="text-base text-gray-700">
              {" "}
              {detectedUser.name}
            </span>
          </div>
          <div className="hidden md:flex gap-1 text-base">
            <p className="text-gray-700">status :</p>
            <span className="text-base text-emerald-600">
              {" "}
              {detectedUser.status}
            </span>
          </div>

          <button
            onClick={() => {
              setShowModal(true);
              captureImage();
            }}
            className="text-blue-600 text-sm md:hidden"
          >
            Daftarkan pengguna ?
          </button>
        </div>
      </div>

      <div className="md:hidden flex gap-1 text-base mt-2">
        <p className="text-gray-500 text-sm">nama :</p>
        <span className="text-sm text-gray-500"> {detectedUser.name}</span>
      </div>

      <div className="md:hidden flex gap-1 text-base">
        <p className="text-gray-500 text-sm">status :</p>
        <span className="text-sm text-emerald-600"> {detectedUser.status}</span>
      </div>

      <div className="flex justify-start mt-3 hidden md:block">
        <button
          onClick={() => {
            setShowModal(true);
            captureImage();
          }}
          className="text-blue-600"
        >
          Daftarkan pengguna ?
        </button>
      </div>

      {showModal && (
        <div className="form-wrapper fixed top-0 left-0 w-full h-screen bg-gray-800/30 p-6 z-50 flex items-center justify-center p-4">
          <div className="register w-full md:w-max bg-white p-6 md:p-8 rounded-xl md:rounded-2xl text-gray-800">
            <h2 className="text-xl font-semibold text-gray-800">
              Daftarkan Pelanggan Baru
            </h2>
            <div className="flex flex-col gap-3 md:gap-4 mt-6">
              <div className="relative bg-gray-200 w-full md:max-w-96 h-auto aspect-video rounded-lg border border-dashed border-black flex items-center justify-center group overflow-hidden">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  ref={inputFile}
                  onChange={handleFileChange}
                  className="hover:cursor-pointer w-full h-full opacity-0 absolute top-0 left-0 z-50"
                />
                <div
                  className={`w-full h-full flex gap-2 items-center justify-center absolute z-40 text-gray-900 transition-all ${
                    previewImage ? "opacity-0" : "opacity-100"
                  } group-hover:opacity-100 group-hover:bg-white/40`}
                >
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className="text-sm"
                  />
                  <span className="font-medium">upload image</span>
                </div>
              </div>

              <input
                required={true}
                type="text"
                placeholder="Nama pelanggan"
                className="py-2 px-4 bg-gray-200 rounded-md flex-1"
              />
              <input
                required={true}
                type="text"
                placeholder="No Telp"
                className="py-2 px-4 bg-gray-200 rounded-md flex-1"
              />
              <div className="flex justify-between gap-4 mt-2">
                <button
                  onClick={() => {
                    setShowModal((prev) => !prev);
                  }}
                  className="flex-1 py-2 px-4 bg-rose-600 rounded-md font-medium text-white"
                >
                  cancel
                </button>
                <button className="flex-1 py-2 px-4 bg-blue-600 rounded-md font-medium text-white">
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceRecognizer;

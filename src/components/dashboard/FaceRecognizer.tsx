"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const FaceRecognizer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedUser, setDetectedUser] = useState<{
    name: string;
    status: string;
  }>({ name: "unknown", status: "not marked" });
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cbUploadFromLocal, setCbUploadFromLocal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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
    loadModels();
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
      console.log(distance);
      return distance < distanceThreshold;
    });
  };

  const handleNewFace = (descriptor: Float32Array) => {
    console.log(isKnownFace(descriptor));
    if (!isKnownFace(descriptor)) {
      checkAttendance(descriptor);
      const newFace = { name: "unknown", descriptor };
      knownFaces.current = [newFace];
    } else {
      console.log("face already detected");
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
        console.log("user unkown");
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
                const resizedDetections = faceapi.resizeResults(
                  goodDetections,
                  {
                    width: canvasRef.current.width,
                    height: canvasRef.current.height,
                  }
                );
                const context = canvasRef.current.getContext("2d");
                context?.clearRect(
                  0,
                  0,
                  canvasRef.current.width,
                  canvasRef.current.height
                );
                faceapi.draw.drawDetections(
                  canvasRef.current,
                  resizedDetections
                );
                faceapi.draw.drawFaceLandmarks(
                  canvasRef.current,
                  resizedDetections
                );
              }
            }
          }, 1000);

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

  console.log(detectedUser);

  return (
    <div className="attendance-wrapper w-full lg:w-3/5 p-4 md:p-6 lg:p-8 bg-white rounded-xl md:rounded-2xl">
      <div className="header flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">Face Recognition</h2>

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
      <div className="relative w-full h-auto aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-full aspect-square object-cover absolute top-0 left-0"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full aspect-square"
        />
        <div className="absolute bottom-0 left-0 bg-[rgba(0,0,0,0.4)] w-full flex items-center justify-between md:justify-end text-center py-3 gap-10 px-4 md:px-6">
          <div className="flex gap-1 text-base">
            <p className="text-white">Nama :</p>
            <span className="text-base text-white"> {detectedUser.name}</span>
          </div>
          <div className="flex gap-1 text-base">
            <p className="text-white font-light">status :</p>
            <span className="text-base text-green-200">
              {" "}
              {detectedUser.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <button onClick={() => setShowModal(true)} className="text-blue-600">
          Daftarkan pengguna ?
        </button>
      </div>

      <img src={imageUrl} alt="" />

      {showModal && (
        <div className="form-wrapper fixed top-0 left-0 w-full h-screen bg-gray-800/30 p-6 z-50">
          <div className="register w-max bg-white p-6 md:p-8 rounded-xl md:rounded-2xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-800 mt-6">
            <h2 className="text-lg font-medium">Daftarkan Pelanggan Baru</h2>
            <div className="flex flex-col gap-3 md:gap-4 mt-6">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="cb-local"
                  defaultChecked={cbUploadFromLocal}
                  onChange={(e) => {
                    setCbUploadFromLocal(e.target.checked);
                  }}
                />
                <label htmlFor="cb-local" className="text-gray-600">
                  Gunakan image dari penyimpanan
                </label>
              </div>
              {cbUploadFromLocal && (
                <div className="relative bg-gray-200 w-full h-auto aspect-video rounded-md border border-dashed border-black flex items-center justify-center">
                  <input
                    type="file"
                    className="w-full h-full opacity-0 absolute top-0 left-0"
                  />
                  <div className="flex gap-2 items-center justify-center">
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      className="text-sm"
                    />
                    <span>upload image</span>
                  </div>
                </div>
              )}

              <input
                type="text"
                placeholder="Nama pelanggan"
                className="py-2 px-4 bg-gray-200 rounded-md flex-1"
              />
              <input
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

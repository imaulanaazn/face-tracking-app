"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import RegisterUserModal from "./RegisterUserModal";
import { checkAttendance } from "@/services/api/memberRecognition";

interface IFaceRecognizerProps {
  handleDetectionHistory: (memberId: string) => void;
}

const FaceRecognizer = ({ handleDetectionHistory }: IFaceRecognizerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedUser, setDetectedUser] = useState<{
    name: string;
    status: string;
    descriptor: Float32Array | null;
  }>({
    name: "unknown",
    status: "not marked",
    descriptor: null,
  });
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const knownFace = useRef<{ name: string; descriptor: Float32Array } | null>(
    null
  );
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    toast.promise(loadModels(), {
      pending: "Loading models",
      success: "Models loaded",
      error: "Failed to load models",
    });
  }, []);

  const isKnownFace = (descriptor: Float32Array) => {
    if (!knownFace.current) return false;
    const distance = faceapi.euclideanDistance(
      knownFace.current.descriptor,
      descriptor
    );
    return distance < 0.55;
  };

  const handleNewFace = (descriptor: Float32Array) => {
    if (knownFace.current) {
      if (isKnownFace(descriptor)) {
        if (knownFace.current.name !== "unknown") {
          console.error(
            "Face already detected and recognized:",
            knownFace.current.name
          );
          return; // Do nothing if the face is already recognized
        }
        // Retry attendance check for "unknown" faces
        if (!retryTimeoutRef.current) {
          retryTimeoutRef.current = setInterval(() => {
            handleAttendance(descriptor);
          }, 4000);
        }
      } else {
        console.error("A new face was detected, resetting known face.");
        knownFace.current = null;
        if (retryTimeoutRef.current) {
          clearInterval(retryTimeoutRef.current);
          retryTimeoutRef.current = null;
        }
      }
    }

    if (!knownFace.current) {
      handleAttendance(descriptor);
      knownFace.current = { name: "unknown", descriptor };
    }
  };

  async function handleAttendance(descriptor: Float32Array) {
    const arrayDescriptor = Array.from(descriptor);
    try {
      const response = await checkAttendance({
        faceDescriptor: arrayDescriptor,
      });

      setDetectedUser({
        name: response.data.name,
        status: "marked",
        descriptor,
      });

      // Update the known face with the recognized name
      if (knownFace.current && isKnownFace(descriptor)) {
        knownFace.current.name = response.data.name;
      }

      // Clear the retry interval if the face is recognized
      if (retryTimeoutRef.current) {
        clearInterval(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      handleDetectionHistory(response.data.id);
    } catch (error) {
      handleDetectionHistory("");
      setDetectedUser({ name: "unknown", status: "not marked", descriptor });
      console.error("Error recognizing face:", error);
    }
  }

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
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const updateCanvasSize = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const videoAspectRatio =
        videoRef.current.videoWidth / videoRef.current.videoHeight;
      const canvasContainer = videoRef.current.parentElement;

      if (canvasContainer) {
        const { width: containerWidth, height: containerHeight } =
          canvasContainer.getBoundingClientRect();
        let canvasWidth, canvasHeight;

        if (containerWidth / containerHeight > videoAspectRatio) {
          canvasHeight = containerHeight;
          canvasWidth = canvasHeight * videoAspectRatio;
        } else {
          canvasWidth = containerWidth;
          canvasHeight = canvasWidth / videoAspectRatio;
        }

        faceapi.matchDimensions(canvasRef.current, {
          width: canvasWidth,
          height: canvasHeight,
        });
      }
    }
  }, []);

  const detectFace = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const detection = await faceapi
      .detectSingleFace(
        videoRef.current!,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 416 })
      )
      .withFaceLandmarks()
      .withFaceDescriptor();

    const context = canvasRef.current.getContext("2d");

    if (detection) {
      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        context.save();
        context.scale(-1, 1);
        context.translate(-canvasRef.current.width, 0);

        const resizedDetections = faceapi.resizeResults(detection, {
          width: canvasRef.current.width,
          height: canvasRef.current.height,
        });

        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        context.restore();
        handleNewFace(detection.descriptor);
      }
    } else {
      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        context.save();
      }

      if (retryTimeoutRef.current) {
        clearInterval(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }
    // Schedule the next detection
    setTimeout(detectFace);
  }, []);

  useEffect(() => {
    if (cameraActive) {
      startVideo();
      const handlePlay = () => {
        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);
        detectFace(); // Start detection loop
      };

      videoRef.current?.addEventListener("play", handlePlay);

      return () => {
        videoRef.current?.removeEventListener("play", handlePlay);
        window.removeEventListener("resize", updateCanvasSize);
        stopVideo();

        // Clear retry interval on camera stop
        if (retryTimeoutRef.current) {
          clearInterval(retryTimeoutRef.current);
          retryTimeoutRef.current = null;
        }
      };
    }
  }, [cameraActive, startVideo, stopVideo, updateCanvasSize, detectFace]);

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

  return (
    <div className="attendance-wrapper w-full lg:w-3/5 bg-white rounded-xl md:rounded-2xl">
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
      <div className="relative w-full h-auto aspect-[4/5] md:aspect-[4/3] bg-gray-200 rounded-lg lg:rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-full object-cover absolute top-0 left-0 transform scale-x-[-1]"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="absolute bottom-0 left-0 bg-[rgba(255,255,255,0.6)] w-full flex items-center justify-end text-center py-3 gap-10 px-4 md:px-6">
          <div className="hidden md:flex gap-1 text-base">
            <p className="text-gray-700">nama :</p>
            <span className="text-base text-gray-700">{detectedUser.name}</span>
          </div>
          <div className="hidden md:flex gap-1 text-base">
            <p className="text-gray-700">status :</p>
            <span
              className={`text-base ${
                detectedUser.status === "marked"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {detectedUser.status}
            </span>
          </div>

          {detectedUser.name === "unknown" && (
            <button
              onClick={() => {
                setShowModal(true);
                captureImage();
              }}
              className="text-blue-600 text-sm md:hidden"
            >
              Daftarkan pengguna ?
            </button>
          )}
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

      {detectedUser.name === "unknown" && (
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
      )}

      {showModal && (
        <RegisterUserModal
          setPreviewImage={(imagUrl: string) => {
            setPreviewImage(imagUrl);
          }}
          previewImage={previewImage}
          setShowModal={(showModal: boolean) => {
            setShowModal(showModal);
          }}
          faceDescriptor={detectedUser.descriptor}
          handleResetKnownFace={() => {
            knownFace.current = null;
          }}
        />
      )}
    </div>
  );
};

export default FaceRecognizer;

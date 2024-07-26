"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const BACKEND_URL = "http://localhost:3000/";

const FaceRecognizer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [log, setLog] = useState<string[]>([]);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cbUploadFromLocal, setCbUploadFromLocal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const startVideo = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(
          "/models/tiny_face_detector"
        );
        await faceapi.nets.faceLandmark68Net.loadFromUri(
          "/models/face_landmark_68"
        );
        await faceapi.nets.faceRecognitionNet.loadFromUri(
          "/models/face_recognition"
        );

        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        });
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    const stopVideo = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    if (cameraActive) {
      startVideo();
    } else {
      stopVideo();
    }

    const checkAttendance = async (faceDescriptor: Float32Array) => {
      try {
        const response = await fetch(`${BACKEND_URL}/check-attendance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ faceDescriptor: Array.from(faceDescriptor) }),
        });
        const result = await response.json();
        if (response.ok) {
          setLog((prevLog) => [...prevLog, `Attendance: ${result.name}`]);
        } else {
          console.error("Failed to check attendance", result);
        }
      } catch (error) {
        console.error("Error checking attendance:", error);
      }
    };

    const isGoodDetection = (detection: any) => {
      return detection.detection.score > 0.9;
    };

    if (videoRef.current && canvasRef.current) {
      videoRef.current.addEventListener("play", () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const displaySize = {
          width: videoRef.current?.videoWidth ?? 0,
          height: videoRef.current?.videoHeight ?? 0,
        };

        faceapi.matchDimensions(canvas, displaySize);

        const updateCanvasSize = () => {
          if (videoRef.current) {
            const displaySize = {
              width: videoRef.current.clientWidth,
              height: videoRef.current.clientHeight,
            };
            canvas.width = displaySize.width;
            canvas.height = displaySize.height;
            faceapi.matchDimensions(canvas, displaySize);
          }
        };

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
              const detectionsString = JSON.stringify(goodDetections);
              setLog((prevLog) => [
                ...prevLog,
                `Good Detections: ${detectionsString}`,
              ]);

              const faceDescriptor = goodDetections[0].descriptor;
              checkAttendance(faceDescriptor);
            }

            const resizedDetections = faceapi.resizeResults(goodDetections, {
              width: canvas.width,
              height: canvas.height,
            });
            canvas
              .getContext("2d")
              ?.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            // if (videoRef.current) {
            //   setImageUrl(urlToImage);
            // }
          }
        }, 100);

        return () => clearInterval(interval);
      });
    }
  }, [cameraActive]);

  return (
    <div className="attendance-wrapper w-full lg:w-3/5 p-4 md:p-6 bg-white rounded-lg">
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
            <p className="text-white">nama :</p>
            <span className="text-base text-white"> Irham</span>
          </div>
          <div className="flex gap-1 text-base">
            <p className="text-white font-light">status :</p>
            <span className="text-base text-green-200"> Attended</span>
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
        <div className="form-wrapper absolute top-0 left-0 w-full h-screen bg-gray-800/30">
          <div className="register w-max bg-white py-10 px-8 rounded-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-800 mt-6">
            <h2 className="text-lg font-medium">Daftarkan Pelanggan Baru</h2>
            <div className="flex flex-col gap-3 md:gap-4 mt-4">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="cb-local"
                  defaultChecked={cbUploadFromLocal}
                  onChange={(e) => {
                    setCbUploadFromLocal(e.target.checked);
                  }}
                />
                <label htmlFor="cb-local">Gunakan image dari penyimpanan</label>
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
              <div className="flex justify-between gap-4">
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

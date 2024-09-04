"use client";
import FaceRecognizer from "@/components/recognition/FaceRecognizer";
import RecognitionHistory from "@/components/recognition/RecognitionHistory";
import { useState } from "react";

const UserRecognition: React.FC = () => {
  const [memberId, setMemberId] = useState("");

  return (
    <div className="w-full p-6 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8">
      <FaceRecognizer
        handleDetectionHistory={(memberId: string) => {
          setMemberId(memberId);
        }}
      />
      <RecognitionHistory memberId={memberId} />
    </div>
  );
};

export default UserRecognition;

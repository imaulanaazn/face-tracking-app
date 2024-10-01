"use client";
import FaceRecognizer from "@/components/merchant/recognition/FaceRecognizer";
import RecognitionHistory from "@/components/merchant/recognition/RecognitionHistory";
import { useState } from "react";

const UserRecognition: React.FC = () => {
  const [memberId, setMemberId] = useState("");

  return (
    <div className="w-full xl:w-10/12 2xl:w-10/12 mx-auto lg:h-[100vh] overflow-hidden p-6 md:p-8 lg:py-12  flex flex-col lg:flex-row justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-16">
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

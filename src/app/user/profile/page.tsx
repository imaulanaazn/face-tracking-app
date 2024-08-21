"use client";
import EmailForm from "@/components/profile/EmailForm";
import PasswordForm from "@/components/profile/PasswordForm";
import UsernameForm from "@/components/profile/UsernameForm";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Profile() {
  const inputFile = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (
      file &&
      file.size <= 2 * 1024 * 1024 &&
      ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
    ) {
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

  const handleChangeClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 p-6 md:p-8 ">
      <div className="w-full lg:w-5/12 xl:w-2/5">
        <div className="flex flex-col lg:flex-row items-center p-6 bg-white rounded-xl shadow-sm">
          {previewImage ? (
            <Image
              height={50}
              width={50}
              className="w-24 h-24 rounded-full lg:rounded-lg object-cover"
              src={previewImage || ""}
              alt="Profile"
            />
          ) : (
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-slate-200 flex items-center justify-center rounded-full lg:rounded-lg">
              <FontAwesomeIcon
                icon={faUser}
                className="text-3xl text-gray-600"
              />
            </div>
          )}
          <div className="lg:ml-4 mt-4 lg:mt-0">
            <h2 className="text-xl font-semibold text-gray-800 text-center lg:text-left">
              Jese Leos
            </h2>
            <p className="text-gray-600 text-sm text-center lg:text-left">
              Software Engineer
            </p>
            <button
              onClick={handleChangeClick}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 text-sm"
            >
              <FontAwesomeIcon icon={faUpload} />
              Change picture
              <input
                type="file"
                hidden={true}
                ref={inputFile}
                onChange={handleFileChange}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row lg:flex-col gap-6 md:gap-8 mt-6 md:mt-8">
          <UsernameForm />
          <EmailForm />
        </div>
      </div>

      <div className="w-full lg:w-7/12 xl:w-3/5">
        <PasswordForm />
      </div>
    </div>
  );
}

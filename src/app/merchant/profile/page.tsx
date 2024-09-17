"use client";
import AddressForm from "@/components/merchant/profile/AddressForm";
import EmailForm from "@/components/merchant/profile/EmailForm";
import PasswordForm from "@/components/merchant/profile/PasswordForm";
import { updateMerchantProfile } from "@/services/api/merchant";
import { RootState } from "@/store";
import { setMerchant } from "@/store/slices/merchantSlice";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Profile() {
  const inputFile = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState("");
  const merchant = useSelector((state: RootState) => state.merchant);
  const dispatch = useDispatch();

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
      onProfileMerchantChange(file);
    } else {
      alert(
        "Please select a valid image file (png, jpg, jpeg) with size up to 2MB."
      );
    }
  };

  async function onProfileMerchantChange(image: File) {
    try {
      const response = await toast.promise(updateMerchantProfile(image), {
        pending: "Mengunggah foto",
      });
      dispatch(setMerchant({ ...merchant, logo: response.data.url }));
      toast.success(response.message);
    } catch (error: any) {
      setPreviewImage("");
      toast.error(error.message);
    }
  }

  const handleChangeClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 p-6 md:p-8 ">
      <div className="w-full lg:w-5/12 xl:w-2/5">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex flex-col gap-4 items-center">
            <div className="relative group">
              {previewImage || merchant.logo ? (
                <Image
                  height={50}
                  width={50}
                  className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover"
                  src={previewImage || merchant.logo || ""}
                  alt="Profile"
                />
              ) : (
                <div className="w-20 h-20 lg:w-28 lg:h-28 bg-slate-200 flex items-center justify-center rounded-full lg:rounded-lg">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-3xl text-gray-600"
                  />
                </div>
              )}

              <div
                onClick={handleChangeClick}
                className="absolute top-0 left-0 w-20 h-20 lg:w-28 lg:h-28 rounded-full flex items-center gap-2 justify-center group-hover:bg-gray-800/60 hover:cursor-pointer opacity-0 group-hover:opacity-100 text-white"
              >
                <FontAwesomeIcon icon={faUpload} />
                Ubah
                <input
                  type="file"
                  hidden={true}
                  ref={inputFile}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="lg:ml-4 mt-4 lg:mt-0">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {merchant.name}
              </h2>
              <p className="text-gray-600 text-sm text-center lg:text-left mt-2">
                {merchant.province}
                {", " + merchant.city}
                {", " + merchant.district}
                {", " + merchant.street}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm mt-6 md:mt-8">
          <AddressForm />
        </div>

        <div className="flex flex-col md:flex-row lg:flex-col gap-6 md:gap-8 mt-6 md:mt-8">
          {/* <UsernameForm /> */}
          <EmailForm />
        </div>
      </div>

      <div className="w-full lg:w-7/12 xl:w-3/5">
        <PasswordForm />
      </div>
    </div>
  );
}

"use client";
import { tokenResetPassword } from "@/services/api/auth";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    const toastId = toast.loading("Sending URL");
    try {
      const response = await tokenResetPassword(identifier);

      toast.update(toastId, {
        render: response.message,
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });

      setIdentifier("");
    } catch (error: any) {
      toast.done(toastId);
      setError(
        error.message || "Reset password failed. Please try again later."
      );
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-600 hidden lg:flex w-full md:w-1/2 xl:w-2/3 h-screen items-center justify-center">
        <Image
          width={1000}
          height={700}
          src="/images/reset-password-illustration.svg"
          alt={"Reset Password Illustration"}
          className="w-[60%] h-auto object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center"
      >
        <div className="w-full h-100">
          <div className="flex justify-center">
            <Link
              href={"/auth/login"}
              className="flex items-center gap-2 text-center text-blue-600 font-medium"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back to Login</span>
            </Link>
          </div>

          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Reset your password
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Enter your user account&apos;s verified number and we will send you
            a password reset link.
          </p>

          <form
            className="mt-8"
            action="#"
            method="POST"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <div>
              <label htmlFor="identifier" className="block text-gray-700">
                Your Account identifier / Phone Number
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email / phone number"
                className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              className="w-full block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
            >
              Send Reset Password Url
            </button>
          </form>
          {error && <p className="text-red-600 mt-2">{error}</p>}

          <p className="mt-8">
            Belum memiliki akun?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Buat akun baru
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

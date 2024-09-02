"use client";
import { startTokenRefresh } from "@/lib/tokenService";
import { register } from "@/services/api/auth";
import {
  getMobileCountryCode,
  IMobileCodeResponseData,
} from "@/services/api/mobileCountryCode";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [userPhoneCode, setUserPhoneCode] = useState("+62");
  const [mobileNumber, setMobileNumber] = useState("");

  const [error, setError] = useState("");

  const [mobileCountryCodes, setMobileCountryCodes] = useState<
    IMobileCodeResponseData[]
  >([]);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
        phoneCode: userPhoneCode,
        mobileNumber,
        name,
      };
      const response = await register(data);

      // const accessToken = {
      //   token: response.data.accessToken,
      //   expiredAt: response.data.accessTokenExpiredAt,
      // };

      // const refreshToken = {
      //   token: response.data.refreshToken,
      //   expiredAt: response.data.refreshTokenExpiredAt,
      // };

      // localStorage.setItem("accessToken", JSON.stringify(accessToken));
      // localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

      // startTokenRefresh();
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Register failed:", err);
      setError(err.message || "Gagal mendaftar. Coba lagi nanti.");
      throw new Error();
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    async function getCountryCode() {
      try {
        const response = await getMobileCountryCode();
        setMobileCountryCodes(response.data);
      } catch (error) {
        console.error("Failed to fetch mobild country code:", error);
      }
    }

    getCountryCode();
  }, []);

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-600 hidden lg:flex w-full md:w-1/2 xl:w-2/3 h-screen items-center justify-center">
        <Image
          width={1000}
          height={700}
          src="/images/register_illustration.svg"
          alt={"Login Illustration"}
          className="w-[60%] h-auto object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Buat akun baru
          </h1>

          <form
            className="mt-6"
            action="#"
            method="POST"
            onSubmit={(e) => {
              toast.promise(handleRegister(e), {
                pending: "Loading",
                success: "Berhasil Mendaftar",
              });
            }}
          >
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setname(e.target.value)}
                placeholder="Masukkan nama"
                className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-gray-700">
                Nomor Telepon
              </label>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center gap-2 items-center w-full px-4 py-3.5 text-sm font-medium bg-white rounded-md hover:bg-white border border-gray-400"
                  >
                    {userPhoneCode}
                    <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
                  </button>

                  {isOpen && (
                    <div
                      className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                      onMouseLeave={closeDropdown}
                    >
                      <div
                        className="p-2"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {mobileCountryCodes.map((code) => (
                          <div
                            onClick={() => {
                              setUserPhoneCode(code.code);
                            }}
                            key={code.code}
                            className={`flex items-center gap-2 py-2 px-4 hover:cursor-pointer rounded-md ${
                              code.code === userPhoneCode
                                ? "bg-gray-200 text-gray-600"
                                : "bg-white text-gray-600"
                            }`}
                          >
                            <Image
                              src={code.flag}
                              width={25}
                              height={25}
                              alt={code.name + "flag"}
                            />
                            <span>{code.code}</span>
                            <span>{code.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  id="number"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Masukkan Nomor Telepon"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-gray-700">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Alamat Email"
                className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500
                    focus:bg-white focus:outline-none"
                required
              />
            </div>

            {/* <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div> */}

            <button
              type="submit"
              className="w-full block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
            >
              Buat Akun
            </button>
          </form>

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <p className="mt-8">
            Sudah memiliki akun?{" "}
            <Link
              href="/auth/login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

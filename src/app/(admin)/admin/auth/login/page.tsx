"use client";
import { startTokenRefresh } from "@/lib/tokenService";
import { adminLogin, login } from "@/services/api/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = { username, password };
      const response = await adminLogin(data);

      const accessToken = {
        token: response.data.accessToken,
        expiredAt: response.data.accessTokenExpiredAt,
      };

      const refreshToken = {
        token: response.data.refreshToken,
        expiredAt: response.data.refreshTokenExpiredAt,
      };

      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

      startTokenRefresh("admin");
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
      throw new Error("");
    }
  };

  return (
    <main>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-blue-600 hidden lg:flex w-full md:w-1/2 xl:w-2/3 h-screen items-center justify-center">
          <Image
            width={1000}
            height={700}
            src="/images/login_illustration.svg"
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
              Login as Administrator
            </h1>

            <form
              className="mt-6"
              action="#"
              method="POST"
              onSubmit={(e) => {
                toast.promise(handleLogin(e), {
                  pending: "Loading",
                  success: "Berhasil Login",
                });
              }}
            >
              <div>
                <label htmlFor="username" className="block text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan Username"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500
                    focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
              >
                Login
              </button>
            </form>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}

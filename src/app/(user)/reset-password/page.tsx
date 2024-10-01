"use client";
import Loading from "@/components/global/Loading";
import NotFound from "@/components/global/NotFound";
import { resetPassword, validateTokenReset } from "@/services/api/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

function ResetPassword() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const searchParams = useSearchParams();
  const resetToken = searchParams.get("auth");

  useEffect(() => {
    const validateResetToken = async () => {
      try {
        setLoading(true);
        const response = await validateTokenReset(resetToken || "");
        setIsTokenValid(response.success);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setIsTokenValid(false);
        toast.error(error.message);
        console.error(error.message);
      }
    };

    validateResetToken();
  }, [resetToken]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await resetPassword({
          newPassword: password,
          token: resetToken || "",
        });
        toast.success("Password has been updated");
        toast.success("Redirecting you to the login page");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } catch (err: any) {
        console.error("Password Reset Failed:", err);
        setError(err.message || "Password Reset Failed. Please Try Again.");
      }
    }
  };

  if (loading) return <Loading />;
  if (!isTokenValid && !loading) return <NotFound />;

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-600 hidden lg:flex w-full md:w-1/2 xl:w-2/3 h-screen items-center justify-center">
        <Image
          width={1000}
          height={700}
          src="/images/reset-password-illustration.svg"
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
            Create New Password
          </h1>

          <form
            className="mt-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type Password"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500
                    focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type password"
                className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
              {confirmPassword && confirmPassword !== password && (
                <span className="text-rose-600 text-sm">
                  Password is not equal
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
            >
              Change Password
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

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}

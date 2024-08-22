import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
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

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Masukkan Username"
                className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Alamat Email</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Masukkan Alamat Email"
                className="w-full px-4 py-3 rounded-lg bg-white mt-2 border border-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name=""
                id=""
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
              Create Account
            </button>
          </form>

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

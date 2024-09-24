import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RegisterNow() {
  return (
    <div className="relative py-10 lg:py-16 xl:py-20 lg:py-32 xl:py-40 ">
      <div className="container">
        <div className="relative max-w-[43.125rem] mx-auto py-8 md:py-14 xl:py-0">
          <div className="relative z-1 text-center">
            <h1 className="h1 mb-6 text-gray-800">
              Mengirim pesan dengan mudah - Bolo
            </h1>

            <p className="body-1 mb-8 text-gray-600">
              Kirim pesan, promo, event dan lain lain kepada pelanggan secara
              otomatis dengan BOLO
            </p>
            <Link
              className="button relative inline-flex items-center justify-center h-11 px-7 text-n-8 transition-colors hover:text-color-1 "
              href="/auth/register"
            >
              <span className="relative z-10 text-white">Get started</span>
              <svg
                className="absolute top-0 left-0"
                width="21"
                height="44"
                viewBox="0 0 21 44"
              >
                <path
                  fill="#2563eb"
                  stroke="#2563eb"
                  strokeWidth="2"
                  d="M21,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1"
                ></path>
              </svg>
              <svg
                className="absolute top-0 left-[1.3125rem] w-[calc(100%-2.625rem)]"
                height="44"
                viewBox="0 0 100 44"
                preserveAspectRatio="none"
                fill="#2563eb"
              >
                <polygon
                  fill="#2563eb"
                  fillRule="nonzero"
                  points="100 0 100 44 0 44 0 0"
                ></polygon>
              </svg>
              <svg
                className="absolute top-0 right-0"
                width="21"
                height="44"
                viewBox="0 0 21 44"
              >
                <path
                  fill="#2563eb"
                  stroke="#2563eb"
                  strokeWidth="2"
                  d="M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <Image
        alt="Curve"
        width={1000}
        height={600}
        loading="lazy"
        className="inline-block align-top opacity-0 transition-opacity opacity-30 absolute left-1/2 -translate-x-1/2 w-full lg:w-1/2 top-0"
        src="/assets/gradient.png"
      />
    </div>
  );
}

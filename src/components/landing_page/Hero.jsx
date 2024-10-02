"use client";
import Section from "./Section";
import { BackgroundCircles, Gradient } from "./design/Hero";
import { heroIcons } from "../../lib/statics";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6 font-bold">
            Kelola Kebutuhan Bisnismu Dengan Mudah Melalui {` `}
            <span className="inline-block relative">
              BOLO{" "}
              <Image
                src={"/assets/hero/curve.png"}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-gray-600 lg:mb-8">
            Rasakan kemudahan mengelola pelanggan, mencatat keuangan dan beragam
            fitur lainnya dengan bolo
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
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-xl md:rounded-2xl bg-conic-gradient">
            <div className="relative bg-white rounded-[1rem]">
              <div className="h-[1.4rem] bg-white rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <Image
                  src={"/assets/hero/finance.jpg"}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-0 object-contain"
                  width={1440}
                  height={600}
                  alt="AI"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-blue-700/30 backdrop-blur border border-n-1/10 rounded-xl md:rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <Image src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex bg-blue-600/30 text-white"
                    title="New User"
                  />
                </ScrollParallax>
              </div>
            </div>

            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <Image
              className="opacity-40 w-full"
              src={"/assets/hero/hero-background.jpg"}
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles />
        </div>

        {/* <CompanyLogos className="hidden relative z-10 mt-20 lg:block" /> */}
      </div>

      {/* <BottomLine /> */}
    </Section>
  );
};

export default Hero;

"use client";
import {
  faArrowUp,
  faPaperPlane,
  faStore,
  faUserGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import React, { useEffect, useState } from "react";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

const breakpoints = {
  0: {
    slidesPerView: 1.4,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 1.5,
    spaceBetween: 30,
  },
  768: {
    slidesPerView: 2.3,
    spaceBetween: 35,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="dashboard-wrapper w-full p-6 md:p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Ringkasan</h2>
        {/* <select name="interval" id="interval" className="py-2 px-4 rounded-md">
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
          <option value="this-year">This Year</option>
        </select> */}
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {selectedOpt || "Options"}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0l-4.25-4.25a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
              onMouseLeave={closeDropdown}
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => {
                    setSelectedOpt("Account settings");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Account settings
                </button>
                <button
                  onClick={() => {
                    setSelectedOpt("Support");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Support
                </button>
                <button
                  onClick={() => {
                    setSelectedOpt("License");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  License
                </button>
                <form method="POST" action="#">
                  <button
                    onClick={() => {
                      setSelectedOpt(" Sign out");
                    }}
                    type="submit"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Swiper
        className="mt-4"
        slidesPerView={1.5}
        breakpoints={breakpoints}
        onSlideChange={() => {}}
        onSwiper={() => {}}
      >
        <SwiperSlide style={{ height: "auto" }}>
          <div className="bg-blue-600 h-full rounded-xl md:rounded-2xl flex-1 text-white p-6">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faUserGroup} className="text-xl" />
              <h3 className="">Pelanggan</h3>
            </div>
            <div className="flex items-end gap-2 mt-4">
              <h4 className="text-4xl font-bold">10</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm">+20%</span>
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="text-xs font-light"
                />
              </div>
            </div>
            <span className="text-sm font-light ">
              dibandingkan dengan bulan kemarin
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ height: "auto" }}>
          <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
              <h3 className="">Pesan Tersisa</h3>
            </div>
            <div className="flex items-end gap-2 mt-4">
              <h4 className="text-4xl font-bold">120</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ height: "auto" }}>
          <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
              <h3 className="">Pelanggan Baru</h3>
            </div>
            <div className="flex items-end gap-2 mt-4">
              <h4 className="text-4xl font-bold">10</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm">+20%</span>
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="text-xs font-light"
                />
              </div>
            </div>
            <span className="text-sm font-light ">
              dibandingkan dengan bulan kemarin
            </span>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="graphic rounded-xl md:rounded-2xl bg-white p-4 md:p-6 md:p-8 mt-4 md:mt-8">
        <h2 className="text-lg font-medium text-gray-800">
          Grafik pelanggan bulan ini
        </h2>
        <SplineChart />
      </div>
    </div>
  );
}

const SplineChart = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    setOptions({
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    });

    setSeries([
      {
        name: "Series 1",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 172, 213, 248],
      },
    ]);
  }, []);

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

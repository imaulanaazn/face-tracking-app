"use client";
import {
  faArrowUp,
  faChevronDown,
  faPaperPlane,
  faUserGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import React, { useState } from "react";
import ClientsChart from "@/components/dashboard/ClientsChart";

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

const statsTimeRange = [
  {
    id: 1,
    name: "Account settings",
  },
  {
    id: 2,
    name: "Support",
  },
  {
    id: 3,
    name: "License",
  },
  {
    id: 4,
    name: "Sign out",
  },
  {
    id: 5,
    name: "",
  },
];

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
        <h2 className="text-xl font-semibold text-gray-800">Ringkasan</h2>
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center gap-2 items-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 "
          >
            {selectedOpt || "Options"}
            <FontAwesomeIcon icon={faChevronDown} />
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
                {statsTimeRange.map((timeRange) => (
                  <button
                    key={timeRange.id}
                    onClick={() => {
                      setSelectedOpt(timeRange.name);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {timeRange.name}
                  </button>
                ))}
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

      <ClientsChart />
    </div>
  );
}

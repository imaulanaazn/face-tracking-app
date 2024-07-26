"use client";
import {
  faArrowUp,
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

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper w-full p-6 md:p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Ringkasan</h2>
        <select name="interval" id="interval">
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      <Swiper
        className="mt-4"
        slidesPerView={1.5}
        breakpoints={{
          0: {
            slidesPerView: 1.4,
            spaceBetween: 30,
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
        }}
        onSlideChange={() => {}}
        onSwiper={() => {}}
      >
        <SwiperSlide style={{ height: "auto" }}>
          <div className="bg-blue-600 h-full rounded-2xl flex-1 text-white p-6">
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
          <div className="bg-white h-full rounded-2xl flex-1 text-gray-700 p-6">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faStore} className="text-xl" />
              <h3 className="">Toko</h3>
            </div>
            <div className="flex items-end gap-2 mt-4">
              <h4 className="text-4xl font-bold">10</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ height: "auto" }}>
          <div className="bg-white h-full rounded-2xl flex-1 text-gray-700 p-6">
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

      <div className="graphic rounded-xl bg-white p-6 md:p-8 mt-4  md:mt-8">
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

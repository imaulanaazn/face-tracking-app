"use client";
import React from "react";

import {
  faArrowUp,
  faComputer,
  faLink,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
export default function Summary() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Ringkasan</h2>
      </div>

      <div>
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
                <FontAwesomeIcon icon={faComputer} className="text-xl" />
                <h3 className="">Device</h3>
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
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ height: "auto" }}>
            <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faLink} className="text-xl" />
                <h3 className="">Connect</h3>
              </div>
              <div className="flex items-end gap-2 mt-4">
                <h4 className="text-4xl font-bold">120</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ height: "auto" }}>
            <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
                <h3 className="">Pesan</h3>
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
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

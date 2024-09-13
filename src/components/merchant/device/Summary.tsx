"use client";
import React from "react";

import {
  faComputer,
  faLink,
  faLinkSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IConnection, IMessageThemeCount } from "@/data-types/merchant";
import { WhatsAppConnectionStatus } from "@/enum";

interface IConnectionWithMessageTheme extends IConnection {
  messageTheme?: IMessageThemeCount[];
}

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
export default function Summary({
  connections,
}: {
  connections: IConnectionWithMessageTheme[];
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
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
                <h3 className="">Devices</h3>
              </div>
              <div className="flex items-end gap-2 mt-4">
                <h4 className="text-4xl font-bold">{connections.length}</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ height: "auto" }}>
            <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faLink} className="text-xl" />
                <h3 className="">Connected</h3>
              </div>
              <div className="flex items-end gap-2 mt-4">
                <h4 className="text-4xl font-bold">
                  {
                    connections.filter(
                      (connection) =>
                        connection.status === WhatsAppConnectionStatus.READY
                    ).length
                  }
                </h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ height: "auto" }}>
            <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faLinkSlash} className="text-xl" />
                <h3 className="">Disconnected</h3>
              </div>
              <div className="flex items-end gap-2 mt-4">
                <h4 className="text-4xl font-bold">
                  {
                    connections.filter(
                      (connection) =>
                        connection.status !== WhatsAppConnectionStatus.READY
                    ).length
                  }
                </h4>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

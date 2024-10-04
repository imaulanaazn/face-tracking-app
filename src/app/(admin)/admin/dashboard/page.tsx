"use client";
import {
  faArrowDown,
  faArrowUp,
  faChevronDown,
  faChevronUp,
  faPaperPlane,
  faUserGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import React, { useEffect, useRef, useState } from "react";
import ClientsChart from "@/components/merchant/dashboard/ClientsChart";
import {
  ChartResponse,
  getCurrentEndDate,
  getPreviousMonthStartDate,
  getTransactionChart,
} from "@/services/api/adminStatistic";
import Loading from "@/components/global/Loading";
import Dropdown from "@/components/global/SimpleDropDown";

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
    value: "today",
    text: "Today",
  },
  {
    value: "thisWeek",
    text: "This Week",
  },
  {
    value: "thisMonth",
    text: "This Month",
  },
  {
    value: "thisYear",
    text: "This Year",
  },
];

const statsTimeFreq = [
  {
    value: "month",
    text: "Month",
  },
  {
    value: "week",
    text: "Week",
  },
  {
    value: "day",
    text: "Day",
  },
  {
    value: "hour",
    text: "Hour",
  },
  {
    value: "minute",
    text: "Minute",
  },
];

export default function Dashboard() {
  const [chartData, setChartData] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [frequencies, setFrequencies] = useState(statsTimeFreq);
  const [frequency, setFrequency] = useState<{
    value: string;
    text: string;
  }>({
    value: "day",
    text: "Day",
  });

  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    text: string;
  }>({ value: "thisMonth", text: "This Month" });

  const handleOptionRangeSelect = (option: { value: string; text: string }) => {
    const frequencyOptions: {
      [key: string]: { value: string; text: string }[];
    } = {
      today: [
        { value: "hour", text: "Hour" },
        { value: "minute", text: "Minute" },
      ],
      thisWeek: [
        { value: "day", text: "Day" },
        { value: "hour", text: "Hour" },
        { value: "minute", text: "Minute" },
      ],
      thisMonth: [
        { value: "week", text: "Week" },
        { value: "day", text: "Day" },
        { value: "hour", text: "Hour" },
        { value: "minute", text: "Minute" },
      ],
    };

    const defaultFrequency = { value: "day", text: "Day" };

    const frequencies = frequencyOptions[option.value] || statsTimeFreq;
    const selectedFrequency =
      frequencyOptions[option.value]?.[0] || defaultFrequency;

    setFrequencies(frequencies);
    setFrequency(selectedFrequency);
    setSelectedOption(option);
  };

  const handleOptionFreqSelect = (option: { value: string; text: string }) => {
    setFrequency(option);
  };

  async function fetchChartData(query?: {
    startDate: string;
    endDate: string;
    frequency: string;
  }) {
    try {
      const response = await getTransactionChart(query);
      setChartData(response);
    } catch (err) {
      setError("Failed to fetch chart data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const dates = getStartAndEndDates(selectedOption.value);
    fetchChartData({ frequency: frequency.value, ...dates });
  }, [selectedOption.value, frequency]);

  function getStartAndEndDates(period: string): {
    startDate: string;
    endDate: string;
  } {
    const today = new Date();
    let startDate: Date;
    let endDate: Date = new Date(today.toISOString().split("T")[0]); // Set endDate to current date (00:00:00 of today)

    switch (period) {
      case "today":
        startDate = new Date(today.setHours(0, 0, 0, 0));
        break;

      case "thisWeek":
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for week starting on Monday
        startDate = new Date(today.setDate(diff));
        startDate.setHours(0, 0, 0, 0);
        break;

      case "thisMonth":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          1,
          0,
          0,
          0,
          0
        );
        break;

      case "thisYear":
        startDate = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;

      default:
        throw new Error("Invalid period");
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(), // This will always be the current date at 00:00:00 UTC
    };
  }

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-wrapper w-full p-6 md:p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
        <div className="flex gap-6">
          <div className="relative inline-block text-left z-30 flex items-center gap-4">
            <span className="text-gray-600">Time Range :</span>
            <Dropdown
              options={statsTimeRange}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionRangeSelect}
            />
          </div>
          <div className="relative inline-block text-left z-30 flex items-center gap-4">
            <span className="text-gray-600">Frequency :</span>
            <Dropdown
              options={frequencies}
              selectedOption={frequency}
              onOptionSelect={handleOptionFreqSelect}
            />
          </div>
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
              <h3 className="">Members</h3>
            </div>
            <div className="flex items-end gap-2 mt-4">
              <h4 className="text-4xl font-bold">10</h4>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="text-sm">+20%</span>
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="text-xs font-light"
                />
              </div>
            </div>
            <span className="text-sm font-light ">
              Compared with previous month
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ height: "auto" }}>
          <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
              <h3 className="">Message Sent</h3>
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
              <h3 className="">New Members</h3>
            </div>
            <div className="flex items-end gap-2 mt-4">
              <h4 className="text-4xl font-bold">10</h4>
              <div className="flex items-center gap-2 text-rose-600">
                <span className="text-sm">-20%</span>
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="text-xs font-light"
                />
              </div>
            </div>
            <span className="text-sm font-light ">
              Compared with previous month
            </span>
          </div>
        </SwiperSlide>
      </Swiper>

      {chartData?.data && <ClientsChart data={chartData?.data} />}
    </div>
  );
}

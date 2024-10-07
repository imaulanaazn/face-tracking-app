"use client";
import {
  faPaperPlane,
  faUserGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import React, { useEffect, useState } from "react";
import {
  ChartResponse,
  getStatistics,
  getTransactionChart,
  StatisticsResponse,
} from "@/services/api/adminStatistic";
import Loading from "@/components/global/Loading";
import Dropdown from "@/components/global/SimpleDropDown";
import { toast } from "react-toastify";
import formateDateIntr from "@/lib/utils/formatter";
import TableOrders from "@/components/admin/dashboard/TableOrders";
import SearchBar from "@/components/merchant/SearchBar";
import TransactionBarChart from "@/components/admin/dashboard/TransactionBarChart";
import TransactionLineChart from "@/components/admin/dashboard/TransactionLineChart";
import {
  dashboardStatsBreakpoints,
  dashboardStatsTimeRange,
} from "@/lib/statics";
import { getStartAndEndDates } from "@/lib/utils/getDates";
import StatsCardSkeleton from "@/components/admin/skeleton/StatsCardSkeleton";
import BarChartSkeleton from "@/components/admin/skeleton/BarChartSkeleton";

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [frequencies, setFrequencies] = useState(dashboardStatsTimeRange);
  const [frequency, setFrequency] = useState<{
    value: string;
    text: string;
  }>({
    value: "day",
    text: "Day",
  });
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [search, setSearch] = useState("");

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

    const frequencies =
      frequencyOptions[option.value] || dashboardStatsTimeRange;
    const selectedFrequency =
      frequencyOptions[option.value]?.[0] || defaultFrequency;

    setFrequencies(frequencies);
    setFrequency(selectedFrequency);
    setSelectedOption(option);
  };

  const handleOptionFreqSelect = (option: { value: string; text: string }) => {
    setFrequency(option);
  };

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await getStatistics(
          getStartAndEndDates(selectedOption.value).startDate,
          getStartAndEndDates(selectedOption.value).endDate
        );
        setStatistics(response);
      } catch (err: any) {
        toast.error("Failed to fetch statistics");
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
  }, [selectedOption.value]);

  return (
    <div className="dashboard-wrapper w-full p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
        <div className="w-full md:w-max flex flex-col md:flex-row gap-4 md:gap-6 mt-8 md:mt-0">
          <div className="relative inline-block text-left z-30 flex items-center justify-between gap-4">
            <span className="text-gray-600">Time Range :</span>
            <Dropdown
              options={dashboardStatsTimeRange}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionRangeSelect}
            />
          </div>
          <div className="relative inline-block text-left z-30 flex items-center justify-between gap-4">
            <span className="text-gray-600">Frequency :</span>
            <Dropdown
              options={frequencies}
              selectedOption={frequency}
              onOptionSelect={handleOptionFreqSelect}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <StatsCardSkeleton />
      ) : (
        <Swiper
          className="mt-8"
          slidesPerView={1.5}
          breakpoints={dashboardStatsBreakpoints}
          onSlideChange={() => {}}
          onSwiper={() => {}}
        >
          <SwiperSlide style={{ height: "auto" }}>
            <div className="bg-blue-600 h-full rounded-xl md:rounded-2xl flex-1 text-white p-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faUserGroup} className="text-xl" />
                <h3 className="">Merchants</h3>
              </div>
              <div className="flex items-end gap-2 mt-4">
                <h4 className="text-4xl font-bold">
                  {statistics?.totalMerchants}
                </h4>
                {/* <div className="flex items-center gap-2 text-emerald-400">
                <span className="text-sm">+20%</span>
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="text-xs font-light"
                />
              </div> */}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ height: "auto" }}>
            <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
                <h3 className="">Transactions</h3>
              </div>
              <div className="flex items-end gap-2 mt-4">
                <h4 className="text-4xl font-bold">
                  {statistics?.totalTransactions.total.total}
                </h4>
              </div>
              <span className="text-sm font-light ">
                {formateDateIntr({
                  isoDate: statistics?.totalTransactions.startDate || "",
                  includeTime: false,
                })}{" "}
                -{" "}
                {formateDateIntr({
                  isoDate: statistics?.totalTransactions.endDate || "",
                  includeTime: false,
                })}
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ height: "auto" }}>
            <div className="bg-white h-full rounded-xl md:rounded-2xl flex-1 text-gray-700 p-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
                <h3 className="">New Merchants</h3>
              </div>
              <div className="flex items-end gap-2 mt-4">
                <h4 className="text-4xl font-bold">
                  {statistics?.totalNewMerchant.total}
                </h4>
                {/* <div className="flex items-center gap-2 text-rose-600">
                <span className="text-sm">-20%</span>
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="text-xs font-light"
                />
              </div> */}
              </div>
              <span className="text-sm font-light ">
                {formateDateIntr({
                  isoDate: statistics?.totalNewMerchant.startDate || "",
                  includeTime: false,
                })}{" "}
                -{" "}
                {formateDateIntr({
                  isoDate: statistics?.totalNewMerchant.endDate || "",
                  includeTime: false,
                })}
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      )}

      <div className="w-full flex flex-col xl:flex-row gap-6 md:gap-8 mt-6 md:mt-8">
        <TransactionLineChart
          time={selectedOption.text}
          frequency={frequency}
          selectedOption={selectedOption}
        />

        {loading && <BarChartSkeleton />}

        {!loading && statistics?.totalTransactions && (
          <TransactionBarChart
            data={statistics.totalTransactions.total}
            time={selectedOption.text}
          />
        )}
      </div>

      <div className="lg:p-8 md:p-6 p-4 bg-white rounded-xl mt-6 md:mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
          <div className="flex gap-6 items-center">
            <SearchBar
              placeHolder="Invoice Id / name / email / phone number"
              onChange={(keyword: string) => {
                setSearch(keyword);
              }}
            />
          </div>
        </div>

        <TableOrders search={search} />
      </div>
    </div>
  );
}

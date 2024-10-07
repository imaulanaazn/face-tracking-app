import { formatDate } from "@/lib/utils/formatter";
import { getStartAndEndDates } from "@/lib/utils/getDates";
import {
  ChartResponse,
  getTransactionChart,
} from "@/services/api/adminStatistic";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LineChartSkeleton from "../skeleton/LineChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IClientsChartProps {
  timestamp: string;
  totalTransaction: number;
  totalAmount: number;
}

export default function TransactionLineChart({
  selectedOption,
  frequency,
  time,
}: {
  time: string;
  frequency: { value: string; text: string };
  selectedOption: { value: string; text: string };
}) {
  const [chartData, setChartData] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchChartData(query?: {
    startDate: string;
    endDate: string;
    frequency: string;
  }) {
    try {
      const response = await getTransactionChart(query);
      setChartData(response);
    } catch (err) {
      toast.error("Failed to fetch chart data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const dates = getStartAndEndDates(selectedOption.value);
    fetchChartData({ frequency: frequency.value, ...dates });
  }, [selectedOption.value, frequency]);

  return (
    <div className="w-full xl:w-3/5 graphic rounded-xl md:rounded-2xl bg-white p-4 md:p-6 md:p-8">
      {loading && <LineChartSkeleton />}
      {chartData?.data && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Transaction graphic {time.toLocaleLowerCase()}
          </h2>
          <SplineChart data={chartData?.data} />
        </>
      )}
    </div>
  );
}

const SplineChart = ({ data }: { data: IClientsChartProps[] }) => {
  const [options, setOptions] = useState({});

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
        type: "datetime",
        categories: data.map((transaction) => transaction.timestamp),
        labels: {
          format: "dd MMM yyyy", // You can customize the date format
          rotate: -45, // Rotate labels for better fitting
          style: {
            fontSize: "10px",
          },
        },
        tickAmount: 10,
      },
    });
  }, [JSON.stringify(data)]);

  return (
    <div>
      <Chart
        options={options}
        series={[
          {
            name: "totalTransaction",
            data: data.map((transaction) => transaction.totalTransaction),
          },
          {
            name: "totalAmount",
            data: data.map((transaction) => transaction.totalAmount),
          },
        ]}
        type="line"
        height={350}
      />
    </div>
  );
};

import { formatDate } from "@/lib/utils/formatter";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IClientsChartProps {
  timestamp: string;
  totalTransaction: number;
  totalAmount: number;
}

export default function ClientsChart({ data }: { data: IClientsChartProps[] }) {
  return (
    <div className="graphic rounded-xl md:rounded-2xl bg-white p-4 md:p-6 md:p-8 mt-6 md:mt-8">
      <h2 className="text-xl font-semibold text-gray-800">
        Members graphic this month
      </h2>
      <SplineChart data={data} />
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
  }, [data.length]);

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

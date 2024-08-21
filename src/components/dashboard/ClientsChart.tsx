import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ClientsChart() {
  return (
    <div className="graphic rounded-xl md:rounded-2xl bg-white p-4 md:p-6 md:p-8 mt-6 md:mt-8">
      <h2 className="text-xl font-semibold text-gray-800">
        Grafik pelanggan bulan ini
      </h2>
      <SplineChart />
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

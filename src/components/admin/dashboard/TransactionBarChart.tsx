import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ITransactionsChartProps {
  total: number;
  totalPendingPayment: number;
  totalProcessing: number;
  totalCompleted: number;
  totalFailed: number;
}

export default function TransactionBarChart({
  data,
  time,
}: {
  data: ITransactionsChartProps;
  time: string;
}) {
  return (
    <div className="w-full xl:w-2/5 graphic rounded-xl md:rounded-2xl bg-white p-4 md:p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-800">
        Transaction Status {time.toLowerCase()}
      </h2>
      <BarChart data={data} />
    </div>
  );
}

const BarChart = ({ data }: { data: ITransactionsChartProps }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([
    {
      name: "Total",
      data: [
        data.totalPendingPayment,
        data.totalProcessing,
        data.totalCompleted,
        data.totalFailed,
      ],
    },
  ]);

  useEffect(() => {
    setChartSeries([
      {
        name: "Total",
        data: [
          data.totalPendingPayment,
          data.totalProcessing,
          data.totalCompleted,
          data.totalFailed,
        ],
      },
    ]);
    setChartOptions({
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Pending", "Processing", "Completed", "Failed"],
      },
    });
  }, [JSON.stringify(data)]);

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height="350"
      />
    </div>
  );
};

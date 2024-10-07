import React from "react";

export default function BarChartSkeleton() {
  return (
    <div className="animate-pulse w-full xl:w-2/5">
      <div className="w-full h-96 bg-white rounded-lg p-6 lg:p-8">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

        <div className="flex">
          <div className="flex flex-col justify-between px-4 mt-4">
            <div className="w-3 bg-gray-200 rounded h-6"></div>
            <div className="w-3 bg-gray-200 rounded h-6"></div>
            <div className="w-3 bg-gray-200 rounded h-6"></div>
            <div className="w-3 bg-gray-200 rounded h-6"></div>
            <div className="w-3 bg-gray-200 rounded h-6"></div>
            <div className="w-3 bg-gray-200 rounded h-6"></div>
          </div>

          <div className="flex flex-col items-start space-y-4 h-full">
            <div className="w-32 bg-gray-200 rounded h-6"></div>
            <div className="w-48 bg-gray-200 rounded h-6"></div>
            <div className="w-40 bg-gray-200 rounded h-6"></div>
            <div className="w-40 bg-gray-200 rounded h-6"></div>
            <div className="w-80 bg-gray-200 rounded h-6"></div>
            <div className="w-64 bg-gray-200 rounded h-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

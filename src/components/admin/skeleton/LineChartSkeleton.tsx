import React from "react";

export default function LineChartSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-64 bg-gray-200 rounded-lg">
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        </div>

        <div className="h-48 flex items-center justify-center">
          <svg className="w-full h-full text-gray-300">
            <polyline
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              points="20,120 80,100 140,150 200,90 260,130 320,80 380,100 440,70"
            ></polyline>
          </svg>
        </div>

        <div className="flex justify-between px-4 mt-4">
          <div className="h-3 bg-gray-300 rounded w-6"></div>
          <div className="h-3 bg-gray-300 rounded w-6"></div>
          <div className="h-3 bg-gray-300 rounded w-6"></div>
          <div className="h-3 bg-gray-300 rounded w-6"></div>
          <div className="h-3 bg-gray-300 rounded w-6"></div>
          <div className="h-3 bg-gray-300 rounded w-6"></div>
        </div>
      </div>
    </div>
  );
}

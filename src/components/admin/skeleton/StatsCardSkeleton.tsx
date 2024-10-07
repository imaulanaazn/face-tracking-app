import React from "react";

export default function StatsCardSkeleton() {
  return (
    <div className="h-48 flex items-center justify-center gap-6">
      <div className="p-6 bg-white rounded-xl shadow w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded mb-10"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl shadow w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded mb-10"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl shadow w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded mb-10"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

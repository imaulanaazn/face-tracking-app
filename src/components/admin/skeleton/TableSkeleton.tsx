import React from "react";

export default function TableSkeleton() {
  return (
    <div className="animate-pulse mt-6">
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
        <div className="bg-gray-200 p-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-2"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-2"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-2"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-2"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-2"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-2"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-2"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

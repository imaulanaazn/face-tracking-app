"use client";
import ClientTable from "@/components/reminder/ClientTable";
import SearchBar from "@/components/reminder/SearchBar";
import SearchFilter from "@/components/reminder/SearchFilter";
import React from "react";

export default function UserReminder() {
  return (
    <div className="wrapper md:p-8 p-6">
      <div className="lg:p-8 md:p-6 p-4 bg-white rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Reminder</h2>
          <div className="flex gap-6 items-center">
            <SearchFilter />
            <SearchBar />
          </div>
        </div>

        <ClientTable />

        {/* <Pagination
          onPageChange={handlePageClick}
          page={banners.page}
          limit={banners.limit}
          total={banners.total}
          totalPage={banners.totalPage}
        /> */}
      </div>
    </div>
  );
}

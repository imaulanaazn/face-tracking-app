"use client";
import HistoryFilter from "@/components/merchant/message-history/HistoryFilter";
import TableHistory from "@/components/merchant/message-history/TableHistory";
import ClientTable from "@/components/merchant/send-message/ClientTable";
import SearchBar from "@/components/merchant/send-message/SearchBar";
import React, { useState } from "react";

export default function UserReminder() {
  const [filter, setFilter] = useState({
    limit: 10,
  });

  const [search, setSearch] = useState("");

  return (
    <div className="wrapper md:p-8 p-6">
      <div className="lg:p-8 md:p-6 p-4 bg-white rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Riwayat Pesan</h2>
          <div className="flex gap-6 items-center">
            <HistoryFilter
              handleApply={(filter) => {
                setFilter(filter);
              }}
            />
            <SearchBar
              onChange={(keyword: string) => {
                setSearch(keyword);
              }}
            />
          </div>
        </div>

        <TableHistory filter={filter} search={search} />

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

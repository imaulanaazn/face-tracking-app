"use client";
import ConnectionsFilter from "@/components/admin/connections/ConnectionsFilter";
import TableConnections from "@/components/admin/connections/TableConnections";
import SearchBar from "@/components/merchant/SearchBar";
import { createNewBoloNumber } from "@/services/api/adminConnections";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AdminConnections() {
  const [filter, setFilter] = useState({
    limit: 10,
    sort: "dateCreated",
    order: "DESC",
  });

  const [search, setSearch] = useState("");

  return (
    <div className="wrapper md:p-8 p-6">
      <div className="lg:p-8 md:p-6 p-4 bg-white rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Mobile Numbers
          </h2>
          <div className="flex gap-6 items-center">
            <ConnectionsFilter
              handleApply={(filter) => {
                setFilter(filter);
              }}
            />
            <SearchBar
              placeHolder="Search Phone Number"
              onChange={(keyword: string) => {
                setSearch(keyword);
              }}
            />
          </div>
        </div>

        <TableConnections filter={filter} search={search} />

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

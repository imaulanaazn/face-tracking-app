"use client";
import SearchBar from "@/components/merchant/SearchBar";
import SubscriptionsFilter from "@/components/merchant/subscriptions/SubscriptionsFilter";
import TableSubscriptions from "@/components/merchant/subscriptions/TableSubscriptions";
import React, { useState } from "react";

export default function Subscriptions() {
  const [filter, setFilter] = useState({
    limit: 10,
    sort: "startDate",
    order: "DESC",
  });

  const [search, setSearch] = useState("");

  return (
    <div className="wrapper md:p-8 p-6">
      <div className="lg:p-8 md:p-6 p-4 bg-white rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Subscriptions</h2>
          <div className="flex gap-6 items-center">
            <SubscriptionsFilter
              handleApply={(filter) => {
                setFilter(filter);
              }}
            />
            <SearchBar
              placeHolder="Search Plane Name"
              onChange={(keyword: string) => {
                setSearch(keyword);
              }}
            />
          </div>
        </div>

        <TableSubscriptions filter={filter} search={search} />

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

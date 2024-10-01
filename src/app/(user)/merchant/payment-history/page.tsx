"use client";
import HistoryFilter from "@/components/merchant/payment-history/HistoryFilter";
import TableHistory from "@/components/merchant/payment-history/TableHistory";
import SearchBar from "@/components/merchant/SearchBar";
import { IPlan } from "@/data-types/merchant";
import { getPaymentStatuses } from "@/services/api/payment";
import { getPlans } from "@/services/api/subscriptionPlans";
import React, { useEffect, useState } from "react";

export default function PaymentHistory() {
  const [filter, setFilter] = useState({
    limit: 10,
    sort: "dateCreated",
    order: "DESC",
    planId: "",
    status: "",
  });

  const [search, setSearch] = useState("");

  const [plans, setPlans] = useState<IPlan[]>([]);
  const [statuses, setStatuses] = useState<{ name: string; cd: string }[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await getPlans();
        setPlans(response.data);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    fetchPlans();
  }, []);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const response = await getPaymentStatuses();
        setStatuses(response.data);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    fetchStatuses();
  }, []);

  return (
    <div className="wrapper md:p-8 p-6">
      <div className="lg:p-8 md:p-6 p-4 bg-white rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Riwayat Pembayaran
          </h2>
          <div className="flex gap-6 items-center">
            <HistoryFilter
              handleApply={(filter) => {
                setFilter(filter);
              }}
              plans={plans}
              statuses={statuses}
            />
            <SearchBar
              placeHolder="Search Invoice Id"
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

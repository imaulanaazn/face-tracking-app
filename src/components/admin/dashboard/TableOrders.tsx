import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrders, OrdersResponse } from "@/services/api/adminStatistic";
import formateDateIntr from "@/lib/utils/formatter";
import { getPaymentStatuses } from "@/services/api/payment";
import { ORDER_STATUS } from "@/enum";

interface IQuery {
  page?: string;
  limit?: number;
  order?: string;
  sort?: string;
  search?: string;
}

const initialHistory = {
  limit: 10,
  sort: "dateCreated",
  order: "DESC",
  totalPages: 0,
  page: 1,
  data: [],
  totalData: 0,
};

export default function TableOrders({ search }: { search: string }) {
  const [orders, setOrders] = useState<OrdersResponse>(initialHistory);
  const [statuses, setStatuses] = useState<{ name: string; cd: string }[]>([]);

  const [query, setQuery] = useState<{
    order: string;
    page: number;
    sort: string;
  }>({
    order: "DESC",
    page: 1,
    sort: "dateCreated",
  });

  const fetchOrders = async () => {
    setOrders(initialHistory);
    const newQuery: IQuery = {
      ...query,
      page: query.page.toString(),
    };

    if (search) {
      newQuery.search = search;
    }

    try {
      const response = await getOrders(newQuery);
      setOrders(response);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [query.page, query.sort, query.order, search]);

  const handlePageChange = (direction: string) => {
    if (direction === "next" && orders.data.length === 10) {
      setQuery((prev) => ({ ...prev, page: query.page + 1 }));
    } else if (direction === "prev" && query.page > 0) {
      setQuery((prev) => ({ ...prev, page: query.page - 1 }));
    }
  };

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const response = await getPaymentStatuses();
        setStatuses(response.data);
      } catch (error: any) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
    fetchStatuses();
  }, []);

  function getStatusColor(statusCd: string): string {
    if (statusCd === ORDER_STATUS.COMPLETED) {
      return "text-emerald-600";
    } else if (statusCd === ORDER_STATUS.PENDING_PAYMENT) {
      return "text-yellow-600";
    } else if (statusCd === ORDER_STATUS.PROCESSING) {
      return "text-blue-600";
    } else {
      return "text-rose-600";
    }
  }

  return (
    <>
      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto">
          <div className="w-full inline-block align-middle">
            <div className="overflow-hidden overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-center">
                        <p>Invoice Id</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-center">
                        <p>Order Type</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-center">
                        <p>Subsciption Periode</p>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-center">
                        <p>Periode on Month</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-center">
                        <p>Order at</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-center">
                        <p>Status</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.data.map((order) => (
                    <tr
                      key={order.invoiceId}
                      className="bg-white hover:bg-gray-100"
                    >
                      <td className="px-4 py-4 text-sm font-medium  text-gray-800 whitespace-nowrap">
                        {order.invoiceId}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <p>{order.type}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        {order.periodeSubscription}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        {order.periodeOnMonth}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        {formateDateIntr({
                          isoDate: order.createdAt,
                          includeTime: false,
                        })}
                      </td>
                      <td
                        className={`px-4 py-4 text-sm whitespace-nowrap text-center ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {statuses.map((status) =>
                          status.cd === order.status ? status.name : ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center items-center mt-4 gap-4">
                <button
                  onClick={() => handlePageChange("prev")}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                  disabled={query.page === 1}
                >
                  Prev
                </button>
                <input
                  type="number"
                  className="py-2 px-4 px-1 border border-gray-400 rounded-md max-w-28 text-center"
                  min={1}
                  max={100}
                  value={query.page}
                  onChange={(e) => {
                    setQuery((prev) => ({
                      ...prev,
                      page: parseInt(e.target.value),
                    }));
                  }}
                />
                <button
                  onClick={() => handlePageChange("next")}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                  disabled={orders.totalPages === orders.page}
                >
                  Next
                </button>
              </div>

              <p className="text-center mt-4">
                total page : {orders.totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

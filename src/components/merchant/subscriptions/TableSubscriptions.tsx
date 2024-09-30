import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IGetSubscriptionsResponse,
  IPaymentHistoryResponse,
} from "@/data-types/merchant";
import { toast } from "react-toastify";
import { getMerchantSubscriptions } from "@/services/api/subscriptionPlans";
import formatDateToIndonesian from "@/lib/formatter";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface IFilter {
  limit: number;
  sort: string;
  order: string;
}

interface IQuery {
  page?: string;
  limit?: number;
  order?: string;
  sort?: string;
  search?: string;
}

const initialSubscription = {
  limit: 10,
  sort: "dateCreated",
  order: "DESC",
  totalPages: 0,
  page: 1,
  data: [],
  totalData: 0,
};

export default function TableSubscriptions({
  filter,
  search,
}: {
  filter: IFilter;
  search: string;
}) {
  const [subscriptions, setSubscriptions] =
    useState<IGetSubscriptionsResponse>(initialSubscription);

  const [query, setQuery] = useState<{
    order: string;
    page: number;
    sort: string;
  }>({
    order: filter.order,
    page: 1,
    sort: filter.sort,
  });

  const fetchSubscriptions = async () => {
    setSubscriptions(initialSubscription);
    const newQuery: IQuery = {
      ...query,
      page: query.page.toString(),
      ...filter,
    };

    if (search) {
      newQuery.search = search;
    }

    try {
      const response = await getMerchantSubscriptions(newQuery);
      setSubscriptions(response.data);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching histories:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [
    query.page,
    query.sort,
    query.order,
    filter.limit,
    filter.sort,
    filter.order,
    search,
  ]);

  const handlePageChange = (direction: string) => {
    if (direction === "next" && subscriptions.data.length === filter.limit) {
      setQuery((prev) => ({ ...prev, page: query.page + 1 }));
    } else if (direction === "prev" && query.page > 0) {
      setQuery((prev) => ({ ...prev, page: query.page - 1 }));
    }
  };

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
                      <div className="flex gap-3 items-center justify-left">
                        <p>Plan Name</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-left">
                        <p>Device Limit</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-left">
                        <p>Remaining Periode</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-left">
                        <p>Start Date</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-left">
                        <p>End Date</p>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-start">
                        <p>Status</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 items-center justify-center">
                        <p>Aksi</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subscriptions.data.map((subs) => (
                    <tr
                      key={subs.plan.id}
                      className="bg-white hover:bg-gray-100"
                    >
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {subs.plan.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {subs.deviceLimit}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {subs.remainPeriode}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDateToIndonesian({
                          isoDate: subs.startDate,
                          includeTime: true,
                        })}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDateToIndonesian({
                          isoDate: subs.endDate,
                          includeTime: true,
                        })}
                      </td>
                      <td
                        className={`px-4 py-4 text-sm whitespace-nowrap font-medium ${
                          subs.isActive ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {subs.isActive ? "Active" : "Not Active"}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        <a
                          href={`/merchant/subscriptions/${subs.id}`}
                          className="py-2 px-4 rounded-md bg-blue-600 text-white w-max mx-auto flex gap-2 items-center justify-center"
                        >
                          Details <FontAwesomeIcon icon={faArrowRight} />
                        </a>
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
                  disabled={subscriptions.totalPages === subscriptions.page}
                >
                  Next
                </button>
              </div>

              <p className="text-center mt-4">
                total halaman : {subscriptions.totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

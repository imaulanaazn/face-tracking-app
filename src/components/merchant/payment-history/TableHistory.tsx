import React, { useEffect, useState } from "react";
import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IPaymentHistoryResponse } from "@/data-types/merchant";
import { toast } from "react-toastify";
import {
  getPaymentHistories,
  getPaymentStatuses,
} from "@/services/api/payment";
import { ORDER_STATUS } from "@/enum";
import TableSkeleton from "@/components/admin/skeleton/TableSkeleton";

interface IFilter {
  limit: number;
  sort: string;
  order: string;
  planId: string;
  status: string;
}

interface IQuery {
  page?: string;
  limit?: number;
  order?: string;
  invoiceId?: string;
  sort?: string;
  planId?: string;
  status?: string;
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

export default function TableHistory({
  filter,
  search,
}: {
  filter: IFilter;
  search: string;
}) {
  const [histories, setHistories] =
    useState<IPaymentHistoryResponse>(initialHistory);
  const [statuses, setStatuses] = useState<{ name: string; cd: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState<{
    order: string;
    page: number;
    sort: string;
  }>({
    order: filter.order,
    page: 1,
    sort: filter.sort,
  });

  const fetchistories = async () => {
    setHistories(initialHistory);
    const newQuery: IQuery = {
      ...query,
      page: query.page.toString(),
      ...filter,
    };

    if (search) {
      newQuery.invoiceId = search;
    }
    if (!filter.planId) delete newQuery["planId"];
    if (!filter.status) delete newQuery["status"];

    try {
      const response = await getPaymentHistories(newQuery);
      setHistories(response.data);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching histories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchistories();
  }, [
    query.page,
    query.sort,
    query.order,
    filter.limit,
    filter.sort,
    filter.order,
    filter.planId,
    filter.status,
    search,
  ]);

  const handlePageChange = (direction: string) => {
    if (direction === "next" && histories.data.length === filter.limit) {
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
      {loading && <TableSkeleton />}
      {!loading && (
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
                        <div className="flex gap-3 cursor-pointer items-center justify-center">
                          <p>Invoice Id</p>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <div className="flex gap-3 cursor-pointer items-center justify-center">
                          <p>Plan Name</p>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <div className="flex gap-3 cursor-pointer items-center justify-center">
                          <p>Subsciption Periode</p>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <div className="flex gap-3 cursor-pointer items-center justify-center">
                          <p>Total Amount</p>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <div className="flex gap-3 cursor-pointer items-center justify-center">
                          <p>Payment Method</p>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <div className="flex gap-3 cursor-pointer items-center justify-center">
                          <p>Status</p>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <div className="flex gap-3 cursor-pointer items-center justify-center">
                          <p>Action</p>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {histories.data.map((history) => (
                      <tr
                        key={history.plan.id}
                        className="bg-white hover:bg-gray-100"
                      >
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {history.invoiceId}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          <p>{history.plan.name}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                          {history.periodeSubscription}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {history.totalAmount}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                          {history.paymentMethod.name}
                        </td>
                        <td
                          className={`px-4 py-4 text-sm whitespace-nowrap text-center ${getStatusColor(
                            history.status
                          )}`}
                        >
                          {statuses.map((status) =>
                            status.cd === history.status ? status.name : ""
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                          <a
                            href={`/payment/${history.invoiceId}`}
                            className="py-2 px-4 rounded-md bg-blue-600 text-white flex items-center gap-2 w-max mx-auto"
                          >
                            Details <FontAwesomeIcon icon={faArrowRight} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!histories.data.length && !loading && (
                  <p className="text-gray-800 text-center mt-6">
                    Data is Empty
                  </p>
                )}

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
                    disabled={histories.totalPages === histories.page}
                  >
                    Next
                  </button>
                </div>

                <p className="text-center mt-4">
                  total page : {histories.totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

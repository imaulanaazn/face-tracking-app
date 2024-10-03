import React, { useEffect, useState } from "react";
import { IGetBoloMerchantsAPIResponse } from "@/data-types/merchant";
import { toast } from "react-toastify";
import { getBoloMerchants } from "@/services/api/adminMerchants";
import Image from "next/image";
import Link from "next/link";

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

const initialMerchants = {
  limit: 10,
  sort: "dateCreated",
  order: "DESC",
  totalPages: 0,
  page: 1,
  data: [],
  totalData: 0,
};

export default function TableMerchants({
  filter,
  search,
}: {
  filter: IFilter;
  search: string;
}) {
  const [merchants, setMerchants] =
    useState<IGetBoloMerchantsAPIResponse>(initialMerchants);

  const [query, setQuery] = useState<{
    order: string;
    page: number;
    sort: string;
  }>({
    order: filter.order,
    page: 1,
    sort: filter.sort,
  });

  const fetchMerchants = async () => {
    setMerchants(initialMerchants);
    const newQuery: IQuery = {
      ...query,
      page: query.page.toString(),
      ...filter,
    };

    if (search) {
      newQuery.search = search;
    }

    try {
      const response = await getBoloMerchants(newQuery);
      setMerchants(response.data);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching merchants:", error);
    }
  };

  useEffect(() => {
    fetchMerchants();
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
    if (direction === "next" && merchants.data.length === filter.limit) {
      setQuery((prev) => ({ ...prev, page: query.page + 1 }));
    } else if (direction === "prev" && query.page > 0) {
      setQuery((prev) => ({ ...prev, page: query.page - 1 }));
    }
  };

  return (
    <>
      <div className="flex flex-col mt-6">
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
                      <p>Merchant</p>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <p>Email</p>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <p>Mobile Number</p>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <p>Action</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {merchants.data.map((merchant) => (
                    <tr
                      key={merchant.id}
                      className="bg-white hover:bg-gray-100"
                    >
                      <td className="px-4 py-4 text-sm text-gray-800 whitespace-nowrap font-medium ">
                        <div className="flex gap-4 items-center">
                          <div className="rounded overflow-hidden">
                            <Image
                              src={merchant.logo || ""}
                              width={32}
                              height={32}
                              alt={merchant.name}
                            />
                          </div>
                          <span>{merchant.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <p>{merchant.email}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {merchant.mobileNumber}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <Link
                          href={`/admin/dashboard/merchant/${merchant.id}`}
                          className="py-2 px-4 rounded-md bg-blue-600 text-white"
                        >
                          See Details
                        </Link>
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
                  disabled={merchants.totalPages === merchants.page}
                >
                  Next
                </button>
              </div>

              <p className="text-center mt-4">
                total halaman : {merchants.totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

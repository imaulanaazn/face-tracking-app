import React, { useEffect, useState } from "react";
import { IGetAdminConnectionsAPIResponse } from "@/data-types/merchant";
import { toast } from "react-toastify";
import {
  createNewBoloNumber,
  getAdminConnections,
} from "@/services/api/adminConnections";
import TableSkeleton from "../skeleton/TableSkeleton";

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

const initiaConnections = {
  limit: 10,
  sort: "dateCreated",
  order: "DESC",
  totalPages: 0,
  page: 1,
  data: [],
  totalData: 0,
};

export default function TableConnections({
  filter,
  search,
}: {
  filter: IFilter;
  search: string;
}) {
  const [connections, setConnections] =
    useState<IGetAdminConnectionsAPIResponse>(initiaConnections);
  const [loading, setLoading] = useState(true);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const [query, setQuery] = useState<{
    order: string;
    page: number;
    sort: string;
  }>({
    order: filter.order,
    page: 1,
    sort: filter.sort,
  });

  const fetchConnections = async () => {
    setConnections(initiaConnections);
    const newQuery: IQuery = {
      ...query,
      page: query.page.toString(),
      ...filter,
    };

    if (search) {
      newQuery.search = search;
    }

    try {
      const response = await getAdminConnections(newQuery);
      setConnections(response.data);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
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
    if (direction === "next" && connections.data.length === filter.limit) {
      setQuery((prev) => ({ ...prev, page: query.page + 1 }));
    } else if (direction === "prev" && query.page > 0) {
      setQuery((prev) => ({ ...prev, page: query.page - 1 }));
    }
  };

  async function handleNewBoloNumber() {
    if (newPhoneNumber) {
      const toastId = toast.loading("Creating New Number");
      try {
        const response = await createNewBoloNumber(newPhoneNumber);
        toast.update(toastId, {
          type: "success",
          isLoading: false,
          render: "Create New Bolo Number Success",
          autoClose: 3000,
        });
        fetchConnections();
        setNewPhoneNumber("");
      } catch (error: any) {
        toast.update(toastId, {
          type: "error",
          isLoading: false,
          render: error.message,
          autoClose: 3000,
        });
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className="flex gap-4 mt-10 md:mt-8 justify-center">
        <input
          onChange={(e) => {
            setNewPhoneNumber(e.target.value);
          }}
          value={newPhoneNumber}
          placeholder="Type Mobile Number"
          id="new-password"
          type="number"
          className="w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded focus:outline-blue-600 rounded-md"
        />
        <button
          onClick={handleNewBoloNumber}
          className="rounded-md bg-blue-600 text-white py-2 px-4 shrink-0"
        >
          Add Number
        </button>
      </div>

      {loading && <TableSkeleton />}

      {!loading && (
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
                        <p>Mobile Number</p>
                      </th>
                      <th
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <p>Connection Status</p>
                      </th>
                      <th
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <p>User</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {connections.data.map((connection) => (
                      <tr
                        key={connection.id}
                        className="bg-white hover:bg-gray-100"
                      >
                        <td className="px-4 py-4 text-sm text-gray-800 whitespace-nowrap font-medium ">
                          {connection.mobileNumber}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <p>{connection.status}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {connection.usedBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!connections.data.length && !loading && (
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
                    disabled={connections.totalPages === connections.page}
                  >
                    Next
                  </button>
                </div>

                <p className="text-center mt-4">
                  total page : {connections.totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

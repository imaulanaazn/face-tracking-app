import React, { useEffect, useState } from "react";
import {
  faArrowDown,
  faArrowUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IMemberFIlter } from "@/data-types/merchant";
import formateDateIntr from "@/lib/formatter";
import { getMembersByMerchant } from "@/services/api/merchantMembers";

const column = [
  {
    id: "name",
    name: "Nama",
  },
  {
    id: "mobileNumber",
    name: "No Telp",
  },
  {
    id: "lastDetection",
    name: "Terakhir berkunjung",
  },
];

interface IGetMemberResponse {
  data: IMember[];
  limit: number;
  sort: string;
  order: string;
  totalPages: number;
  page: number;
}

interface IMember {
  id: string;
  name: string;
  mobileNumber: string;
  lastDetection: string;
  merchant: IMemberMerchant;
}

interface IMemberMerchant {
  id: string;
  name: string;
  logo: string;
}

interface IQuery {
  page?: string;
  limit?: number;
  order?: string;
  name?: string;
  transaction?: string;
  unit?: string;
}

export default function ClientTable({
  filter,
  search,
}: {
  filter: IMemberFIlter;
  search: string;
}) {
  const [members, setMembers] = useState<IGetMemberResponse>({
    limit: 10,
    sort: "name",
    order: "DESC",
    totalPages: 0,
    page: 1,
    data: [],
  });

  const [selectAll, setSelectAll] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const path = usePathname();

  const [query, setQuery] = useState<{
    order: string;
    limit: number;
    page: number;
    sort: string;
  }>({
    order: "DESC",
    limit: 10,
    page: 1,
    sort: "dateCreated",
  });

  useEffect(() => {
    if (selected.length !== members.data.length && selectAllChecked) {
      setSelectAllChecked(false);
    }
  }, [selectAllChecked, selected.length]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelected(members.data.map((data) => data.id));
    } else {
      setSelected([]);
    }
  };

  const handleRowSelect = (userId: string) => {
    if (selected.includes(userId)) {
      setSelected(selected.filter((id) => id !== userId));
    } else {
      setSelected([...selected, userId]);
    }
  };

  function handleNextStep() {
    if (selected.length) {
      const jsonData = JSON.stringify(selected);
      localStorage.setItem("members", jsonData);
      router.push(path + "/compose-message");
    }
  }

  const fetchMembers = async () => {
    const newQuery: IQuery = {
      ...query,
      page: query.page.toString(),
      ...filter,
    };

    if (search) {
      newQuery.name = search;
    }

    try {
      const response = await getMembersByMerchant(newQuery);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [
    query.page,
    query.limit,
    query.sort,
    query.order,
    filter.limit,
    filter.transaction,
    filter.unit,
    search,
  ]);

  const handleSearchChange = (event: any) => {
    setQuery((prev) => ({ ...query, search: event.target.value }));
  };

  const handlePageChange = (direction: string) => {
    if (direction === "next" && members.data.length === filter.limit) {
      setQuery((prev) => ({ ...prev, page: query.page + 1 }));
    } else if (direction === "prev" && query.page > 0) {
      setQuery((prev) => ({ ...prev, page: query.page - 1 }));
    }
  };

  const handleRowsPerPageChange = (event: any) => {
    setQuery((prev) => ({ ...prev, limit: parseInt(event.target.value, 10) }));
    setQuery((prev) => ({ ...prev, page: 0 }));
  };

  return (
    <>
      {selected.length > 0 && (
        <div className="mt-4 flex justify-between items-center bg-blue-100 py-4 px-6 rounded-md">
          <h2 className="font-medium text-blue-500">
            <span className="font-semibold text-lg mr-2">
              {selected.length}
            </span>{" "}
            pelanggan dipilih
          </h2>
          <div className="relative">
            <div
              onClick={handleNextStep}
              className="cursor-pointer"
              data-tooltip-id="tooltip-delete"
              data-tooltip-content="Tulis Pesan"
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="lg"
                className="text-blue-500"
              />
            </div>
            <ReactTooltip
              id="tooltip-delete"
              style={{
                fontSize: "12px",
                padding: "10px",
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto">
          <div className="w-full inline-block align-middle">
            <div className="overflow-hidden overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th scope="col" className="py-3 pl-4">
                      <div className="flex items-center h-5 relative">
                        <input
                          type="checkbox"
                          name="selectAll"
                          id="selectAll"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className={`h-4 w-4 absolute cursor-pointer ${
                            !selectAll &&
                            selected.length > 0 &&
                            "appearance-none"
                          }`}
                        />
                        {!selectAll && selected.length > 0 && (
                          <div className="h-4 w-4 bg-gray-400 flex items-center justify-center">
                            <div className="w-2 h-1 bg-gray-200"></div>
                          </div>
                        )}

                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </th>
                    {column.map((item) => (
                      <th
                        key={item.id}
                        scope="col"
                        className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                      >
                        <div
                          className="flex gap-3 cursor-pointer items-center"
                          onClick={() =>
                            setQuery((prev) => ({
                              ...prev,
                              sort: item.id,
                              order:
                                query.sort === item.id && query.order === "ASC"
                                  ? "DESC"
                                  : "ASC",
                            }))
                          }
                        >
                          <p>{item.name}</p>
                          {query.sort === item.id && (
                            <FontAwesomeIcon
                              icon={
                                query.order === "ASC" ? faArrowUp : faArrowDown
                              }
                            />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {members.data.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => handleRowSelect(user.id)}
                      className={`${
                        selected.includes(user.id)
                          ? "bg-gray-100"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            name={user.id}
                            id={user.id}
                            checked={selected.includes(user.id)}
                            onChange={() => handleRowSelect(user.id)}
                            className="h-4 w-4 cursor-pointer"
                          />
                          <label htmlFor="checkbox" className="sr-only">
                            Checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <p>{user.name}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {user.mobileNumber}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formateDateIntr({
                          isoDate: user.lastDetection,
                          includeTime: true,
                        })}
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
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  disabled={
                    Math.ceil(members.totalPages / members.limit) ===
                    members.page
                  }
                >
                  Next
                </button>
              </div>

              <p className="text-center mt-4">
                total halaman : {members.totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

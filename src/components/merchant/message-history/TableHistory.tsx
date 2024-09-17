import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  faArrowDown,
  faArrowUp,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { getMessageHistories } from "@/services/api/merchant";
import formatDateToIndonesian from "@/lib/formatter";
import { IMessageHistoryResponse } from "@/data-types/merchant";
import { toast } from "react-toastify";

const column = [
  {
    id: "name",
    name: "Nama",
  },
  {
    id: "content",
    name: "Message",
  },
  {
    id: "dateCreated",
    name: "Tanggal dibuat",
  },
];

interface IFilter {
  limit: number;
}

interface IQuery {
  page?: string;
  limit?: number;
  order?: string;
  name?: string;
  sort?: string;
}

export default function TableHistory({
  filter,
  search,
}: {
  filter: IFilter;
  search: string;
}) {
  const [histories, setHistories] = useState<IMessageHistoryResponse>({
    limit: 10,
    sort: "dateCreated",
    order: "DESC",
    totalPages: 0,
    page: 1,
    data: [],
    totalRecipients: {
      totalRecipients: "0",
      totalSent: "0",
      totalPending: "0",
      totalFailed: "0",
    },
  });

  const [selectAll, setSelectAll] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const [query, setQuery] = useState<{
    order: string;
    limit: number;
    page: number;
    sort: string;
  }>({
    order: "DESC",
    limit: filter.limit || 10,
    page: 1,
    sort: "dateCreated",
  });

  useEffect(() => {
    if (selected.length !== histories.data.length && selectAllChecked) {
      setSelectAllChecked(false);
    }
  }, [selectAllChecked, selected.length]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelected(histories.data.map((data) => data.id));
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

  const fetchistories = async () => {
    const newQuery: IQuery = {
      ...query,
      page: query.page.toString(),
      ...filter,
    };

    if (search) {
      newQuery.name = search;
    }

    try {
      const response = await getMessageHistories(newQuery);
      setHistories(response.data);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching histories:", error);
    }
  };

  useEffect(() => {
    fetchistories();
  }, [query.page, query.limit, query.sort, query.order, filter.limit, search]);

  const handlePageChange = (direction: string) => {
    if (direction === "next" && histories.data.length === filter.limit) {
      setQuery((prev) => ({ ...prev, page: query.page + 1 }));
    } else if (direction === "prev" && query.page > 0) {
      setQuery((prev) => ({ ...prev, page: query.page - 1 }));
    }
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
              onClick={() => {}}
              className="cursor-pointer"
              data-tooltip-id="tooltip-delete"
              data-tooltip-content="Hapus History"
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                className="text-rose-500"
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
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 cursor-pointer items-center justify-center">
                        <p>Berhasil dikirim</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 cursor-pointer items-center justify-center">
                        <p>Pending</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 cursor-pointer items-center justify-center">
                        <p>Gagal dikirim</p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                    >
                      <div className="flex gap-3 cursor-pointer items-center justify-center">
                        <p>Aksi</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {histories.data.map((history) => (
                    <tr
                      key={history.id}
                      onClick={() => handleRowSelect(history.id)}
                      className={`${
                        selected.includes(history.id)
                          ? "bg-gray-100"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            name={history.id}
                            id={history.id}
                            checked={selected.includes(history.id)}
                            onChange={() => handleRowSelect(history.id)}
                            className="h-4 w-4 cursor-pointer"
                          />
                          <label htmlFor="checkbox" className="sr-only">
                            Checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <p>{history.name}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {history.content.slice(10)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDateToIndonesian({
                          isoDate: history.dateCreated,
                          includeTime: false,
                        })}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        {history.totalRecipients}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        {history.totalPending}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        {history.totalFailed}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        <a
                          href={`/merchant/message-detail/${history.id}`}
                          className="py-2 px-4 rounded-md bg-blue-600 text-white"
                        >
                          Lihat Pesan
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
                  disabled={histories.totalPages === histories.page}
                >
                  Next
                </button>
              </div>

              <p className="text-center mt-4">
                total halaman : {histories.totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import {
  faArrowDown,
  faArrowUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip as ReactTooltip } from "react-tooltip";

const column = [
  {
    id: "nama_depan",
    name: "Nama Depan",
  },
  {
    id: "nama_belakang",
    name: "Nama Belakang",
  },
  {
    id: "mobile_number",
    name: "No Telp",
  },
];

const dummyData = [
  {
    id: "1",
    nama_depan: "John",
    nama_belakang: "Doe",
    handle: "johndoe",
  },
  {
    id: "2",
    nama_depan: "Jane",
    nama_belakang: "Smith",
    handle: "janesmith",
  },
  {
    id: "3",
    nama_depan: "Michael",
    nama_belakang: "Johnson",
    handle: "michaeljohnson",
  },
  {
    id: "4",
    nama_depan: "Emily",
    nama_belakang: "Williams",
    handle: "emilywilliams",
  },
  {
    id: "5",
    nama_depan: "David",
    nama_belakang: "Brown",
    handle: "davidbrown",
  },
  {
    id: "6",
    nama_depan: "Sarah",
    nama_belakang: "Jones",
    handle: "sarahjones",
  },
  {
    id: "7",
    nama_depan: "Daniel",
    nama_belakang: "Martinez",
    handle: "danielmartinez",
  },
  {
    id: "8",
    nama_depan: "Olivia",
    nama_belakang: "Lee",
    handle: "olivialee",
  },
  {
    id: "9",
    nama_depan: "William",
    nama_belakang: "Garcia",
    handle: "williamgarcia",
  },
  {
    id: "10",
    nama_depan: "Ava",
    nama_belakang: "Lopez",
    handle: "avalopez",
  },
];

export default function ClientTable() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const path = usePathname();

  const [query, setQuery] = useState<{
    search: {
      key: string;
      value: string;
    }[];
    order: string;
    mobileNumber: string;
    limit: number;
    page: number;
    sort: string;
  }>({
    search: [],
    order: "mobile_number",
    mobileNumber: "08895501350",
    limit: 20,
    page: 1,
    sort: "DESC",
  });

  useEffect(() => {
    if (selected.length !== dummyData.length && selectAllChecked) {
      setSelectAllChecked(false);
    }
  }, [selectAllChecked, selected.length]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelected(dummyData.map((data) => data.id));
    } else {
      setSelected([]);
    }
  };

  const handleRowSelect = (gameId: string) => {
    if (selected.includes(gameId)) {
      setSelected(selected.filter((id) => id !== gameId));
    } else {
      setSelected([...selected, gameId]);
    }
  };

  function handleNextStep() {
    if (selected.length) {
      const jsonData = JSON.stringify(selected);
      sessionStorage.setItem("users", jsonData);
      router.push(path + "/compose-message");
    }
  }

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
              data-tooltip-content="Kirim Pesan"
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
                  {dummyData.map((user) => (
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
                        <p>{user.nama_depan}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {!user.nama_belakang ? <p>N/A</p> : user.nama_belakang}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {!user.nama_belakang ? <p>N/A</p> : user.handle}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

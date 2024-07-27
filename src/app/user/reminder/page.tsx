"use client";
import {
  faCheck,
  faFilter,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

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

export default function UserReminder() {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  function selectAllCheckChange(checked: boolean) {
    if (checked) {
      const dataIds = dummyData.map((data) => data.id);
      setSelectedData(dataIds);
      setSelectAllChecked(true);
    } else {
      setSelectedData([]);
      setSelectAllChecked(false);
    }
  }

  function handleCheckChange(checked: boolean, id: string) {
    if (checked) {
      setSelectedData((prev) => [...prev, id]);
    } else {
      setSelectedData((prev) => prev.filter((dataId) => dataId !== id));
    }
  }

  useEffect(() => {
    if (selectedData.length !== dummyData.length && selectAllChecked) {
      setSelectAllChecked(false);
    }
  }, [selectAllChecked, selectedData.length]);

  return (
    <div className="wrapper md:p-8 p-6">
      <div className="md:p-8 p-6 bg-white rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-lg font-medium">Reminder</h2>
          <div className="flex gap-4 items-center hover:cursor-pointer text-gray-600 hover:text-blue-600">
            <SearchFilter />
            <SearchBar />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block w-full">
              <div className="overflow-x-scroll">
                <table className="min-w-full">
                  <thead className="bg-gray-200 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                      >
                        First
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                      >
                        Last
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                      >
                        Handle
                      </th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-2 text-left">
                        <div className="flex gap-2 items-center w-max m-auto">
                          <span>Select All</span>
                          <div className="inline-flex items-center">
                            <label
                              className="relative flex cursor-pointer items-center rounded-full p-3"
                              aria-label="checkbox"
                              data-ripple-dark="true"
                            >
                              <input
                                type="checkbox"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                id="checkbox"
                                checked={selectAllChecked}
                                onChange={(e) => {
                                  selectAllCheckChange(e.target.checked);
                                }}
                              />
                              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-sm font-bold"
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map((data) => (
                      <tr
                        key={data.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.nama_depan}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.nama_belakang}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.handle}
                        </td>
                        <td className="text-center">
                          <div className="inline-flex items-center">
                            <label
                              className="relative flex cursor-pointer items-center rounded-full p-3"
                              aria-label="checkbox"
                              data-ripple-dark="true"
                            >
                              <input
                                type="checkbox"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                id="checkbox"
                                onChange={(e) => {
                                  handleCheckChange(e.target.checked, data.id);
                                }}
                                checked={selectedData.includes(data.id)}
                              />
                              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-sm font-bold"
                                />
                              </div>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div
      className="flex items-center max-w-md bg-white rounded-lg "
      x-data="{ search: '' }"
    >
      <div className="w-full">
        <input
          type="search"
          className="w-full px-4 py-2 text-gray-800 rounded-l-full focus:outline-none border border-slate-300"
          placeholder="search"
          x-model="search"
        />
      </div>
      <div>
        <button
          type="submit"
          className="flex items-center bg-blue-500 justify-center w-10 h-10 text-white rounded-r-full"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
}

function SearchFilter() {
  return (
    <div className="flex gap-2 items-center">
      <span>Filter</span>
      <FontAwesomeIcon icon={faFilter} className="text-sm" />
    </div>
  );
}

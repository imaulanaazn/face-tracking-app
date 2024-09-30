import { IPlan } from "@/data-types/merchant";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

const initialFilter = {
  limit: 10,
  sort: "startDate",
  order: "DESC",
};

export default function SubscriptionsFilter({
  handleApply,
}: {
  handleApply: ({
    limit,
    sort,
    order,
  }: {
    limit: number;
    sort: string;
    order: string;
  }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(initialFilter);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  function handleClearFilter() {
    setFilter(initialFilter);
    handleApply(initialFilter);
  }

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex gap-2 items-center hover:cursor-pointer text-gray-500 hover:text-blue-600"
        onClick={toggleDropdown}
      >
        <span>Filter</span>
        <FontAwesomeIcon icon={faFilter} className="text-sm" />
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute left-0 right-auto md:right-0 md:left-auto mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          onMouseLeave={closeDropdown}
        >
          <div
            className="p-4"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="limit">
              <p className="mb-2">Limit :</p>
              <input
                type="number"
                name="limit"
                id=""
                min={1}
                max={50}
                value={filter.limit}
                className="w-full border border-slate-300 rounded-md py-1 px-2"
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    limit: parseInt(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="unit mt-4">
              <p className="mb-2">Sort by :</p>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="startDate"
                  name="sort"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.sort === "startDate"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: "startDate",
                    }));
                  }}
                />
                <label
                  htmlFor="startDate"
                  className="hover:cursor-pointer text-sm"
                >
                  Start Date
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="endDate"
                  name="sort"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.sort === "endDate"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: "endDate",
                    }));
                  }}
                />
                <label
                  htmlFor="endDate"
                  className="hover:cursor-pointer text-sm"
                >
                  End Date
                </label>
              </div>
            </div>

            <div className="unit mt-4">
              <p className="mb-2">Order :</p>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="ascending"
                  name="order"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.order === "ASC"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      order: "ASC",
                    }));
                  }}
                />
                <label
                  htmlFor="ascending"
                  className="hover:cursor-pointer text-sm"
                >
                  Ascending
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="descending"
                  name="order"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.order === "DESC"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      order: "DESC",
                    }));
                  }}
                />
                <label
                  htmlFor="descending"
                  className="hover:cursor-pointer text-sm"
                >
                  Descending
                </label>
              </div>
            </div>

            <button
              onClick={() => {
                if (!filter.limit) {
                  toast.error("Filter limit harus diisi");
                } else {
                  handleApply(filter);
                }
              }}
              className="py-2 px-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 w-full mt-4"
            >
              Apply Filter
            </button>
            <button
              onClick={handleClearFilter}
              className="py-2 px-3 rounded-md bg-rose-600 text-white hover:bg-rose-500 w-full mt-2"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

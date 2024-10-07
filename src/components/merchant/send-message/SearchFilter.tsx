import { IMemberFIlter } from "@/data-types/merchant";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

const initialFilter = {
  limit: 10,
  transaction: "true",
  unit: "month",
  value: "1",
};

export default function SearchFilter({
  handleApply,
}: {
  handleApply: (filter: IMemberFIlter) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(initialFilter);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

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
            <div className="sort">
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

            <div className="sort mt-4">
              <p className="mb-2">With Transaction :</p>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="with-transaction"
                  name="transaction"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.transaction === "true"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      transaction: "true",
                    }));
                  }}
                />
                <label
                  htmlFor="with-transaction"
                  className="hover:cursor-pointer text-sm"
                >
                  Yes
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="without-transaction"
                  name="transaction"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.transaction === "false"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      transaction: "false",
                    }));
                  }}
                />
                <label
                  htmlFor="without-transaction"
                  className="hover:cursor-pointer text-sm"
                >
                  No
                </label>
              </div>
            </div>

            <div className="sort mt-4">
              <p className="mb-2">Value :</p>
              <input
                type="number"
                name="value"
                id=""
                min={1}
                max={50}
                value={filter.value}
                className="w-full border border-slate-300 rounded-md py-1 px-2"
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="unit mt-4">
              <p className="mb-2">Unit :</p>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="day"
                  name="unit"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.unit === "day"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      unit: "day",
                    }));
                  }}
                />
                <label htmlFor="week" className="hover:cursor-pointer text-sm">
                  Week
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="week"
                  name="unit"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.unit === "week"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      unit: "week",
                    }));
                  }}
                />
                <label htmlFor="day" className="hover:cursor-pointer text-sm">
                  Day
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="month"
                  name="unit"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.unit === "month"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      unit: "month",
                    }));
                  }}
                />
                <label htmlFor="month" className="hover:cursor-pointer text-sm">
                  Month
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="year"
                  name="unit"
                  className="hover:cursor-pointer"
                  defaultChecked={filter.unit === "year"}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      unit: "year",
                    }));
                  }}
                />
                <label htmlFor="year" className="hover:cursor-pointer text-sm">
                  Year
                </label>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Get members from the last {filter.value} {filter.unit}
            </p>

            <button
              onClick={() => {
                if (!filter.limit) {
                  toast.error("Limit harus diisi");
                } else {
                  handleApply(filter);
                }
                closeDropdown();
              }}
              className="py-2 px-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 w-full mt-4"
            >
              Apply Filter
            </button>
            <button
              onClick={() => {
                setFilter(initialFilter);
                handleApply(initialFilter);
                closeDropdown();
              }}
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

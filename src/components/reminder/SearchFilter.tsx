import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SearchFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState("");

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
              <p className="mb-2">Sort :</p>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="ascending"
                  name="SORT"
                  value="ASC"
                  className="hover:cursor-pointer"
                />
                <label
                  htmlFor="ascending"
                  className="hover:cursor-pointer text-sm"
                >
                  ASC
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="descending"
                  name="SORT"
                  value="DESC"
                  className="hover:cursor-pointer"
                />
                <label
                  htmlFor="descending"
                  className="hover:cursor-pointer text-sm"
                >
                  DESC
                </label>
              </div>
            </div>

            <div className="sort mt-4">
              <p className="mb-2">Sort By :</p>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="name"
                  name="SORTBY"
                  value="name"
                  className="hover:cursor-pointer"
                />
                <label htmlFor="name" className="hover:cursor-pointer text-sm">
                  Name
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="mobile_number"
                  name="SORTBY"
                  value="name"
                  className="hover:cursor-pointer"
                />
                <label
                  htmlFor="mobile_number"
                  className="hover:cursor-pointer text-sm"
                >
                  Mobile Number
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

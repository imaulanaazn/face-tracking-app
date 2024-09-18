import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

export default function HistoryFilter({
  handleApply,
}: {
  handleApply: ({ limit }: { limit: number }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({
    limit: 10,
  });

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
              Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

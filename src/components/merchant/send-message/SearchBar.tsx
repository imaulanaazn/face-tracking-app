import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SearchBar({
  onChange,
}: {
  onChange: (keyword: string) => void;
}) {
  const [keyword, setKeyword] = useState("");
  return (
    <form action="#" method="GET" className="pl-2">
      <div className="w-48 md:w-64 mt-1 relative">
        <button
          onClick={(e) => {
            onChange(keyword);
            e.preventDefault();
          }}
          className="pl-3 flex items-center absolute top-0 right-2 bottom-0 h-full w-auto aspect-square group"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-500 group-hover:text-blue-600 text-lg"
          />
        </button>
        <input
          type="text"
          name="email"
          id="topbar-search"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          className="text-sm leading-5 pr-12 py-2.5 pl-4 border border-gray-300 rounded-full w-full bg-slate-100 focus:outline-blue-600"
          placeholder="Search"
        />
      </div>
    </form>
  );
}

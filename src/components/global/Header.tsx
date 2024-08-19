"use client";
import {
  faArrowLeft,
  faArrowRight,
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (params: boolean) => void;
}) => {
  return (
    <header className="bg-white py-4 px-6 lg:px-10 flex items-center justify-between justify-end shadow-sm sticky top-0 right-0 z-40">
      <div className="">
        <h1 className="hidden xl:block text-2xl font-bold text-gray-800">
          Good Morning, Alexander
        </h1>
        <p className="hidden xl:block text-gray-500">
          Welcome back, nice to see you again!
        </p>
        <button
          onClick={() => {
            setSidebarOpen(true);
          }}
          className={
            "w-7 h-7 rounded-full text-blue-600 right-8 bg-blue-100 xl:hidden"
          }
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div className="flex items-center gap-x-6">
        <FontAwesomeIcon icon={faSearch} className="text-gray-600 text-lg" />
        <FontAwesomeIcon icon={faBell} className="text-gray-600 text-lg" />
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default Header;

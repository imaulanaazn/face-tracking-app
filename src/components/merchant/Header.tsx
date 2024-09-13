"use client";
import {
  faArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePopover from "./ProfilePopover";
const Header = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (params: boolean) => void;
}) => {
  return (
    <header className="bg-white py-4 px-6 lg:px-10 flex items-center justify-between justify-end shadow-sm sticky top-0 right-0 z-40">
      <div className="flex gap-4 items-center">
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
        {/* <form action="#" method="GET" className="pl-2 hidden md:block">
          <div className="w-96 mt-1 relative">
            <button className="pl-3 flex items-center absolute top-0 right-2 bottom-0 h-full w-auto aspect-square group">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-500 group-hover:text-blue-600 text-lg"
              />
            </button>
            <input
              type="text"
              name="email"
              id="topbar-search"
              className="text-sm leading-5 pr-12 py-2.5 pl-4 border border-gray-300 rounded-full w-full bg-slate-100 focus:outline-blue-600"
              placeholder="Search"
            />
          </div>
        </form> */}
      </div>

      <div className="flex items-center gap-x-6">
        <form action="#" method="GET" className="pl-2 md:hidden">
          <div className="w-52 mt-1 relative">
            <button className="pl-3 flex items-center absolute top-0 right-2 bottom-0 h-full w-auto aspect-square group">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-500 group-hover:text-blue-600 text-lg"
              />
            </button>
            <input
              type="text"
              name="email"
              id="topbar-search"
              className="text-sm leading-5 pr-12 py-2.5 pl-4 border border-gray-300 rounded-full w-full bg-slate-100 focus:outline-blue-600"
              placeholder="Search"
            />
          </div>
        </form>
        <ProfilePopover />
      </div>
    </header>
  );
};

export default Header;

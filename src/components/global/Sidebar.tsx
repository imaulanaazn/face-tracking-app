"use client";
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFilePdf,
  faChartPie,
  faExpand,
  faShop,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: faChartPie,
  },
  {
    name: "User Recognition",
    path: "/user-recognition",
    icon: faExpand,
  },
  {
    name: "User Profile",
    path: "/profile",
    icon: faUser,
  },
  {
    name: "My Business",
    path: "/business",
    icon: faShop,
  },
];

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (params: boolean) => void;
}) => {
  const currentPath = usePathname();
  // const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div
      className={`h-screen absolute lg:fixed w-10/12 md:w-1/2 lg:w-1/5 bg-white overflow-x-visible px-8 absolute lg:block top-0 ${
        sidebarOpen
          ? "left-0 overflow-y-auto"
          : "-left-full md:left-0 overflow-y-visible"
      } z-40`}
    >
      <div className="flex items-center justify-center py-6">
        <img
          src="/images/logo.svg"
          alt="Findappa Logo"
          className="h-6 w-auto aspect-square object-cover mr-2"
        />
        <span className="text-3xl font-bold text-black">Bolo</span>

        <button
          onClick={() => {
            setSidebarOpen(false);
          }}
          className={
            "w-7 h-7 bg-blue-100 absolute top-7 rounded-full text-blue-600 right-8 lg:hidden"
          }
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      <div className="divider w-full h-px bg-sky-600 mb-6"></div>

      <nav className="flex flex-col gap-y-3">
        {menus.map((menu) => (
          <a
            href={menu.path}
            className={`flex items-center gap-3 py-3 px-4 rounded-full ${
              currentPath === menu.path
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-500 hover:bg-sky-100 hover:text-blue-600"
            }`}
          >
            <FontAwesomeIcon
              icon={menu.icon}
              className="w-4 h-4 object-cover"
            />
            <span className="">{menu.name}</span>
          </a>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 w-full px-8 pb-8">
        <div className="divider w-full h-px bg-sky-600 mt-4 mb-6"></div>
        <span className="block font-medium">PDF Report</span>
        <span className="block text-gray-500 mb-4">
          Download monthly report
        </span>
        <a
          href="#"
          className="flex items-center justify-center bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white"
        >
          <FontAwesomeIcon icon={faFilePdf} className="w-5 h-5 object-cover" />
          <span className="ml-2">Download</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

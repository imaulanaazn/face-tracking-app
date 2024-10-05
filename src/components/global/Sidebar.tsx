"use client";
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  navigations,
}: {
  sidebarOpen: boolean;
  navigations: {
    name: string;
    path: string;
    icon: any;
  }[];
  setSidebarOpen: (params: boolean) => void;
}) => {
  const currentPath = usePathname();

  return (
    <div
      className={`h-screen absolute xl:fixed w-10/12 md:w-1/2 lg:w-2/6 xl:w-1/5 bg-white overflow-x-visible px-8 absolute xl:block top-0 ${
        sidebarOpen
          ? "left-0 overflow-y-auto"
          : "-left-full xl:left-0 overflow-y-visible"
      } z-50`}
    >
      <div className="flex items-center justify-center py-6">
        <Image
          width={50}
          height={50}
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
            "w-7 h-7 bg-blue-100 absolute top-7 rounded-full text-blue-600 right-8 xl:hidden"
          }
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      <div className="divider w-full h-px bg-gray-400 mb-6"></div>

      <nav className="flex flex-col gap-y-3">
        {navigations.map((menu) => (
          <Link
            key={menu.path}
            href={menu.path}
            target={menu.path === "/recognition" ? "_blank" : undefined}
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
          </Link>
        ))}
      </nav>

      {/* <div className="absolute bottom-0 left-0 w-full px-8 pb-8">
        <div className="divider w-full h-px bg-gray-400 mt-4 mb-6"></div>
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
      </div> */}
    </div>
  );
};

export default Sidebar;

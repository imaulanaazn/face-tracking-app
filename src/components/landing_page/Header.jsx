"use client";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { usePathname } from "next/navigation";

import { navigation } from "../../constants";
import Button from "./Button";
import MenuSvg from "../../../public/assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 lg:bg-white/50 lg:backdrop-blur-md ${
        openNavigation ? "bg-white" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img
            src={"/assets/brainwave.svg"}
            width={190}
            height={40}
            alt="Brainwave"
          />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-white lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-gray-700 transition-colors hover:text-blue-400 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname
                    ? "z-2 lg:text-blue-700"
                    : "lg:text-gray-700"
                } lg:leading-5 lg:hover:text-blue-600 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <Link href="/auth/register">
          <div className="button hidden mr-8 transition-colors hover:text-blue-400 lg:block text-blue-600">
            Daftar
          </div>
        </Link>

        <Link href={"/auth/login"}>
          <div className="button hidden lg:block py-3 px-6 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-400 transition-all">
            Masuk
          </div>
        </Link>

        <Button
          className="ml-auto lg:hidden text-3xl"
          px="px-3"
          onClick={toggleNavigation}
        >
          <FontAwesomeIcon icon={openNavigation ? faXmark : faBars} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

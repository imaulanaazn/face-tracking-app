"use client";
import { usePathname } from "next/navigation";

import { navigation } from "../../lib/statics";
import Button from "./Button";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { getMyMerchant } from "@/services/api/merchant";
import { IMerchant } from "@/data-types/merchant";

const Header = () => {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [merchantData, setMerchantData] = useState<IMerchant | null>(null);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    } else {
      setOpenNavigation(true);
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    setOpenNavigation(false);
  };

  useEffect(() => {
    async function getMe() {
      try {
        const response = await getMyMerchant();
        localStorage.setItem("user", JSON.stringify(response.data));
        setMerchantData(response.data);
      } catch (err: any) {
        console.error(err);
      }
    }

    const userFromLocal = JSON.parse(localStorage.getItem("user")!);

    if (userFromLocal) {
      setMerchantData(userFromLocal);
    } else {
      getMe();
    }
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 lg:bg-white/50 lg:backdrop-blur-md ${
        openNavigation ? "bg-white" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <Image
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
                className={`block relative font-code text-2xl uppercase text-gray-700 transition-colors hover:text-blue-400 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname
                    ? "z-2 lg:text-blue-700"
                    : "lg:text-gray-700"
                } lg:leading-5 lg:hover:text-blue-600 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
            {merchantData ? (
              <a
                href={"/user/dashboard"}
                className={`block lg:hidden relative font-code text-2xl uppercase text-gray-700 transition-colors hover:text-blue-400 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold  lg:leading-5 lg:hover:text-blue-600 xl:px-12`}
              >
                Dashboard
              </a>
            ) : (
              <>
                <a
                  href={"/auth/login"}
                  className={`block lg:hidden relative font-code text-2xl uppercase text-gray-700 transition-colors hover:text-blue-400 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold  lg:leading-5 lg:hover:text-blue-600 xl:px-12`}
                >
                  Masuk
                </a>
                <a
                  href={"/auth/register"}
                  className={`block lg:hidden relative font-code text-2xl uppercase text-gray-700 transition-colors hover:text-blue-400 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold  lg:leading-5 lg:hover:text-blue-600 xl:px-12`}
                >
                  Mendaftar
                </a>
              </>
            )}
          </div>

          <HamburgerMenu />
        </nav>

        {merchantData ? (
          <div className="relative hidden lg:block">
            <Link href={"/user/dashboard"} className="hover:cursor-pointer">
              {merchantData.logo ? (
                <Image
                  width={50}
                  height={50}
                  alt="tania andrew"
                  src={merchantData.logo}
                  className="h-12 w-12  rounded-full object-cover object-center"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-400 text-xl"
                  />
                </div>
              )}
            </Link>
          </div>
        ) : (
          <>
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
          </>
        )}

        <Button
          className="ml-auto lg:hidden text-3xl"
          px="px-3"
          onClick={toggleNavigation}
          href={undefined}
          white={undefined}
        >
          <FontAwesomeIcon icon={openNavigation ? faXmark : faBars} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

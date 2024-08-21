import {
  faArrowRightFromBracket,
  faGear,
  faLifeRing,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function ProfilePopover() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const userProfile = "";

  const toggleMenu = () => setOpen(!open);

  const handleClickOutside = (event: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !imgRef?.current?.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function handleEditProfile() {
    router.push("/user/profile");
  }
  return (
    <div className="relative">
      <div ref={imgRef} onClick={toggleMenu} className="hover:cursor-pointer">
        {userProfile ? (
          <Image
            width={50}
            height={50}
            alt="tania andrew"
            src={userProfile}
            className="h-12 w-12  rounded-full object-cover object-center"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xl" />
          </div>
        )}
      </div>

      {open && (
        <ul
          ref={menuRef}
          className="absolute z-10 right-0 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 text-sm text-blue-gray-500 shadow-md shadow-blue-gray-500/10"
        >
          <MenuItem
            icon={faGear}
            label="Edit Profile"
            handleClick={handleEditProfile}
          />
          {/* <MenuItem
              icon="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
              label="Inbox"
              /> */}
          <MenuItem icon={faLifeRing} label="Help" handleClick={() => {}} />
          <hr className="my-2 border-blue-gray-50" />
          <MenuItem
            icon={faArrowRightFromBracket}
            label="Sign Out"
            handleClick={() => {}}
          />
        </ul>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  handleClick,
}: {
  icon: IconDefinition;
  label: string;
  handleClick: () => void;
}) {
  return (
    <button
      onClick={handleClick}
      className="flex  w-full text-gray-600 cursor-pointer items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start transition-all hover:bg-gray-100 hover:text-gray-900"
    >
      <FontAwesomeIcon icon={icon} className="text-gray-500" />
      <p className="block text-sm font-normal">{label}</p>
    </button>
  );
}

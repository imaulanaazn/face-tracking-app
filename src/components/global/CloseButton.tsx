import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function CloseButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <button
      onClick={handleClick}
      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-all group"
    >
      <FontAwesomeIcon
        icon={faX}
        className="text-gray-600 text-sm font-bold group-hover:text-white transition-all"
      />
    </button>
  );
}

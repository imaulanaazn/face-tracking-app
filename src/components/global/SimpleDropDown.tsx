import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

type DropdownProps = {
  options: { value: string; text: string }[];
  selectedOption: { value: string; text: string } | null;
  onOptionSelect: (option: { value: string; text: string }) => void;
};

export default function Dropdown({
  options,
  selectedOption,
  onOptionSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-1.5 rounded-md w-full flex items-center justify-center gap-2"
      >
        {selectedOption?.text || "Select an option"}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-lg">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onOptionSelect(option);
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600"
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

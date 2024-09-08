import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selectedValue: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  // Toggle dropdown open/close state
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle option click
  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false); // Close the dropdown
  };

  // Handle clear button
  const handleClear = () => {
    onChange(null); // Clear the selection
    setIsOpen(false); // Close the dropdown
    setSearch(""); // Reset the search field
  };

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown if the click is outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside); // Add event listener when dropdown is open
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Remove event listener when dropdown is closed
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up event listener on component unmount
    };
  }, [isOpen]);

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleDropdown}
          className="block w-full p-2 border border-gray-300 rounded bg-white"
        >
          {selectedValue ? selectedValue : placeholder}
        </button>
        {selectedValue && (
          <button
            onClick={handleClear}
            className="ml-2 p-2 text-red-500 hover:text-red-700"
            aria-label="Clear selection"
          >
            × {/* Clear button */}
          </button>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`جستجو ${placeholder.toLowerCase()}...`}
            className="block w-full p-2 border-b border-gray-300"
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="p-2 cursor-pointer hover:bg-blue-100"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">موردی یافت نشد</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

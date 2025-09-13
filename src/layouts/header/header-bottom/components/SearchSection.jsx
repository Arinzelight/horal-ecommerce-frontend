import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StateDropdown from "../../StateDropdown";

export default function SearchSection({
  showStateDropdown,
  stateDropdownRef,
  toggleStateDropdown,
  isMobile,
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle state selection from dropdown
  const handleStateSelect = (state) => {
    // Close the dropdown when a state is selected
    toggleStateDropdown();
  };

  const renderInput = (inputClass) => (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        placeholder="Search for anything"
        className={inputClass}
      />
    </div>
  );

  const renderButton = (btnClass) => (
    <button onClick={handleSearch} className={btnClass} aria-label="Search">
      {isMobile ? <FaSearch className="text-sm" /> : "Search"}
    </button>
  );

  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative flex-shrink-0" ref={stateDropdownRef}>
          <button
            onClick={toggleStateDropdown}
            aria-label="Toggle state dropdown"
            className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md h-[38px]"
          >
            <span className="text-sm whitespace-nowrap">State</span>
            <FaChevronDown className="ml-1 text-xs" />
          </button>
          {showStateDropdown && (
            <StateDropdown onStateSelect={handleStateSelect} />
          )}
        </div>
        <div className="flex-1 flex items-center">
          {renderInput(
            "w-full px-3 py-1.5 bg-banner-gray rounded-md text-sm h-[38px]"
          )}
          {renderButton(
            "bg-primary ml-2 text-white p-1 rounded-md h-[38px] min-w-[38px] flex items-center justify-center"
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center gap-2 w-[469px] md:gap-4">
      <div className="relative" ref={stateDropdownRef}>
        <button
          onClick={toggleStateDropdown}
          className="flex items-center text-sm justify-between w-full px-2 py-2.5 outline-1 outline-offset-[-1px] outline-gray-200 rounded-md whitespace-nowrap"
        >
          <span>Select State</span>
          <FaChevronDown className="ml-2" />
        </button>
        {showStateDropdown && (
          <StateDropdown onStateSelect={handleStateSelect} />
        )}
      </div>

      <div className="flex max-w-lg">
        {renderInput(
          "lg:w-64 px-4 py-2 bg-banner-gray rounded flex justify-start items-center gap-2.5 overflow-hidden"
        )}
        {renderButton(
          "bg-primary cursor-pointer hover:opacity-85 text-white px-4 md:px-6 py-2 text-center rounded ml-1 whitespace-nowrap"
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StateDropdown from "../../StateDropdown";
import debounce from "lodash.debounce";

export default function SearchSection({
  showStateDropdown,
  stateDropdownRef,
  toggleStateDropdown,
  isMobile,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const fetchSuggestions = debounce(async (value) => {
    try {
      const res = await fetch(`/api/products/search-suggestions?q=${value}`);
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    }
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length >= 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const renderInput = (inputClass) => (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search for anything"
        className={inputClass}
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white border rounded shadow mt-1 w-full max-h-60 overflow-y-auto">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(s)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderButton = (btnClass) => (
    <button onClick={handleSearch} className={btnClass}>
      {isMobile ? <FaSearch className="text-sm" /> : "Search"}
    </button>
  );

  // === Mobile Version ===
  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative flex-shrink-0" ref={stateDropdownRef}>
          <button
            onClick={toggleStateDropdown}
            className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md h-[38px]"
          >
            <span className="text-sm whitespace-nowrap">State</span>
            <FaChevronDown className="ml-1 text-xs" />
          </button>
          {showStateDropdown && <StateDropdown />}
        </div>

        <div className="flex-1 flex items-center">
          {renderInput(
            "w-full px-3 py-2 bg-gray-200 rounded-md text-sm h-[38px]"
          )}
          {renderButton(
            "bg-primary ml-2 text-white p-2 rounded-md h-[38px] min-w-[38px] flex items-center justify-center"
          )}
        </div>
      </div>
    );
  }

  // === Desktop Version ===
  return (
    <div className="flex-1 flex items-center justify-center gap-2 w-[469px] md:gap-4">
      <div className="relative" ref={stateDropdownRef}>
        <button
          onClick={toggleStateDropdown}
          className="flex items-center text-sm justify-between w-full px-2 py-2.5 outline-1 outline-offset-[-1px] outline-stone-300 rounded-md whitespace-nowrap"
        >
          <span>Select State</span>
          <FaChevronDown className="ml-2" />
        </button>
        {showStateDropdown && <StateDropdown />}
      </div>

      <div className="flex max-w-lg">
        {renderInput(
          "lg:w-64 px-4 py-2 bg-neutral-200 rounded flex justify-start items-center gap-2.5 overflow-hidden"
        )}
        {renderButton(
          "bg-primary cursor-pointer hover:opacity-85 text-white px-4 md:px-6 py-2 text-center rounded ml-1 whitespace-nowrap"
        )}
      </div>
    </div>
  );
}

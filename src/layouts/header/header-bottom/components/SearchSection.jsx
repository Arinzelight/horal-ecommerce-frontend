import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StateDropdown from "../../StateDropdown";
import useProductSuggestions from "../../../../hooks/useProductSuggestions";

export default function SearchSection({
  showStateDropdown,
  stateDropdownRef,
  toggleStateDropdown,
  isMobile,
}) {
  const [query, setQuery] = useState("");
  const { suggestions, loading, fetchSuggestions, clearSuggestions } =
    useProductSuggestions();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        clearSuggestions();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearSuggestions]);

  const handleSearch = () => {
    if (query.trim()) {
      clearSuggestions();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    clearSuggestions();
    navigate(`/search?q=${encodeURIComponent(title)}`);
  };

  const renderInput = (inputClass) => (
    <div className="relative w-full" ref={wrapperRef}>
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
      {(suggestions.length > 0 || loading) && (
        <ul className="absolute z-50 w-full bg-white scrollbar-hide border border-gray-200 rounded-lg shadow-md mt-1 max-h-60 overflow-auto">
          {loading && (
            <li className="px-4 py-2 text-sm text-gray-400">Loading...</li>
          )}
          {!loading &&
            suggestions.slice(0, 6).map((s) => (
              <li
                key={s.id}
                onClick={() => handleSuggestionClick(s.title)}
                className="px-4 py-2 text-sm text-gray-800 hover:bg-neutral-50 cursor-pointer"
              >
                {s.title}
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

import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  placeholder = "Search for anything",
  onSearch,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length > 1) {
      // Simulate an API call for suggestions
      const timer = setTimeout(() => {
        setSuggestions([
          `${query} Item 1`,
          `${query} Item 2`,
          `${query} Item 3`,
        ]);
        setShowSuggestions(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = () => {
    if (onSearch) onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    if (onSearch) onSearch(suggestion);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-gray-200 rounded-md text-sm h-[38px]"
          onFocus={() => setShowSuggestions(true)}
        />
        <button
          onClick={handleSearch}
          className="bg-primary ml-2 text-white p-2 rounded  px-5 flex items-center justify-center"
        >
          Search
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-md mt-1 w-full rounded-md overflow-hidden">
          {suggestions.map((s, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(s)}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

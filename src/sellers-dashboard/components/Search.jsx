import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";

export default function SearchHeader({
  searchPlaceholder,
  filterOptions = [],
  onSearch,
  onFilterChange,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filterId, value) => {
    onFilterChange?.(filterId, value);
  };

  // Check if filterOptions is provided and has content
  const hasFilterOptions = filterOptions && filterOptions.length > 0;

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <div className="h-[33px] flex items-center border-[1px] border-neutral-200 rounded-lg bg-gray-50 px-3">
            <CiSearch className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              className="w-full py-2 px-2 text-neutral-600 bg-transparent border-none focus:outline-none"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                className="ml-2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setSearchQuery("");
                  onSearch?.("");
                }}
              >
                <LiaTimesSolid className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        {hasFilterOptions && (
          <div className="relative" ref={filtersRef}>
            <button
              className="h-[33px] w-[100px] flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-neutral-200 rounded-lg hover:bg-gray-50"
              onClick={handleFilterClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.532 4.75h6.936c.457 0 .854 0 1.165.03c.307.028.685.095.993.348c.397.326.621.814.624 1.322c.002.39-.172.726-.34.992c-.168.27-.411.59-.695.964l-.031.04l-.01.013l-2.555 3.369c-.252.332-.315.42-.359.51a1.2 1.2 0 0 0-.099.297c-.02.1-.023.212-.023.634v4.243c0 .208 0 .412-.014.578c-.015.164-.052.427-.224.663c-.21.287-.537.473-.9.495c-.302.019-.547-.103-.69-.183c-.144-.08-.309-.195-.476-.31l-.989-.683l-.048-.033c-.191-.131-.403-.276-.562-.477a1.7 1.7 0 0 1-.303-.585c-.071-.244-.07-.5-.07-.738v-2.97c0-.422-.004-.534-.023-.634a1.2 1.2 0 0 0-.1-.297c-.043-.09-.106-.178-.358-.51L4.825 8.459l-.01-.012l-.03-.04c-.284-.375-.527-.695-.696-.965c-.167-.266-.34-.602-.339-.992a1.72 1.72 0 0 1 .624-1.322c.308-.253.686-.32.993-.349c.311-.029.707-.029 1.165-.029m.397 4l1.647 2.17l.035.047c.201.264.361.475.478.715q.154.317.222.665c.051.261.05.527.05.864v2.968c0 .158.001.247.005.314l.006.062a.2.2 0 0 0 .036.073l.041.034c.05.04.12.088.248.176l.941.65V13.21c0-.337 0-.603.051-.864q.068-.347.222-.665c.117-.24.277-.45.478-.715l.035-.046l1.646-2.17zm7.28-1.5c.195-.26.334-.45.43-.604c.08-.126.104-.188.11-.207a.22.22 0 0 0-.057-.134a1 1 0 0 0-.2-.032c-.232-.022-.556-.023-1.06-.023H6.568c-.504 0-.828 0-1.06.023a1 1 0 0 0-.2.032a.22.22 0 0 0-.057.134c.006.019.03.081.11.207c.096.155.235.344.43.604zm1.541 3.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75m-1.5 2.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75m-.5 2.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m0 2.5a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75"
                ></path>
              </svg>
              Filters
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-3">
                  {filterOptions.map((filterGroup, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <h3 className="text-sm font-medium text-gray-700 mb-1">
                        {filterGroup.title}
                      </h3>
                      <select
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2"
                        onChange={(e) =>
                          handleFilterChange(
                            filterGroup.title.toLowerCase(),
                            e.target.value
                          )
                        }
                        defaultValue={filterGroup.defaultValue || ""}
                      >
                        {filterGroup.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

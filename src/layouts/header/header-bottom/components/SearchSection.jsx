import { FaChevronDown, FaSearch } from "react-icons/fa";
import StateDropdown from "../../StateDropdown";

export default function SearchSection({
  showStateDropdown,
  stateDropdownRef,
  toggleStateDropdown,
  isMobile,
}) {
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
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full px-3 py-2 bg-gray-200 rounded-md text-sm h-[38px]"
          />
          <button className="bg-primary ml-2 text-white p-2 rounded-md h-[38px] min-w-[38px] flex items-center justify-center">
            <FaSearch className="text-sm" />
          </button>
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

      <div className="flex-1 flex max-w-lg">
        <input
          type="text"
          placeholder="Search for anything"
          className=" lg:w-64 px-4 py-2 bg-neutral-200 rounded flex justify-start items-center gap-2.5 overflow-hidden"
        />
        <button className="bg-primary cursor-pointer hover:opacity-85 text-white px-4 md:px-6 py-2 text-center rounded ml-1 whitespace-nowrap">
          Search
        </button>
      </div>
    </div>
  );
}

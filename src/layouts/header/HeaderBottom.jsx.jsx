import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus, FaChevronDown } from "react-icons/fa";
import StateDropdown from "./StateDropdown";
import useMobile from "../../hooks/use-mobile";
import Logo from "../../assets/images/horal-logo-1.png";

export default function HeaderBottom() {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const isMobile = useMobile();

  const toggleStateDropdown = () => {
    setShowStateDropdown(!showStateDropdown);
  };

  if (isMobile) {
    return (
      <header className="bg-white py-3 px-4 shadow-sm">
        <div className="flex flex-col gap-3">
          {/* Top row - Logo and Sell button */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0 -ml-2">
              <img src={Logo} alt="Horal Logo" className="h-8" />
            </Link>
            <button className="bg-secondary text-white px-4 py-2 rounded flex items-center text-sm">
              Sell <FaPlus className="ml-1" />
            </button>
          </div>

          {/* Bottom row - Search and State dropdown in same line */}
          <div className="flex items-center gap-2">
            <div className="relative flex-shrink-0">
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
        </div>
      </header>
    );
  }

  // Desktop layout
  return (
    <header className="self-stretch flex items-center shadow-sm  h-20 relative bg-white  sm:px-10 px-4 ">
      <div className=" flex items-center justify-between   w-full">
        <Link to="/" className="flex-shrink-0  lg:-ml-3">
          <img src={Logo} alt="Horal Logo" className="h-[40px] w-[110px]" />
        </Link>

        <div className=" mx-8 flex  items-center justify-between">
          <div className="relative mr-2">
            <button
              onClick={toggleStateDropdown}
              className="flex items-center text-sm justify-between w-full  px-2 py-2.5  outline-1 outline-offset-[-1px] outline-stone-300 rounded-md"
            >
              <span>Select State</span>
              <FaChevronDown className="ml-2" />
            </button>
            {showStateDropdown && <StateDropdown />}
          </div>

          <div className="flex-1 flex">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-64  px-4 py-2 bg-neutral-200 rounded flex justify-start items-center gap-2.5 overflow-hidden"
            />
            <button className="bg-primary cursor-pointer hover:opacity-85 text-white px-10 py-2  text-center rounded ml-1 ">
              Search
            </button>
          </div>
        </div>

        <div className="">
          <button className="bg-secondary text-white px-10 py-2   rounded flex items-center text-base cursor-pointer hover:opacity-85 transition duration-200">
            Sell <FaPlus className="ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
}

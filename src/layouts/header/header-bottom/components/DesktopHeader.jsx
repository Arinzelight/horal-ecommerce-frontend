import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Logo from "../../../../assets/images/horal-logo-1.png";
import SearchSection from "./SearchSection";

export default function DesktopHeader({
  showStateDropdown,
  stateDropdownRef,
  toggleStateDropdown,
}) {
  return (
    <header className="self-stretch flex items-center shadow-sm h-20 relative bg-white px-4 md:px-14 lg:px-16">
      <div className="flex items-center justify-between w-full gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="Horal Logo" className="h-[40px] w-[110px]" />
        </Link>

        <SearchSection
          showStateDropdown={showStateDropdown}
          stateDropdownRef={stateDropdownRef}
          toggleStateDropdown={toggleStateDropdown}
          isMobile={false}
        />

        <div className="flex-shrink-0">
          <button className="bg-secondary text-white px-4 md:px-6 py-2 rounded flex items-center text-base cursor-pointer hover:opacity-85 transition duration-200 whitespace-nowrap">
            Sell <FaPlus className="ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
}

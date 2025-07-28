import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Logo from "../../../../assets/images/horal-logo-1.png";
import MobileMenu from "./MobileMenu";
import SearchSection from "./SearchSection";

export default function MobileHeader({
  showMobileMenu,
  menuRef,
  menuButtonRef,
  toggleMobileMenu,
  categories,
  handleCategoryClick,
  showStateDropdown,
  stateDropdownRef,
  toggleStateDropdown,
}) {
  return (
    <header className="bg-white py-3 px-4 sm:px-16 shadow-sm relative">
      <div className="flex flex-col gap-3">
        {/* Top row - Logo and Sell button */}
        <div className="flex items-center h-[30px] justify-between">
          <div className="flex w-[130px] justify-between gap-1">
            <button
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              className="w-[30px] h-[30px] flex items-center p-[5px] rounded-[4px] bg-primary cursor-pointer"
            >
              <HiOutlineMenuAlt3 size={25} className="text-white" />
            </button>

            <Link to="/" className="flex-shrink-0 w-[83px] h-[30px]">
              <img src={Logo} alt="Horal Logo" className="h-8" />
            </Link>
          </div>

          <div className="">
            <Link
              to="kyc-verification"
              className="bg-secondary text-white h-[30px] w-[72px] px-4 py-2 rounded flex items-center text-sm"
            >
              Sell <FaPlus className="ml-1" />
            </Link>
          </div>
        </div>

        <MobileMenu
          ref={menuRef}
          showMobileMenu={showMobileMenu}
          categories={categories}
          handleCategoryClick={handleCategoryClick}
          onClose={toggleMobileMenu}
        />

        <SearchSection
          showStateDropdown={showStateDropdown}
          stateDropdownRef={stateDropdownRef}
          toggleStateDropdown={toggleStateDropdown}
          isMobile={true}
        />
      </div>
    </header>
  );
}

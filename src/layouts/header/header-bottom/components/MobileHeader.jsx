import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Logo from "../../../../assets/images/horal-logo-1.png";
import MobileMenu from "./MobileMenu";
import SearchSection from "./SearchSection";

export default function MobileHeader({
  user,
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
    <header className="bg-white py-3 px-2 lg:px-16 shadow-sm relative">
      <div className="flex flex-col gap-3">
        {/* Top row - Logo and Sell button */}
        <div className="flex items-center h-[30px] justify-between">
          <div className="flex w-[130px] justify-between gap-1">
            <button
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="w-[30px] h-[30px] flex items-center p-[5px] rounded-[4px] bg-primary cursor-pointer"
            >
              <HiOutlineMenuAlt3 size={25} className="text-white" />
            </button>

            <Link to="/" className="flex-shrink-0 w-[83px] h-[30px]">
              <img src={Logo} alt="Horal Logo" className="h-8" />
            </Link>
          </div>

          {/* only show the sell button if the logged in user is not a seller, if seller show 'list product' */}
          {user?.is_seller === true ? (
            // Already a seller → list product
            <div>
              <Link
                to="/sellers-dashboard/shop-products"
                className="bg-secondary  text-white px-2.5 py-1.5 rounded flex items-center justify-center text-sm"
              >
                My Shop <HiShoppingBag className="ml-1" size={18} />
              </Link>
            </div>
          ) : user?.is_seller === "pending" ? (
            // Seller application under review
            <div className="relative group">
              <button
                disabled
                className="peer bg-gray-400 text-white px-2.5 py-1 rounded flex items-center justify-center text-base cursor-not-allowed"
              >
                Sell <HiShoppingBag className="ml-1" size={18} />
              </button>
              {/* Tooltip - only visible on hover or focus */}
              <div className="absolute right-0 mt-2 w-max bg-primary text-white text-xs px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity duration-200 z-20">
                ⏳ Your KYC verification is under review
              </div>
            </div>
          ) : (
            // Not a seller yet → go to KYC
            <div>
              <Link
                to="/kyc-verification"
                className="bg-secondary text-white px-2.5 py-1 rounded flex items-center justify-center text-base"
              >
                Sell <HiShoppingBag className="ml-1" size={18} />
              </Link>
            </div>
          )}
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

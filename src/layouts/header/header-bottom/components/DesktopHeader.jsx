import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import Logo from "../../../../assets/images/horal-logo-1.png";
import SearchSection from "./SearchSection";

export default function DesktopHeader({
  user,
  showStateDropdown,
  stateDropdownRef,
  toggleStateDropdown,
}) {
  return (
    <header className="self-stretch flex items-center  py-4 shadow-sm relative bg-white px-2 lg:px-12">
      <div className="flex items-center justify-between w-full gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="Horal Logo" className="h-[40px] w-[110px]" />
        </Link>

        {/* Search */}
        <SearchSection
          showStateDropdown={showStateDropdown}
          stateDropdownRef={stateDropdownRef}
          toggleStateDropdown={toggleStateDropdown}
          isMobile={false}
        />

        {/* Sell / List Product */}
        {user?.is_seller === true ? (
          // Already a seller → list product
          <div className="flex-shrink-0">
            <Link
              to="/sellers-dashboard/shop-products"
              className="bg-secondary text-white  px-2 md:px-1 lg:px-6 py-2 rounded flex items-center text-base cursor-pointer hover:opacity-85 transition duration-200 whitespace-nowrap"
            >
              My Shop <HiShoppingBag className="font-bold" size={20} />
            </Link>
          </div>
        ) : user?.is_seller === "pending" ? (
          // Seller application under review → disabled button + tooltip
          <div className="flex-shrink-0 relative group">
            <button
              disabled
              className="peer bg-gray-400 text-white font-semibold px-4 md:px-6 py-2 rounded flex items-center text-base cursor-not-allowed whitespace-nowrap"
            >
              Sell <HiShoppingBag className="ml-1 font-bold" size={20} />
            </button>

            {/* Tooltip */}
            <div className="absolute right-0 mt-2 w-max bg-primary text-white text-xs px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity duration-200 z-20">
              ⏳ Your KYC verification is under review
            </div>
          </div>
        ) : (
          // Not a seller yet → go to KYC
          <div className="flex-shrink-0">
            <Link
              to="/kyc-verification"
              className="bg-secondary text-white text-lg  px-4 md:px-6 py-2 rounded flex items-center  cursor-pointer hover:opacity-85 transition duration-200 whitespace-nowrap"
            >
              Sell <HiShoppingBag className="ml-1 font-bold" size={20} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

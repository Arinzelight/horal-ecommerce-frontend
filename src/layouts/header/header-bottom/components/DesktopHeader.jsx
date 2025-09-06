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
    <header className="self-stretch flex items-center shadow-sm h-20 relative bg-white px-2 md:px-12 ">
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
        {/* only show the sell button if the logged in user is not a seller if seller show 'list product' */}
        {user?.is_seller ? (
          <div className="flex-shrink-0">
            <Link
              to="/sellers-dashboard/shop-products"
              className="bg-secondary text-white font-semibold px-4 md:px-6 py-2 rounded flex items-center text-base cursor-pointer hover:opacity-85 transition duration-200 whitespace-nowrap"
            >
              List Product <HiShoppingBag className="ml-1 font-bold" size={20} />
            </Link>
          </div>
        ) : (
          <div className="flex-shrink-0">
            <Link
              to="/kyc-verification"
              className="bg-secondary text-white font-semibold px-4 md:px-6 py-2 rounded flex items-center text-base cursor-pointer hover:opacity-85 transition duration-200 whitespace-nowrap"
            >
              Sell <HiShoppingBag className="ml-1 font-bold" size={20} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

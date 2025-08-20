import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import AccountMenu from "./AccountMenu";
import { CgProfile } from "react-icons/cg";
import { getInitials } from "../../../../utils/get-initial";

export default function MobileNavigation({
  user,
  itemCount,
  wishlistCount,
  unreadCount,
  showAccountMenu,
  menuRef,
  handleMobileProfileClick,
  dispatch,
}) {
  return (
    <div className="flex items-center">
      <div className="flex items-center h-[24px] mr-1 space-x-3">
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleMobileProfileClick}
            className="flex items-center cursor-pointer rounded-md"
            aria-label={user ? "Account menu" : "Go to Sign In"}
          >
            {user && (
              <>
                <div className="bg-white text-blue-600 rounded-full p-4 w-6 h-6 flex items-center justify-center text-sm mr-1">
                  {getInitials(user?.full_name)}
                </div>
                <IoChevronDown
                  className={`text-white text-sm transition-transform duration-200 ${
                    showAccountMenu ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {showAccountMenu && user && (
            <AccountMenu
              user={user}
              showAccountMenu={showAccountMenu}
              dispatch={dispatch}
              isDesktop={false}
            />
          )}
        </div>

        <Link to="/cart">
          <button
            className="h-[24px] w-[24px] relative text-white text-xs flex items-center cursor-pointer sm:text-base"
            aria-label="Go to Cart page"
          >
            <LuShoppingCart className="text-white text-[24px]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </Link>
        <Link to="/wishlist">
          <button
            className="h-[24px] w-[24px] relative text-white text-xs flex items-center cursor-pointer sm:text-base"
            aria-label="Go to Wishlist page"
          >
            <FaRegHeart className="text-white text-[24px]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
        </Link>
        {!user && (
          <Link
            to="/signin"
            className="bg-secondary text-white h-[30px] w-[72px] px-4 py-2 rounded flex items-center text-sm"
            aria-label="Go to Sign In page"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

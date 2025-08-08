import { Link } from "react-router-dom";
import {
  MdOutlinePersonOutline,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import {FaRegHeart } from "react-icons/fa";
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
      <div className="flex items-center h-[24px] mr-1 space-x-4">
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleMobileProfileClick}
            className="h-[24px] w-[24px] text-white text-sm flex items-center cursor-pointer sm:text-base"
            aria-label={user ? "Account menu" : "Go to Sign In"}
          >
            {user ? (
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                {getInitials(user?.full_name)}
              </div>
            ) : (
              // <img
              //   src={user?.profileImage || getInitials(user?.full_name)}
              //   alt="user profile"
              //   className="w-6 h-6 rounded-full object-cover"
              // />
              <CgProfile className="text-white text-[24px]" />
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

        {/* <Link to="/notifications">
          <button
            className="h-[24px] w-[24px] relative text-white text-xs flex items-center cursor-pointer sm:text-base"
            aria-label="Go to Notifications page"
          >
            <MdOutlineNotificationsActive className="text-white text-[24px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </Link> */}
      </div>
    </div>
  );
}

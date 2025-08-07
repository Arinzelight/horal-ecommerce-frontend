import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FiHelpCircle } from "react-icons/fi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import AccountMenu from "./AccountMenu";
import NotificationButton from "./NotificationMenu";

export default function DesktopNavigation({
  user,
  wishlistCount,
  itemCount,
  unreadCount,
  showAccountMenu,
  showNotification,
  notifications,
  menuRef,
  notificationRef,
  notificationButtonRef,
  toggleAccountMenu,
  handleNotificationClick,
  dispatch,
  setShowNotification,
}) {
  if (!user) {
    return (
      <div className="flex items-center gap-4 mr-1">
        <Link
          to="/wishlist"
          className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-primary-50"
          aria-label="Go to Wishlist page"
        >
          <FaRegHeart className="text-primary text-sm" />
          {wishlistCount > 0 && (
            <div className="absolute top-0 right-[12.5rem] bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </div>
          )}
        </Link>

        <Link
          to="/cart"
          className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:opacity-85"
          aria-label="Go to Cart page"
        >
          <LuShoppingCart className="text-primary text-sm" />
          {itemCount > 0 && (
            <div className="absolute top-0 right-[9.5rem] bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </div>
          )}
        </Link>

        <Link
          to="/signin"
          className="bg-secondary text-white h-[30px] w-[72px] px-4 py-2 rounded flex items-center text-sm"
          aria-label="Go to Sign In page"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        to="/wishlist"
        className="relative w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-primary-50 transition-colors"
      >
        <FaRegHeart className="text-primary text-sm" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>

      <Link
        to="/cart"
        className="relative w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-primary-50 transition-colors"
      >
        <LuShoppingCart className="text-primary text-sm" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Link>

      <Link
        to="/contact-us"
        className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-primary-50 transition-colors relative"
      >
        <FiHelpCircle className="text-primary text-sm" />
      </Link>

      {showNotification && (
        <NotificationButton
          ref={notificationButtonRef}
          unreadCount={unreadCount}
          onClick={handleNotificationClick}
          showNotification={showNotification}
          notifications={notifications}
          notificationRef={notificationRef}
          setShowNotification={setShowNotification}
        />
      )}

      <AccountMenu
        ref={menuRef}
        user={user}
        showAccountMenu={showAccountMenu}
        toggleAccountMenu={toggleAccountMenu}
        dispatch={dispatch}
        isDesktop={true}
      />
    </div>
  );
}

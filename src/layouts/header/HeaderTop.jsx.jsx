import { useState, useRef, useEffect } from "react";
import {
  FaApple,
  FaGooglePlay,
  FaSignOutAlt,
  FaRegHeart,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useMobile from "../../hooks/use-mobile";
import { IoSettingsOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import {
  MdOutlineDashboard,
  MdOutlinePersonOutline,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import NotificationDropdown from "../../pages/notification/NotificationDropdown";
import { notifications as messages } from "../../data/notification";
import { openLogoutModal } from "../../redux/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../hooks/useCart";

export default function HeaderTop() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState(messages);
  const dispatch = useDispatch();
   const { data } = useSelector((state) => state.wishlist);
    const {itemCount} = useCart();
    const wishlistItems = data?.items?.map((item) => item.product) || [];
    const wishlistCount = wishlistItems.length;

  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const isMobile = useMobile();

  const { userInfo } = useSelector((state) => state.user);

  const user = userInfo?.data;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
    setShowNotification(false);
  };

  const handleNotificationClick = () => {
    // If notification is open, close it
    if (showNotification) {
      setShowNotification(false);
    } else {
      // Otherwise, open it and close other menus
      setShowNotification(true);
      setShowAccountMenu(false);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Account menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }

      // Mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }

      // Notification - check if click is outside both dropdown and button
      if (
        showNotification &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotification]);

  const desktopAccountMenuItems = [
    { name: "Profile", icon: <MdOutlinePersonOutline />, href: "/profile" },

    ...(user?.is_seller
      ? [
          {
            name: "Dashboard",
            icon: <MdOutlineDashboard />,
            href: "/sellers-dashboard",
          },
        ]
      : []),
    { name: "Order History", icon: <FaChartLine />, href: "profile/orders" },
    { name: "Settings", icon: <IoSettingsOutline />, href: "/settings" },
  ];

  return (
    <div className="bg-primary-700 w-full text-white py-2 sm:px-16 px-4 flex items-center justify-between ">
      <div className="flex space-x-2">
        <Link to="#">
          <button
            className="flex h-[28px] xs:h-[32.75px] w-[85px] xs:w-[102px] items-center cursor-pointer bg-black text-white px-1 xs:px-2 py-1 rounded text-[7px] xs:text-xs"
            aria-label="Download on Apple Store"
          >
            <FaApple className="mr-1 text-[10px] xs:text-xs" />
            <div>
              <div className="text-[6px] xs:text-[8px]">Get it on</div>
              <div className="font-semibold text-[8px] xs:text-[10px]">
                Apple Store
              </div>
            </div>
          </button>
        </Link>
        <Link to="#">
          <button
            className="flex h-[28px] xs:h-[32.75px] w-[85px] xs:w-[102px] items-center bg-primary text-white px-1 xs:px-2 py-1 rounded text-[7px] xs:text-xs"
            aria-label="Download on Google Play"
          >
            <FaGooglePlay className="mr-1 text-[10px] xs:text-xs" />
            <div>
              <div className="text-[6px] xs:text-[8px]">Get it on</div>
              <div className="font-semibold text-[8px] xs:text-[10px]">
                Google Play
              </div>
            </div>
          </button>
        </Link>
      </div>

      <div className="flex items-center ">
        {/* Desktop view when not logged in - show icons and signup */}
        {!isMobile && !user && (
          <div className="flex items-center gap-4 mr-1">
            <Link to="/wishlist">
              <button
                className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-primary-50 "
                aria-label="Go to Wishlist page"
              >
                <FaRegHeart className="text-primary text-sm" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </Link>

            <Link to="/cart">
              <button
                className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:opacity-85 "
                aria-label="Go to Cart page"
              >
                <LuShoppingCart className="text-primary text-sm" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </Link>

            <Link
              to="/signin"
              className=" bg-secondary text-white h-[30px] w-[72px] px-4 py-2 rounded flex items-center text-sm"
              aria-label=" Go to Sign In page"
            >
              Login
            </Link>
          </div>
        )}

        {/* Desktop view when logged in - show full navigation */}
        {!isMobile && user && (
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
              to="/help"
              className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-primary-50 transition-colors relative"
            >
              <FiHelpCircle className="text-primary text-sm" />
            </Link>

            <button
              ref={notificationButtonRef}
              onClick={handleNotificationClick}
              aria-label="Toggle notifications"
              className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-primary-50 transition-colors relative"
            >
              <MdOutlineNotificationsActive className="text-primary text-sm" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {showNotification && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white shadow-lg z-50 text-black"
                ref={notificationRef}
              >
                <NotificationDropdown
                  notifications={notifications}
                  onClose={() => setShowNotification(false)}
                />
              </div>
            )}

            <div className="relative" ref={menuRef}>
              <button
                onClick={toggleAccountMenu}
                className="flex items-center cursor-pointer bg-white text-black px-3 py-1 rounded-full text-sm"
              >
                Account <FaChevronDown className="ml-1" />
              </button>

              {showAccountMenu && (
                <div className="absolute right-0  mt-1 w-40 bg-white shadow-lg z-50 text-black">
                  <div className="py-1">
                    {desktopAccountMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm hover:bg-primary-100"
                      >
                        <span className="text-primary mr-2">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        dispatch(openLogoutModal());
                      }}
                      className="flex  items-center px-4 w-full py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile view */}
        {isMobile && (
          <div className="flex items-center ">
            <div className="flex items-center  h-[24px] mr-1 space-x-4">
              <Link to={user ? "/profile" : "/signin"}>
                <button
                  className="h-[24px] w-[24px] text-white text-xs flex items-center cursor-pointer sm:text-base "
                  aria-label={user ? "Go to Profile" : "Go to Sign In"}
                >
                  <MdOutlinePersonOutline className="text-white text-[24px]" />
                </button>
              </Link>

              <Link to="/cart">
                <button
                  className="h-[24px] w-[24px] relative text-white text-xs flex items-center cursor-pointer sm:text-base "
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

              <Link to="/notifications">
                <button
                  className="h-[24px] w-[24px] relative text-white text-xs flex items-center cursor-pointer sm:text-base "
                  aria-label="Go to Cart page"
                >
                  <MdOutlineNotificationsActive className="text-white text-[24px]" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

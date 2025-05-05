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


const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser({
      isLoggedIn: true,
    });
  }, []);

  return { user };
};

export default function HeaderTop() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const isMobile = useMobile();
  const { user } = useAuth();

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

 

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Desktop account menu items when logged in
  const desktopAccountMenuItems = [
    { name: "Profile", icon: <MdOutlinePersonOutline />, href: "/profile" },
    { name: "Dashboard", icon: <MdOutlineDashboard />, href: "/dashboard" },
    { name: "Order History", icon: <FaChartLine />, href: "/order-history" },
    { name: "Settings", icon: <IoSettingsOutline />, href: "/settings" },

  ];

  return (
    <div className="bg-primary-700 w-full text-white py-2 sm:px-16 px-4 flex items-center justify-between ">
      <div className="flex space-x-2">
        <Link to="#">
          <button
            className="flex h-[32.75px] w-[102px] items-center cursor-pointer bg-black text-white px-2 py-1 rounded text-xs"
            aria-label="Download on Apple Store"
          >
            <FaApple className="mr-1" />
            <div>
              <div className="text-[8px]">Get it on</div>
              <div className="font-semibold text-[10px]">Apple Store</div>
            </div>
          </button>
        </Link>
        <Link to="#">
          <button
            className="flex h-[32.75px] w-[102px] items-center bg-primary text-white px-2 py-1 rounded text-xs cursor-pointer"
            aria-label="Download on Google Play"
          >
            <FaGooglePlay className="mr-1" />
            <div>
              <div className="text-[8px]">Get it on</div>
              <div className="font-semibold text-[10px]">Google Play</div>
            </div>
          </button>
        </Link>
      </div>

      <div className="flex items-center ">
        {/* Desktop view when not logged in - show icons and signup */}
        {!isMobile && !user?.isLoggedIn && (
          <div className="flex items-center gap-4 mr-1">
            <Link to="/wishlist">
              <button
                className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50 "
                aria-label="Go to Wishlist page"
              >
                <FaRegHeart className="text-primary text-sm" />
              </button>
            </Link>

            <Link to="/cart">
              <button
                className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:opacity-85 "
                aria-label="Go to Cart page"
              >
                <LuShoppingCart className="text-primary text-sm" />
              </button>
            </Link>

            <Link
              to="/signin"
              className=" text-white text-xs flex items-center cursor-pointer sm:text-base hover:opacity-95 transition duration-200"
              aria-label=" Go to Sign In page"
            >
              Login
            </Link>
          </div>
        )}

        {/* Desktop view when logged in - show full navigation */}
        {!isMobile && user?.isLoggedIn && (
          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
            >
              <FaRegHeart className="text-primary text-sm" />
            </Link>

            <Link
              to="/cart"
              className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
            >
              <LuShoppingCart className="text-primary text-sm" />
            </Link>

            <Link
              to="/help"
              className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50 transition-colors relative"
            >
              <FiHelpCircle className="text-primary text-sm" />
            </Link>

            <Link
              to="/notifications"
              className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50 transition-colors relative"
            >
              <MdOutlineNotificationsActive className="text-primary text-sm" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>

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
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <span className="text-primary mr-2">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    <hr className="my-1" />
                    <Link
                      to="/signout"
                      className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile view */}
        {isMobile && (
          <div className="flex items-center gap-3">
            <div className="flex items-center  h-[24px] mr-1 gap-4">
              <Link to="/profile">
                <button
                  className="h-[24px] w-[24px] text-white text-xs flex items-center cursor-pointer sm:text-base "
                  aria-label="Go to Wishlist page"
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
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </button>
              </Link>

              <Link to="/help">
                <button
                  className="h-[24px] w-[24px]  text-white text-xs flex items-center cursor-pointer sm:text-base "
                  aria-label=" Go to help page"
                >
                  <FiHelpCircle className="text-white text-[24px]" />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

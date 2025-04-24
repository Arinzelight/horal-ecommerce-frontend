import { useState, useRef, useEffect } from "react";
import {
  FaApple,
  FaGooglePlay,
  FaChevronDown,
  FaBars,
  FaUserCircle,
  FaTachometerAlt,
  FaShoppingCart,
  FaHeart,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaRegHeart,
  FaRegBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useMobile from "../../hooks/use-mobile";

export default function HeaderTop() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef(null);
  const isMobile = useMobile();

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Desktop menu items (limited)
  const desktopMenuItems = [
    { name: "Profile", icon: <FaUserCircle />, href: "/profile" },
    { name: "Dashboard", icon: <FaTachometerAlt />, href: "/dashboard" },
    { name: "Settings", icon: <FaCog />, href: "/settings" },
  ];

  // Mobile menu items (full list)
  const mobileMenuItems = [
    { name: "Profile", icon: <FaUserCircle />, href: "/profile" },
    { name: "Dashboard", icon: <FaTachometerAlt />, href: "/dashboard" },
    { name: "Cart", icon: <FaShoppingCart />, href: "/cart", badge: "2" },
    { name: "Wishlist", icon: <FaRegHeart />, href: "/wishlist" },
    {
      name: "Notifications",
      icon: <FaBell />,
      href: "/notifications",
      badge: "3",
    },
    { name: "Settings", icon: <FaCog />, href: "/settings" },
  ];

  return (
    <div className="bg-primary text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-2">
          <Link
            to="#"
            className="flex items-center bg-black text-white px-2 py-1 rounded text-xs"
          >
            <FaApple className="mr-1" />
            <div>
              <div className="text-[8px]">Get it on</div>
              <div className="font-semibold text-[10px]">Apple Store</div>
            </div>
          </Link>
          <Link
            to="#"
            className="flex items-center bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            <FaGooglePlay className="mr-1" />
            <div>
              <div className="text-[8px]">Get it on</div>
              <div className="font-semibold text-[10px]">Google Play</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {/* User icons - Hidden on mobile */}
          {!isMobile && (
            <div className="flex items-center gap-3">
              <Link
                to="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FaRegHeart className="text-blue-500 text-sm" />
              </Link>

              <Link
                to="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FaShoppingCart className="text-blue-500 text-sm" />
              </Link>

              <Link
                to="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FaCog className="text-blue-500 text-sm" />
              </Link>

              <Link
                to="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors relative"
              >
                <FaRegBell className="text-blue-500 text-sm" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          )}

          {/* Account dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleAccountMenu}
              className="flex items-center bg-white cursor-pointer text-black px-3 py-1 rounded-full text-xs"
            >
              {isMobile ? (
                <FaBars className="text-lg" />
              ) : (
                <>
                  Account <FaUserCircle className="ml-1 " />
                </>
              )}
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 text-gray-800">
                <div className="py-1">
                  {/* Render different menu items based on device */}
                  {(isMobile ? mobileMenuItems : desktopMenuItems).map(
                    (item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <span className="text-primary mr-2">{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  )}
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
      </div>
    </div>
  );
}

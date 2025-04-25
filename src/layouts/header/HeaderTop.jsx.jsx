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
import { HiOutlineMenuAlt3, HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";

const useAuth = () => {
  const [user, setUser] = useState(null); // null = not logged in

  useEffect(() => {
    setUser({
      isLoggedIn: false,
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

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
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
    { name: "Profile", icon: <CgProfile />, href: "/profile" },
    { name: "Dashboard", icon: <MdOutlineDashboard />, href: "/dashboard" },
    { name: "Settings", icon: <IoSettingsOutline />, href: "/settings" },
  ];

  // Mobile menu items when not logged in
  const mobileMenuItemsLoggedOut = [
    { name: "Wishlist", icon: <FaRegHeart />, href: "/wishlist" },
    {
      name: "Cart",
      icon: <HiOutlineShoppingCart />,
      href: "/cart",
      badge: "2",
    },
    { name: "Sign In", icon: <CgProfile />, href: "/signin" },
  ];

  // Mobile menu items when logged in
  const mobileMenuItemsLoggedIn = [
    { name: "Profile", icon: <CgProfile />, href: "/profile" },
    { name: "Dashboard", icon: <MdOutlineDashboard />, href: "/dashboard" },
    {
      name: "Cart",
      icon: <HiOutlineShoppingCart />,
      href: "/cart",
      badge: "2",
    },
    { name: "Wishlist", icon: <FaRegHeart />, href: "/wishlist" },
    {
      name: "Notifications",
      icon: <IoMdNotificationsOutline />,
      href: "/notifications",
      badge: "3",
    },
    { name: "Settings", icon: <IoSettingsOutline />, href: "/settings" },
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
            className="flex items-center bg-primary text-white px-2 py-1 rounded text-xs"
          >
            <FaGooglePlay className="mr-1" />
            <div>
              <div className="text-[8px]">Get it on</div>
              <div className="font-semibold text-[10px]">Google Play</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {/* Desktop view when not logged in - show icons and signup */}
          {!isMobile && !user?.isLoggedIn && (
            <div className="flex items-center gap-4 mr-1">
              <Link
                to="/wishlist"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FaRegHeart className="text-primary text-sm" />
              </Link>

              <Link
                to="/cart"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <HiOutlineShoppingCart className="text-primary text-sm" />
              </Link>

              <Link
                to="/signin"
                className="bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-97 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Desktop view when logged in - show full navigation */}
          {!isMobile && user?.isLoggedIn && (
            <div className="flex items-center gap-3">
              <Link
                to="/wishlist"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FaRegHeart className="text-primary text-sm" />
              </Link>

              <Link
                to="/cart"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <HiOutlineShoppingCart className="text-primary text-sm" />
              </Link>

              <Link
                to="/notifications"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors relative"
              >
                <IoMdNotificationsOutline className="text-primary text-sm" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>

              <Link
                to="/settings"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <IoSettingsOutline className="text-primary text-sm" />
              </Link>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={toggleAccountMenu}
                  className="flex items-center bg-white text-black px-3 py-1 rounded-full text-sm"
                >
                  Account <FaChevronDown className="ml-1" />
                </button>

                {showAccountMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 text-gray-800">
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
              {/* Menu button for mobile */}
              <div className="relative" ref={mobileMenuRef}>
                <button
                  onClick={toggleMobileMenu}
                  className="flex items-center bg-white cursor-pointer text-primary px-2 py-2 rounded-full text-xs"
                >
                  <HiOutlineMenuAlt3 className="text-xl" />
                </button>

                {showMobileMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 text-gray-800">
                    <div className="py-1">
                      {(user?.isLoggedIn
                        ? mobileMenuItemsLoggedIn
                        : mobileMenuItemsLoggedOut
                      ).map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <span className="text-primary mr-2">
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                      {user?.isLoggedIn && (
                        <>
                          <hr className="my-1" />
                          <Link
                            to="/signout"
                            className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                          >
                            <FaSignOutAlt className="mr-2" />
                            Sign Out
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import {
  FaApple,
  FaGooglePlay,
  FaSignOutAlt,
  FaRegHeart,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";

const useAuth = () => {
  const [user, setUser] = useState(null);

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
  const { user } = useAuth();

  const toggleAccountMenu = () => setShowAccountMenu(!showAccountMenu);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const desktopAccountMenuItems = [
    { name: "Profile", icon: <CgProfile />, href: "/profile" },
    { name: "Dashboard", icon: <MdOutlineDashboard />, href: "/dashboard" },
    { name: "Settings", icon: <IoSettingsOutline />, href: "/settings" },
  ];

  const mobileMenuItems = user?.isLoggedIn
    ? [
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
      ]
    : [
        { name: "Wishlist", icon: <FaRegHeart />, href: "/wishlist" },
        {
          name: "Cart",
          icon: <HiOutlineShoppingCart />,
          href: "/cart",
          badge: "2",
        },
        { name: "Sign In", icon: <CgProfile />, href: "/signin" },
      ];

  return (
    <div className="bg-primary-700 w-full text-white py-2 sm:px-10 px-4 flex items-center justify-between">
      <div className="flex space-x-2">
        <Link to="#">
          <button className="flex h-[32.75px] w-[102px] items-center cursor-pointer bg-black text-white px-2 py-1 rounded text-xs">
            <FaApple className="mr-1" />
            <div>
              <div className="text-[8px]">Get it on</div>
              <div className="font-semibold text-[10px]">Apple Store</div>
            </div>
          </button>
        </Link>
        <Link to="#">
          <button className="flex h-[32.75px] w-[102px] items-center bg-primary text-white px-2 py-1 rounded text-xs cursor-pointer">
            <FaGooglePlay className="mr-1" />
            <div>
              <div className="text-[8px]">Get it on</div>
              <div className="font-semibold text-[10px]">Google Play</div>
            </div>
          </button>
        </Link>
      </div>

      <div className="flex items-center">
        {/* Mobile Menu Button - shown only on mobile */}
        <div className="relative md:hidden" ref={mobileMenuRef}>
          <button
            onClick={toggleMobileMenu}
            className="flex items-center bg-white cursor-pointer text-primary px-2 py-2 rounded-full text-xs"
          >
            <HiOutlineMenuAlt3 className="text-xl" />
          </button>

          {showMobileMenu && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 text-gray-800">
              <div className="py-1">
                {mobileMenuItems.map((item, index) => (
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
                      <span className="bg-red-500 cursor-pointer text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
                      className="flex cursor-pointer items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
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

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          {!user?.isLoggedIn ? (
            <>
              <Link to="/wishlist">
                <button className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50">
                  <FaRegHeart className="text-primary text-sm" />
                </button>
              </Link>

              <Link to="/cart">
                <button className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:opacity-85">
                  <HiOutlineShoppingCart className="text-primary text-sm" />
                </button>
              </Link>

              <Link
                to="/signin"
                className="text-white text-xs flex items-center cursor-pointer sm:text-base hover:opacity-95"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/wishlist"
                className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50"
              >
                <FaRegHeart className="text-primary text-sm" />
              </Link>

              <Link
                to="/cart"
                className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50"
              >
                <HiOutlineShoppingCart className="text-primary text-sm" />
              </Link>

              <Link
                to="/notifications"
                className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50 relative"
              >
                <IoMdNotificationsOutline className="text-primary text-sm" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>

              <Link
                to="/settings"
                className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-blue-50"
              >
                <IoSettingsOutline className="text-primary text-sm" />
              </Link>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={toggleAccountMenu}
                  className="flex items-center cursor-pointer bg-white text-black px-3 py-1 rounded-full text-sm"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

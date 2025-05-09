import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaChevronDown,
  FaRegHeart,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import StateDropdown from "./StateDropdown";
import useMobile from "../../hooks/use-mobile";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {
  MdOutlineDashboard,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import Logo from "../../assets/images/horal-logo-1.png";
import { IoSettingsOutline } from "react-icons/io5";
import { notifications as messages } from "../../data/notification";
import { openLogoutModal } from "../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";

export default function HeaderBottom() {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useMobile();
  const menuRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [notifications, setNotifications] = useState(messages);
  const dispatch = useDispatch();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleStateDropdown = () => {
    setShowStateDropdown(!showStateDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
        document.body.style.overflow = "auto";
      }
    }

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  // Close state dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target) &&
        !event.target.closest('button[onClick="toggleStateDropdown"]')
      ) {
        setShowStateDropdown(false);
      }
    }

    if (showStateDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStateDropdown]);

  const menuItems = [
    { icon: <MdOutlineDashboard />, name: "Dashboard", link: "/dashboard" },
    { icon: <FaRegHeart />, name: "Wishlist", link: "/wishlist" },
    { name: "Order History", icon: <FaChartLine />, href: "/order-history" },
    {
      icon: <MdOutlineNotificationsActive />,
      name: "Notifications",
      link: "/notifications",
    },
    { icon: <IoSettingsOutline />, name: "Settings", link: "/settings" },
  ];

  if (isMobile) {
    return (
      <header className="bg-white py-3 px-4 sm:px-16 shadow-sm relative">
        <div className="flex flex-col gap-3">
          {/* Top row - Logo and Sell button */}
          <div className="flex items-center h-[30px] justify-between">
            <div className="flex w-[130px] justify-between gap-1">
              <button
                ref={menuButtonRef}
                onClick={toggleMobileMenu}
                className="w-[30px] h-[30px] flex items-center p-[5px] rounded-[4px] bg-primary cursor-pointer"
              >
                <HiOutlineMenuAlt3 size={25} className="text-white" />
              </button>

              <Link to="/" className="flex-shrink-0 w-[83px] h-[30px]">
                <img src={Logo} alt="Horal Logo" className="h-8" />
              </Link>
            </div>

            <div className="">
              <button className="bg-secondary text-white h-[30px] w-[72px] px-4 py-2 rounded flex items-center text-sm">
                Sell <FaPlus className="ml-1" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`fixed top-24 left-0 h-75 w-50 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
              showMobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <nav className="py-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="flex border-b-1 border-gray-200 items-center px-4 py-2 hover:bg-primary-100 transition-colors"
                  onClick={() => {
                    setShowMobileMenu(false);
                    document.body.style.overflow = "auto";
                  }}
                >
                  <span className="text-primary mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                  {item.name === "Notifications" && unreadCount > 0 && (
                    <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              ))}
              {/* check if user is logged in */}
              <button
                to="/signout"
                className="flex border-t-1 border-gray-200 items-center w-full ml-1 mt-12 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                onClick={() => {
                  dispatch(openLogoutModal());
                  setShowMobileMenu(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Bottom row - Search and State dropdown in same line */}
          <div className="flex items-center gap-2">
            <div className="relative flex-shrink-0" ref={stateDropdownRef}>
              <button
                onClick={toggleStateDropdown}
                className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md h-[38px]"
              >
                <span className="text-sm whitespace-nowrap">State</span>
                <FaChevronDown className="ml-1 text-xs" />
              </button>
              {showStateDropdown && <StateDropdown />}
            </div>

            <div className="flex-1 flex items-center">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full px-3 py-2 bg-gray-200 rounded-md text-sm h-[38px]"
              />
              <button className="bg-primary ml-2 text-white p-2 rounded-md h-[38px] min-w-[38px] flex items-center justify-center">
                <FaSearch className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Desktop and Tablet layout
  return (
    <header className="self-stretch flex items-center shadow-sm h-20 relative bg-white px-4 md:px-14 lg:px-16">
      <div className="flex items-center justify-between w-full gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="Horal Logo" className="h-[40px] w-[110px]" />
        </Link>

        <div className="flex-1 flex items-center justify-center gap-2 w-[469px] md:gap-4">
          <div className="relative" ref={stateDropdownRef}>
            <button
              onClick={toggleStateDropdown}
              className="flex items-center text-sm justify-between w-full px-2 py-2.5 outline-1 outline-offset-[-1px] outline-stone-300 rounded-md whitespace-nowrap"
            >
              <span>Select State</span>
              <FaChevronDown className="ml-2" />
            </button>
            {showStateDropdown && <StateDropdown />}
          </div>

          <div className="flex-1 flex max-w-lg">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-64 px-4 py-2 bg-neutral-200 rounded flex justify-start items-center gap-2.5 overflow-hidden"
            />
            <button className="bg-primary cursor-pointer hover:opacity-85 text-white px-4 md:px-6 py-2 text-center rounded ml-1 whitespace-nowrap">
              Search
            </button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <button className="bg-secondary text-white px-4 md:px-6 py-2 rounded flex items-center text-base cursor-pointer hover:opacity-85 transition duration-200 whitespace-nowrap">
            Sell <FaPlus className="ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
}

import { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
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
import {MdOutlineDashboard} from "react-icons/md";
import Logo from "../../assets/images/horal-logo-1.png";
import { IoSettingsOutline } from "react-icons/io5";
import { notifications as messages } from "../../data/notification";
import { useDispatch, useSelector } from "react-redux";
import { useCategories } from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { FaShirt } from "react-icons/fa6";
export default function HeaderBottom() {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useMobile();
  const menuRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [notifications, setNotifications] = useState(messages);

  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const { categories } = useCategories();
  const { userInfo } = useSelector((state) => state.user);

  const user = userInfo?.data || null;
  
  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`);
    setShowMobileMenu(false);
  };

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

  // Log when userInfo changes
  useEffect(() => {
    console.log("userInfo changed in useEffect:", userInfo);
    console.log("user changed in useEffect:", user);
  }, [userInfo, user]);

  const menuItems = [
    ...(user?.is_seller
      ? [
          {
            name: "Dashboard",
            icon: <MdOutlineDashboard />,
            href: "/sellers-dashboard",
          },
        ]
      : []),
    { icon: <FaRegHeart />, name: "Wishlist", link: "/wishlist" },
    { name: "Order History", icon: <FaChartLine />, href: "/order-history" },
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
            className={`fixed top-24 left-0 h-full  w-60 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
              showMobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="py-1">
              <h2 className="text-xl mb-4 mt-2 font-bold ml-4">Categories</h2>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="w-full flex items-center hover:bg-white pl-3 hover:text-primary py-2 rounded cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                  aria-label={`Go to ${category.name} category`}
                >
                  {/* 
                <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center mr-2">
                  {category.icon}
                </div>
               */}
                  {/* use placeholder icon for now */}
                  <div className="w-8 h-8 bg-gray-200 text-primary rounded-full flex items-center justify-center mr-2">
                    <FaShirt className="text-sm" />
                  </div>
                  <span className="text-[16px] text-primary capitalize whitespace-nowrap">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
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
              className=" lg:w-64 px-4 py-2 bg-neutral-200 rounded flex justify-start items-center gap-2.5 overflow-hidden"
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

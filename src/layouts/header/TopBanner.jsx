"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaApple,
  FaGooglePlay,
  FaChevronDown,
  FaRegHeart,
  FaHeart,
  FaShoppingCart,
  FaRegBell,
  FaBell,
  FaRegUserCircle,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useMobile from "../../hooks/use-mobile";

export default function TopBanner() {
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

  return (
    <div className="bg-primary text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-2">
          <Link
            href="#"
            className="flex items-center bg-black text-white px-2 py-1 rounded text-xs"
          >
            <FaApple className="mr-1" />
            <div>
              <div className="text-[8px]">Get it on</div>
              <div className="font-semibold text-[10px]">Apple Store</div>
            </div>
          </Link>
          <Link
            href="#"
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
              {/* Favourite */}
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FaRegHeart className="text-blue-500 text-sm" />
              </Link>

              {/* Cart */}
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FaShoppingCart className="text-blue-500 text-sm" />
              </Link>

              {/* Settings */}
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FaCog className="text-blue-500 text-sm" />
              </Link>

              {/* Notifications */}
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors relative"
              >
                <FaRegBell className="text-blue-500 text-sm" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          )}

          {/* Account dropdown - Always visible */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleAccountMenu}
              className="flex items-center bg-white text-black px-3 py-1 rounded-full text-xs"
            >
              Account <FaChevronDown className="ml-1" />
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-50 text-gray-800">
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <Link
                    href="/signout"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
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

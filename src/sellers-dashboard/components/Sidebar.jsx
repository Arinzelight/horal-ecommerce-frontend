import { useState } from "react";
import {
  FaRegChartBar,
  FaCommentDots,
  FaShoppingCart,
  FaStar,
  FaUserShield,
  FaCog,
  FaGlobe,
  FaUser,
  FaBell,
  FaLock,
  FaBox,
  FaStore,
  FaTags,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const [isShopOpen, setIsShopOpen] = useState(false);

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };
  return (
    <aside className="w-52 h-[808px] hidden xl:block py-4 bg-primary-900 rounded-lg shadow flex flex-col justify-between items-center">
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="w-full flex flex-col items-center gap-4">
          {/* Dashboard */}
          <Link
            to=""
            className="w-full px-2 py-1 bg-neutral-200 rounded-sm flex items-center gap-2"
          >
            <FaRegChartBar className="text-primary-900" size={14} />
            <span className="text-primary-900 text-sm font-bold font-nunito">
              Dashboard
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="w-full flex flex-col gap-2">
            {/* Shop Dropdown */}
            <div className="flex flex-col items-start gap-2 w-full">
              <button
                onClick={toggleShop}
                className="w-full px-2 cursor-pointer py-1 rounded-sm flex justify-between items-center hover:bg-primary-800 transition-colors"
              >
                <div className="flex items-center gap-2 ">
                  <FaShoppingCart className="text-neutral-200" size={16} />
                  <span className="text-neutral-200 text-sm font-bold font-nunito">
                    My Shop
                  </span>
                </div>
                <span
                  className={`text-neutral-200 transform ${
                    isShopOpen ? "rotate-0" : "rotate-90"
                  } transition-transform`}
                >
                  &#9662;
                </span>
              </button>

              {/* Dropdown Content */}
              {isShopOpen && (
                <div className="w-full  pl-4 flex gap-4">
                  <div className=" border-l border-neutral-200  h-auto"></div>
                  <div className="flex flex-col gap-1 w-full">
                    <Link
                      to="shop-products"
                      className="pl-2 pr-4 py-1.5 hover:text-primary rounded-sm flex items-center gap-2 text-neutral-200 hover:bg-primary-800 transition-colors"
                    >
                      <FaBox className="text-neutral-200 " size={14} />
                      <span className="text-sm font-nunito">Products</span>
                    </Link>
                    <Link
                      to="shop-orders"
                      className="pl-2 pr-4 hover:text-primary py-1.5 rounded-sm flex items-center gap-2 text-neutral-200 hover:bg-primary-800 transition-colors"
                    >
                      <FaStore className="text-neutral-200" size={14} />
                      <span className="text-sm font-nunito">Inventory</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="chat"
              className="px-2 py-1  hover:cursor-pointer rounded-sm flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <FaCommentDots className="text-neutral-200" size={16} />
                <span className="text-neutral-200 text-sm font-bold font-nunito">
                  Chat
                </span>
              </div>
              <div className="px-2 py-[3px] bg-neutral-200 rounded-full text-primary-900 text-[10px] font-bold font-nunito">
                2
              </div>
            </Link>

            <Link
              to="sales"
              className="px-2 py-1 rounded-sm hover:cursor-pointer  flex items-center gap-2"
            >
              <FaRegChartBar className="text-neutral-200" size={16} />
              <span className="text-neutral-200 text-sm font-bold font-nunito">
                Sales
              </span>
            </Link>

            <Link
              to="reviews"
              className="px-2 py-1 rounded-sm flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <FaStar className="text-neutral-200" size={16} />
                <span className="text-neutral-200 text-sm font-bold font-nunito">
                  Reviews
                </span>
              </div>
              <div className="px-2 py-[3px] bg-neutral-200 rounded-full text-primary-900 text-[10px] font-bold font-nunito">
                2
              </div>
            </Link>

            <Link
              to="support"
              className="px-2 py-1 rounded-sm flex items-center gap-2"
            >
              <FaUserShield className="text-neutral-200" size={16} />
              <span className="text-neutral-200 text-sm font-bold font-nunito">
                Customer Support
              </span>
            </Link>

            {/* Settings Dropdown */}
            <div className="flex flex-col items-start  gap-2 w-full">
              <button
                onClick={toggleSettings}
                className="w-full px-2 py-1 cursor-pointer rounded-sm flex justify-between items-center hover:bg-primary-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FaCog className="text-neutral-200" size={18} />
                  <span className="text-neutral-200 text-sm font-bold font-nunito">
                    Settings
                  </span>
                </div>
                <span
                  className={`text-neutral-200 transform ${
                    isSettingsOpen ? "rotate-0" : "rotate-90"
                  } transition-transform`}
                >
                  &#9662;
                </span>
              </button>

              {/* Dropdown Content */}
              {isSettingsOpen && (
                <div className="w-full pl-4 flex gap-4   rounded">
                  <div className="0 h-auto"></div>
                  <div className="flex flex-col gap-1 w-full">
                    <Link
                      to="account-settings"
                      className="pl-2 pr-4 py-1.5 rounded-sm flex items-center gap-2 text-neutral-200 hover:bg-primary-800 transition-colors"
                    >
                      <FaUser className="text-neutral-200" size={14} />
                      <span className="text-sm font-nunito">Account</span>
                    </Link>
                    <Link
                      to="/dashboard/settings/notifications"
                      className="pl-2 pr-4 py-1.5 rounded-sm flex items-center gap-2 text-neutral-200 hover:bg-primary-800 transition-colors"
                    >
                      <FaBell className="text-neutral-200" size={14} />
                      <span className="text-sm font-nunito">Notifications</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full border-t border-blue-300 my-4" />
          </div>
        </div>

        {/* Back to website */}
        <Link to="/" className="w-full px-2 flex items-center gap-4">
          <FaGlobe className="text-white" size={20} />
          <span className="text-white text-sm font-bold font-nunito">
            Back to Website
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

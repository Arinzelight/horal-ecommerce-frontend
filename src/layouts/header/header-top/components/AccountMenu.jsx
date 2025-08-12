import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { FaSignOutAlt, FaRegHeart, FaChartLine } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlinePersonOutline } from "react-icons/md";
import { openLogoutModal } from "../../../../redux/modal/modalSlice";
import avatar1 from "../../../../assets/icons/avatar1.png";
import { FiChevronDown } from "react-icons/fi";
import { getInitials } from "../../../../utils/get-initial";
const AccountMenu = forwardRef(
  ({ user, showAccountMenu, toggleAccountMenu, dispatch, isDesktop }, ref) => {
    const desktopAccountMenuItems = [
      {
        name: "Profile",
        icon: <MdOutlinePersonOutline />,
        href: "/profile-page",
      },
      user?.is_seller && {
        name: "Dashboard",
        icon: <MdOutlineDashboard />,
        href: "/sellers-dashboard",
      },
      (user?.is_staff || user?.is_superuser) && {
        name: "Admin",
        icon: <MdOutlineDashboard />,
        href: "/admin",
      },
      {
        name: "Order History",
        icon: <FaChartLine />,
        href: "/profile-page/order-history",
      },
    ].filter(Boolean);

    const mobileAccountMenuItems = [
      {
        name: "My Profile",
        icon: <MdOutlinePersonOutline />,
        href: "/profile-page",
      },
      user?.is_seller && {
        name: "Dashboard",
        icon: <MdOutlineDashboard />,
        href: "/sellers-dashboard",
      },
      (user?.is_staff || user?.is_superuser) && {
        name: "Admin",
        icon: <MdOutlineDashboard />,
        href: "/admin",
      },
      {
        name: "Order History",
        icon: <FaChartLine />,
        href: "/profile-page/order-history",
      },
      {
        name: "Sign Out",
        icon: <FaSignOutAlt />,
        href: "#",
        onClick: () => {
          dispatch(openLogoutModal());
        },
      },
    ].filter(Boolean);

    const menuItems = isDesktop
      ? desktopAccountMenuItems
      : mobileAccountMenuItems;

    if (isDesktop) {
      return (
        <div className="relative" ref={ref}>
          <button
            onClick={toggleAccountMenu}
            className="flex items-center cursor-pointer bg-white text-black px-3 py-1 rounded-full text-sm"
          >
            <span className="text-neutral-900">
              {user?.full_name.split(" ")[0] || "Account"}
            </span>
            {user && user?.profileImage ? (
              <div>
                <img
                  src={user?.profileImage}
                  alt="user profile image"
                  className="w-6 h-6 rounded-full object-cover ml-2"
                />
              </div>
            ) : (
              <img
                src={avatar1}
                alt="default avatar"
                className="w-6 h-6 rounded-full object-cover ml-2"
              />
            )}
            {/* <FiChevronDown className="w-4 h-4 text-neutral-600" /> */}
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 mt-1 w-40 bg-white shadow-lg z-50 text-black">
              <div className="py-1">
                {menuItems.map((item, index) => (
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
                  className="flex items-center px-4 w-full py-2 text-sm text-red-500 hover:bg-primary-100"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="absolute -ml-16 mt-2 w-44 bg-white shadow-lg z-50 text-black rounded-md">
        <div className="py-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={item.onClick}
              className="flex items-center px-4 py-2 text-sm hover:bg-primary-100"
            >
              <span
                className={`${
                  item.name === "Sign Out" ? "text-red-500" : "text-primary"
                } mr-2`}
              >
                {item.icon}
              </span>
              <span
                className={`${
                  item.name === "Sign Out" ? "text-red-500" : ""
                } mr-2`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }
);

AccountMenu.displayName = "AccountMenu";

export default AccountMenu;

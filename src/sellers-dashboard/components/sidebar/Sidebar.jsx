import {
  FaRegChartBar,
  FaCommentDots,
  FaShoppingCart,
  FaStar,
  FaUserShield,
  FaGlobe,
  FaUser,
  FaBell,
  FaBox,
  FaStore,
  FaUsers,
  FaChartLine,
  FaHeart,
  FaLock,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";
import SidebarLink from "./SidebarLink";
import SidebarDropdown from "./SidebarDropdown";
import SidebarSection from "./SidebarSection";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/auth/authSlice/userSlice";
import { useState } from "react";

const Sidebar = ({ sidebarOpen, onLinkClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Commented out Redux user for now
  // const { userInfo } = useSelector((state) => state.user);
  // const user = userInfo?.data || null;

  // Dummy user for testing - simplified version
  const [dummyUser, setDummyUser] = useState({
    is_seller: false,
    is_staff: false,
    is_superuser: false,
  });

  // Role toggle buttons for testing
  const toggleRole = (role) => {
    setDummyUser((prev) => ({
      // Reset all roles first
      is_seller: false,
      is_staff: false,
      is_superuser: false,
      // Then set the selected role
      [role]: !prev[role],
    }));
  };

  // Determine user roles from dummy user
  const isAdmin = dummyUser.is_superuser || dummyUser.is_staff;
  const isSeller = dummyUser.is_seller;
  const isRegularUser = !isAdmin && !isSeller;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Menu configurations
  const adminMenu = [
    { to: "users", icon: FaUsers, label: "User Management" },
    { to: "orders", icon: FaShoppingCart, label: "Orders" },
    { to: "analytics", icon: FaChartLine, label: "Analytics" },
    { to: "support", icon: FaUserShield, label: "Customer Support" },
  ];

  const sellerMenu = [
    {
      type: "dropdown",
      label: "My Shop",
      icon: FaStore,
      basePath: "shop",
      items: [
        { to: "shop-products", icon: FaBox, label: "Products" },
        { to: "shop-orders", icon: FaShoppingBag, label: "Orders" },
      ],
    },
    { to: "chat", icon: FaCommentDots, label: "Chat" },
    { to: "reviews", icon: FaStar, label: "Reviews" },
    { to: "support", icon: FaUserShield, label: "Customer Support" },
  ];

  const userMenu = [
    { to: "profile", icon: FaUser, label: "My Profile" },
    { to: "change-password", icon: FaLock, label: "My Password" },
    { to: "orders", icon: FaShoppingCart, label: "Orders" },
    { to: "chat", icon: FaCommentDots, label: "Chat" },
    { to: "wishlist", icon: FaHeart, label: "My Wishlist" },
    { to: "support", icon: FaUserShield, label: "Customer Support" },
  ];

  const renderMenuItems = (items) => {
    return items.map((item, index) => {
      if (item.type === "dropdown") {
        return (
          <SidebarDropdown
            key={index}
            label={item.label}
            icon={item.icon}
            basePath={item.basePath}
            userRole={isAdmin ? "admin" : isSeller ? "seller" : "user"}
          >
            {item.items.map((subItem, subIndex) => (
              <SidebarLink
                key={subIndex}
                to={subItem.to}
                icon={subItem.icon}
                label={subItem.label}
                onClick={onLinkClick}
                userRole={isAdmin ? "admin" : isSeller ? "seller" : "user"}
              />
            ))}
          </SidebarDropdown>
        );
      }
      return (
        <SidebarLink
          key={index}
          to={item.to}
          icon={item.icon}
          label={item.label}
          onClick={onLinkClick}
          userRole={isAdmin ? "admin" : isSeller ? "seller" : "user"}
        />
      );
    });
  };

  return (
    <aside
      className={`fixed xl:static xl:mt-3 top-0 mt-0 left-0 z-50 bg-primary-900 shadow-lg transform transition-transform duration-300
        w-64 xl:w-52 py-6 rounded-md px-2 flex flex-col justify-between
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
    >
      {/* Role toggle buttons for testing - remove in production */}
      <div className="flex flex-wrap gap-2 p-2 bg-primary-800 mb-4 rounded">
        <button
          onClick={() => toggleRole("is_superuser")}
          className={`px-2 py-1 text-xs rounded ${
            dummyUser.is_superuser ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => toggleRole("is_staff")}
          className={`px-2 py-1 text-xs rounded ${
            dummyUser.is_staff ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          Staff
        </button>
        <button
          onClick={() => toggleRole("is_seller")}
          className={`px-2 py-1 text-xs rounded ${
            dummyUser.is_seller ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          Seller
        </button>
      </div>

      <div className="flex-1 overflow-y-auto w-full">
        <div className="w-full flex flex-col items-center gap-4">
          {/* Show Dashboard only for admin/seller */}
          {(isAdmin || isSeller) && (
            <SidebarLink
              to=""
              icon={FaRegChartBar}
              label="Dashboard"
              onClick={onLinkClick}
              userRole={isAdmin ? "admin" : "seller"}
            />
          )}

          <SidebarSection>
            {/* Show menu based on role */}
            {isAdmin && renderMenuItems(adminMenu)}
            {isSeller && renderMenuItems(sellerMenu)}
            {isRegularUser && renderMenuItems(userMenu)}
          </SidebarSection>
        </div>
      </div>

      {/* Footer section with common links */}
      <div className="w-full flex flex-col gap-2 pt-4 border-t border-primary-700">
        <Link
          to="/"
          className="w-full px-2 py-2 flex items-center gap-4 hover:bg-primary-800 rounded-sm"
        >
          <FaGlobe className="text-white" size={16} />
          <span className="text-white text-sm font-bold font-nunito">
            Back to Website
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full px-2 py-2 flex items-center gap-4 hover:bg-primary-800 rounded-sm text-error"
        >
          <FaSignOutAlt size={16} />
          <span className="text-sm font-bold font-nunito">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

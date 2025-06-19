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
  FaBox,
  FaStore,
  FaUsers,
  FaListAlt,
  FaChartLine,
  FaFileAlt,
  FaShieldAlt,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";
import SidebarLink from "./SidebarLink";
import SidebarDropdown from "./SidebarDropdown";
import SidebarSection from "./SidebarSection";
import { mockProductReviews } from "../../../data/mockReview";
import { mockProducts } from "../../../data/mockProducts";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    setUser({
      isLoggedIn: true,
      userRole: "seller", 
    });
  }, []);

  return { user };
};

const Sidebar = ({ sidebarOpen, onLinkClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalReviews = mockProductReviews.reduce(
    (acc, p) => acc + p.reviewCount,
    0
  );
  const totalProducts = mockProducts.length;

  const handleLogout = () => {
    
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <aside
      className={`fixed xl:static xl:mt-3 top-0 mt-0 left-0 z-50 bg-primary-900 shadow-lg transform transition-transform duration-300
        w-64 xl:w-52  py-6 rounded-md px-2 flex flex-col justify-between
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
    >
      <div className="flex-1 overflow-y-auto w-full">
        <div className="w-full flex flex-col items-center gap-4">
          <SidebarLink
            to=""
            icon={FaRegChartBar}
            label="Dashboard"
            onClick={onLinkClick}
            userRole={user?.userRole}
          />

          <SidebarSection>
            {user?.userRole === "admin" ? (
              <>
                {/* Admin-specific menu items */}
                <SidebarLink
                  to="users"
                  icon={FaUsers}
                  label="User Management"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="product-listing"
                  icon={FaListAlt}
                  label="Product Listing"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="orders"
                  icon={FaShoppingCart}
                  label="Orders"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="analytics"
                  icon={FaChartLine}
                  label="Analytics"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="content-management"
                  icon={FaFileAlt}
                  label="Content Management"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="audit-logs"
                  icon={FaFileAlt}
                  label="Audit Logs"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="role-management"
                  icon={FaUserCog}
                  label="Role Management"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="security-logs"
                  icon={FaShieldAlt}
                  label="Security Logs"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
              </>
            ) : user?.userRole === "seller" ? (
              <>
                {/* Seller-specific menu items */}
                <SidebarDropdown
                  label="My Shop"
                  icon={FaShoppingCart}
                  basePath="shop"
                  userRole={user?.userRole}
                >
                  <SidebarLink
                    to="shop-products"
                    icon={FaBox}
                    label="Products"
                    badge={totalProducts}
                    onClick={onLinkClick}
                    userRole={user?.userRole}
                  />
                  <SidebarLink
                    to="shop-orders"
                    icon={FaStore}
                    label="Orders"
                    onClick={onLinkClick}
                    userRole={user?.userRole}
                  />
                </SidebarDropdown>
                <SidebarLink
                  to="chat"
                  icon={FaCommentDots}
                  label="Chat"
                  badge={2}
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="sales"
                  icon={FaRegChartBar}
                  label="Sales"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="reviews"
                  icon={FaStar}
                  label="Reviews"
                  badge={totalReviews}
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
              </>
            ) : (
              <>
                {/* Buyer/default menu items */}
                <SidebarLink
                  to="orders"
                  icon={FaShoppingCart}
                  label="Orders"
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
                <SidebarLink
                  to="chat"
                  icon={FaCommentDots}
                  label="Chat"
                  badge={2}
                  onClick={onLinkClick}
                  userRole={user?.userRole}
                />
              </>
            )}

            {/* Common menu items for all roles */}
            <SidebarLink
              to="support"
              icon={FaUserShield}
              label="Customer Support"
              onClick={onLinkClick}
              userRole={user?.userRole}
            />

            <SidebarDropdown
              label="Settings"
              icon={FaCog}
              basePath="settings"
              userRole={user?.userRole}
            >
              <SidebarLink
                to="account-settings"
                icon={FaUser}
                label="Account"
                onClick={onLinkClick}
                userRole={user?.userRole}
              />
              <SidebarLink
                to="notifications"
                icon={FaBell}
                label="Notifications"
                onClick={onLinkClick}
                userRole={user?.userRole}
              />
            </SidebarDropdown>
          </SidebarSection>
        </div>
      </div>

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

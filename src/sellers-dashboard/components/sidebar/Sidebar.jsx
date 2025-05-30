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
} from "react-icons/fa";
import SidebarLink from "./SidebarLink";
import SidebarDropdown from "./SidebarDropdown";
import SidebarSection from "./SidebarSection";
import { mockProductReviews } from "../../../data/mockReview";
import { mockProducts } from "../../../data/mockProducts";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      isLoggedIn: true,
      userRole: "buyer", 
    });
  }, []);

  return { user };
};

const Sidebar = ({ sidebarOpen, onLinkClick }) => {
  const { user } = useAuth();
  const totalReviews = mockProductReviews.reduce(
    (acc, p) => acc + p.reviewCount,
    0
  );
  const totalProducts = mockProducts.length;

  return (
    <aside
      className={`fixed xl:static xl:mt-3 top-0 mt-0 left-0 z-50 bg-primary-900 shadow-lg transform transition-transform duration-300
        w-64 xl:w-52 h-screen py-6 px-2 rounded-md flex flex-col justify-between items-center
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
    >
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="w-full flex flex-col items-center gap-4">
          <SidebarLink
            to=""
            icon={FaRegChartBar}
            label="Dashboard"
            onClick={onLinkClick}
          />

          <SidebarSection>
            
            {user?.userRole === "seller" ? (
              <>
                <SidebarDropdown
                  label="My Shop"
                  icon={FaShoppingCart}
                  basePath="shop"
                >
                  <SidebarLink
                    to="shop-products"
                    icon={FaBox}
                    label="Products"
                    badge={totalProducts}
                    onClick={onLinkClick}
                  />
                  <SidebarLink
                    to="shop-orders"
                    icon={FaStore}
                    label="Orders"
                    onClick={onLinkClick}
                  />
                </SidebarDropdown>

                <SidebarLink
                  to="chat"
                  icon={FaCommentDots}
                  label="Chat"
                  badge={2}
                  onClick={onLinkClick}
                />
                <SidebarLink
                  to="sales"
                  icon={FaRegChartBar}
                  label="Sales"
                  onClick={onLinkClick}
                />
                <SidebarLink
                  to="reviews"
                  icon={FaStar}
                  label="Reviews"
                  badge={totalReviews}
                  onClick={onLinkClick}
                />
              </>
            ) : (
              <>
                <SidebarLink
                  to="order"
                  icon={FaShoppingCart}
                  label="Order"
                  onClick={onLinkClick}
                />
                <SidebarLink
                  to="chat"
                  icon={FaCommentDots}
                  label="Chat"
                  badge={2}
                  onClick={onLinkClick}
                />
              </>
            )}
            <SidebarLink
              to="support"
              icon={FaUserShield}
              label="Customer Support"
              onClick={onLinkClick}
            />

            <SidebarDropdown label="Settings" icon={FaCog} basePath="settings">
              <SidebarLink
                to="account-settings"
                icon={FaUser}
                label="Account"
                onClick={onLinkClick}
              />
              <SidebarLink
                to="notifications"
                icon={FaBell}
                label="Notifications"
                onClick={onLinkClick}
              />
            </SidebarDropdown>
          </SidebarSection>
        </div>

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

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

const Sidebar = ({ sidebarOpen }) => {
  const totalReviews = mockProductReviews.reduce(
    (acc, p) => acc + p.reviewCount,
    0
  );
  const totalProducts = mockProducts.length;

  return (
    <aside
      className={`fixed xl:static mt-4 h-screen left-0 z-50 bg-primary-900 shadow-lg transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 xl:w-52 py-4 rounded flex flex-col justify-between items-center`}
    >
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="w-full flex flex-col items-center gap-4">
          <SidebarLink to="" icon={FaRegChartBar} label="Dashboard" />
          <SidebarSection>
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
              />
              <SidebarLink to="shop-orders" icon={FaStore} label="Orders" />
            </SidebarDropdown>

            <SidebarLink
              to="chat"
              icon={FaCommentDots}
              label="Chat"
              badge={2}
            />
            <SidebarLink to="sales" icon={FaRegChartBar} label="Sales" />
            <SidebarLink
              to="reviews"
              icon={FaStar}
              label="Reviews"
              badge={totalReviews}
            />
            <SidebarLink
              to="support"
              icon={FaUserShield}
              label="Customer Support"
            />

            <SidebarDropdown label="Settings" icon={FaCog} basePath="settings">
              <SidebarLink
                to="account-settings"
                icon={FaUser}
                label="Account"
              />
              <SidebarLink
                to="notifications"
                icon={FaBell}
                label="Notifications"
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

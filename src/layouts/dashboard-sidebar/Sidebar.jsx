import { Link, useNavigate } from "react-router-dom";
import SidebarDropdown from "./SidebarDropdown";
import SidebarLink from "./SidebarLink";
import SidebarSection from "./SidebarSection";
import { FaGlobe, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Sidebar = ({ sidebarOpen, onLinkClick, navItems = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const user = userInfo?.data;

  //check if yhere is a user
  useEffect(() => {
    if (!user) {
      toast.error("Login to view dashboard");
      navigate("/signin");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };

  const renderMenuItems = (items) =>
    items.map((item, index) =>
      item.type === "dropdown" ? (
        <SidebarDropdown
          key={index}
          label={item.label}
          icon={item.icon}
          basePath={item.basePath}
        >
          {item.items.map((subItem, subIndex) => (
            <SidebarLink
              key={subIndex}
              to={subItem.to}
              icon={subItem.icon}
              label={subItem.label}
              onClick={onLinkClick}
            />
          ))}
        </SidebarDropdown>
      ) : (
        <SidebarLink
          key={index}
          to={item.to}
          icon={item.icon}
          label={item.label}
          onClick={onLinkClick}
        />
      )
    );

  return (
    <aside
      className={`fixed xl:static h-full top-0 left-0 z-50 bg-primary-900 shadow-lg transform transition-transform duration-300
        w-64 xl:w-52 px-2 flex flex-col
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="w-full flex flex-col items-center gap-4">
          <SidebarSection>{renderMenuItems(navItems)}</SidebarSection>
        </div>
        <div className="w-full flex flex-col gap-2 py-4 mt-6 border-t border-primary-700 bg-primary-900">
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
            className="w-full px-2 py-2 cursor-pointer flex items-center gap-4 hover:bg-primary-800 rounded-sm text-error"
          >
            <FaSignOutAlt size={16} />
            <span className="text-sm font-bold font-nunito">Logout</span>
          </button>
        </div>
      </div>

      {/* Sticky footer section */}
    </aside>
  );
};

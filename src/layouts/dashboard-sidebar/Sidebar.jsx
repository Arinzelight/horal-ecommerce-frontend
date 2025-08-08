import { Link, useNavigate } from "react-router-dom";
import SidebarDropdown from "./SidebarDropdown";
import SidebarLink from "./SidebarLink";
import SidebarSection from "./SidebarSection";
import { FaGlobe, FaSignOutAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Logo from "../../assets/images/Horal-Logo.png";

export const Sidebar = ({
  sidebarOpen,
  onLinkClick,
  navItems = [],
  onToggleSidebar,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const user = userInfo?.data;

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
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full "
      } xl:translate-x-0
      fixed xl:static top-0 left-0 z-50 xl:z-auto h-screen
      w-64 xl:w-56 min-w-0 flex-shrink-0 flex flex-col justify-between
      bg-primary-900 shadow-xl border-r border-gray-500
      transform transition-transform duration-300`}
    >
      {/* Top section with logo */}
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-primary-800">
          <Link to="/sellers-dashboard" onClick={onLinkClick}>
            <img
              src={Logo}
              alt="Horal Logo"
              className="h-10 w-auto max-w-full object-contain"
            />
          </Link>
          <button
            onClick={onToggleSidebar}
            className="xl:hidden text-white p-1 rounded hover:bg-white/10"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Scrollable nav section */}
        <div className="overflow-y-auto p-4 space-y-2 max-h-[calc(100vh-180px)]">
          <SidebarSection>{renderMenuItems(navItems)}</SidebarSection>
        </div>
        {/* Fixed bottom section */}
        <div className="border-t border-primary-800 p-4 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
          >
            <FaGlobe size={16} />
            <span className="text-sm font-medium">Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <FaSignOutAlt size={16} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

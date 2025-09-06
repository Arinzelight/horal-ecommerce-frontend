import Logo from "../assets/images/Horal-Logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import avatar1 from "../assets/icons/avatar1.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardHeader = ({ onToggleSidebar, sidebarOpen }) => {
  const userInfo = useSelector((state) => state.user?.userInfo?.data);

  return (
    <header
      className="fixed top-0  left-0 right-0 lg:z-50 z-10 rounded 
      h-15  sm:px-6 px-4
      bg-primary-900 backdrop-blur-md shadow-lg 
      flex items-center justify-between"
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Menu button (mobile only) */}
        <button
          onClick={onToggleSidebar}
          className="w-9 h-9 bg-white/10 hover:bg-white/20 xl:hidden rounded-lg flex justify-center items-center transition-all duration-300"
        >
          <HiOutlineMenuAlt3
            className={`text-white transition-transform duration-300 ${
              sidebarOpen ? "rotate-90" : ""
            }`}
            size={20}
          />
        </button>

        {/* Logo for mobile only */}
        <Link to="/sellers-dashboard">
          <img
            src={Logo}
            alt="Horal Logo"
            className="h-8 w-auto object-contain sm:hidden"
          />
        </Link>

        {/* Page title */}
        <h1 className="text-white sm:text-xl text-base font-bold sm:block hidden">
          Seller's Dashboard
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center cursor-pointer bg-white text-black px-3 py-1.5 rounded-full text-sm">
          {userInfo?.full_name ? (
            <span className="text-primary-900 font-bold truncate">{`${userInfo.full_name}`}</span>
          ) : (
            <span className="text-primary-900"> Seller</span>
          )}
          {userInfo && (
            <img
              src={avatar1}
              alt="default avatar"
              className="w-6 h-6 rounded-full object-cover ml-2"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

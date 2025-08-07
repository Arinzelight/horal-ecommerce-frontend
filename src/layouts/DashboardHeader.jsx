import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
const DashboardHeader = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <header className="w-full h-15 p-2.5 bg-primary-900  flex items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 p-1 bg-neutral-100 xl:hidden block rounded-xl border border-neutral-200 flex justify-center items-center"
        >
          <HiOutlineMenuAlt3
            className={`text-neutral-900  transition-transform duration-300 ${
              sidebarOpen ? "rotate-270" : "rotate-180"
            }`}
            size={20}
          />
        </button>
        <h1 className="text-white text-lg font-bold font-nunito">Dashboard</h1>
      </div>
    </header>
  );
};

export default DashboardHeader;

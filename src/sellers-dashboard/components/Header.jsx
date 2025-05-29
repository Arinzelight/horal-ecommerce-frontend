import { FaArrowLeft } from "react-icons/fa";

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <header className="w-full h-11 p-2.5 bg-sky-950 xl:rounded rounded-none flex items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="w-6 h-6 p-1 bg-neutral-100 xl:hidden block rounded-xl border border-neutral-200 flex justify-center items-center"
        >
          <FaArrowLeft
            className={`text-neutral-700  transition-transform duration-300 ${
              sidebarOpen ? "rotate-270" : "rotate-180"
            }`}
            size={16}
          />
        </button>
        <h1 className="text-white text-lg font-bold font-nunito">Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;

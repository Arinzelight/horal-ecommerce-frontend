import { FaArrowLeft } from "react-icons/fa";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="w-full h-11 p-2.5 bg-sky-950 rounded flex items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="w-6 h-6 p-1 bg-neutral-100 transform rotate-270   rounded-xl border border-neutral-200 flex justify-center items-center"
        >
          <FaArrowLeft className="text-neutral-700  " size={12} />
        </button>
        <h1 className="text-white text-lg font-bold font-nunito">Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;

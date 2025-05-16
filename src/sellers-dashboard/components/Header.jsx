import { FaArrowLeft } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full h-11 p-2.5 bg-sky-950 rounded flex items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 p-1 bg-neutral-100 rounded-xl border border-neutral-200 flex justify-center items-center">
          <FaArrowLeft
            className="text-neutral-700 transform rotate-180"
            size={12}
          />
        </div>
        <h1 className="text-white text-lg font-bold font-nunito">Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;

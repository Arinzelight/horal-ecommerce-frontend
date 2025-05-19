import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-7 min-h-screen lg:px-15 px-4  bg-neutral-100">
      <Header />
      <main className="flex gap-2  items-start">
        <Sidebar />
        <div className="flex-1 overflow-x-auto ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

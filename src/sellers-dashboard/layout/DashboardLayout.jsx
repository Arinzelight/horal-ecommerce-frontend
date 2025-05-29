import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 relative">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex">
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0  lg:block hidden z-40"
            onClick={toggleSidebar}
          />
        )}

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 overflow-x-auto z-0 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

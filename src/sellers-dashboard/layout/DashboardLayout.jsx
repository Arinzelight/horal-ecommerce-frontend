import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Lock scrolling when sidebar is open (mobile only)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  return (
    <div className="flex flex-col xl:px-13 p-0  bg-neutral-100 relative">
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex relative">
        {/* Overlay for mobile only */}
        {sidebarOpen && (
          <div
            className="fixed inset-0   z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} onLinkClick={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-1  p-4 overflow-x-auto overflow-y-auto z-0 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

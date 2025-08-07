import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sidebar } from "./dashboard-sidebar/Sidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ navItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const basePath = location.pathname.split("/")[1];

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <div className="h-screen flex flex-col bg-neutral-100">
      {/* Header */}
      <DashboardHeader
        onToggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />

      {/* Layout wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          onLinkClick={toggleSidebar}
          navItems={navItems}
          basePath={basePath}
        />

        {/* Main content */}
        <main className="flex-1 w-full overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

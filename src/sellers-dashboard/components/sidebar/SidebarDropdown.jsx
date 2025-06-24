import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarDropdown = ({ label, icon: Icon, children, basePath, userRole }) => {
  const location = useLocation();
  const dashboardBase = userRole === "seller" ? "/sellers-dashboard" : "/profile";
  const fullBasePath = `${dashboardBase}/${basePath}`;


  const isPathActive = location.pathname.includes(fullBasePath) || location.pathname === fullBasePath;
  const [open, setOpen] = useState(isPathActive);

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-2 py-1 rounded-sm flex justify-between items-center hover:bg-primary-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="text-neutral-200" size={16} />
          <span className="text-sm font-bold font-nunito text-neutral-200">
            {label}
          </span>
        </div>
        <span
          className={`text-neutral-200 transform transition-transform ${
            open ? "rotate-0" : "rotate-90"
          }`}
        >
          &#9662;
        </span>
      </button>

      {open && (
        <div className="w-full pl-6 flex flex-col gap-1">{children}</div>
      )}
    </div>
  );
};

export default SidebarDropdown;

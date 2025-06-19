import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, label, badge, onClick, userRole }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  
  const getDashboardBase = () => {
    switch (userRole) {
      case "admin":
        return "/admin";
      case "seller":
        return "/sellers-dashboard";
      default: 
        return "/profile";
    }
  };

  const dashboardBase = getDashboardBase();
  const targetPath = to === "" ? dashboardBase : `${dashboardBase}/${to}`;

  const isActive =
    currentPath === targetPath ||
    (to !== "" && currentPath.startsWith(`${targetPath}`));

  return (
    <Link
      to={targetPath}
      onClick={onClick}
      className={`w-full px-2 py-1 rounded-sm flex items-center justify-between gap-2 transition-colors ${
        isActive ? "bg-neutral-200" : "hover:bg-primary-800"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={isActive ? "text-primary-900" : "text-neutral-200"}
          size={16}
        />
        <span
          className={`text-sm font-bold font-nunito ${
            isActive ? "text-primary-900" : "text-neutral-200"
          }`}
        >
          {label}
        </span>
      </div>
      {badge && (
        <div className="px-2 py-[3px] bg-neutral-200 rounded-full text-primary-900 text-[10px] font-bold font-nunito">
          {badge}
        </div>
      )}
    </Link>
  );
};

export default SidebarLink;

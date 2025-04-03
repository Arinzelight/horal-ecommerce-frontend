import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const location = useLocation();
  const currentUser = "admin";

  return currentUser === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ path: location.pathname }} replace={true} />
  );
};

export default AdminRoute;

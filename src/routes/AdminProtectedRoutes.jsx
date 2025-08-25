import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminProtectedRoutes = () => {
  const location = useLocation();

  const userInfo = useSelector((state) => state.user?.userInfo?.data);

  // if not logged in, or not a seller -> redirect
  if (!userInfo || userInfo.is_staff !== true) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // if seller -> allow access
  return <Outlet />;
};

export default AdminProtectedRoutes;

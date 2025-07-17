import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.userInfo);

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ path: location.pathname }} replace={true} />
  );
};

export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerProtectedRoute = () => {
  const location = useLocation();

  const userInfo = useSelector((state) => state.user?.userInfo?.data);

  // if not logged in, or not a seller -> redirect
  if (!userInfo || userInfo.is_seller !== true) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // if seller -> allow access
  return <Outlet />;
};

export default SellerProtectedRoute;

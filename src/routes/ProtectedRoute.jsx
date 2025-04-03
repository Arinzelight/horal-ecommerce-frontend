import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const currentUser = true;

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate
      to="/sign-in"
      state={{ path: location.pathname }}
      replace={true}
    />
  );
};

export default ProtectedRoute;

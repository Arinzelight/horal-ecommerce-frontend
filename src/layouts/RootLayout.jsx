import React from "react";
import Footer from "./footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";



const RootLayout = () => {
  const location = useLocation();
  const isAuthPage =

    location.pathname === "/login" || location.pathname === "/register";
  

    location.pathname === "/signin" || location.pathname === "/signup";


  return (
    <>
      {/* Conditionally render the Header and Footer based on the route */}
      {!isAuthPage && (
        <div className="sticky top-0 z-30">
          <Header />
        </div>
      )}
      <main>
        <Outlet />
      </main>

      {/* Conditionally render Footer */}
      {!isAuthPage && <Footer />}
    </>
  );
};

export default RootLayout;

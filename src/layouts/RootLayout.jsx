import React from "react";
import Footer from "./footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import LogoutConfirmation from "../components/LogoutConfirmation";
import CategoryTopBar from "../pages/home/CategoryTopBar";

const RootLayout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify-email" ||
    location.pathname === "/account-approval" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/otp-verification" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/password-reset-success";

  return (
    <>
      {/* Conditionally render the Header and Footer based on the route */}
      {!isAuthPage && (
        <>
          <div className="sticky top-0 z-30">
            <Header />
          </div>
        </>
      )}
      <main className={`bg-neutral-50  ${isAuthPage ? "" : "px-2 sm:px-12"}`}>
        <div>
          <CategoryTopBar />
        </div>
        <Outlet />

        <LogoutConfirmation />
      </main>

      {/* Conditionally render Footer */}
      {!isAuthPage && <Footer />}
    </>
  );
};

export default RootLayout;

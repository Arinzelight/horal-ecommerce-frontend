import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import TopBanner from "./header/TopBanner";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <TopBanner />

      <div className="sticky top-0 z-50 ">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

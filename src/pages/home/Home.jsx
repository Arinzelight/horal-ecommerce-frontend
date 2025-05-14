import React from "react";
import Sidebar from "./CategorySidebar";
import Hero from "./Hero";
import useMobile from "../../hooks/use-mobile";
import MovingBanner from "./DownBanner";
import HotProductSection from "./HotProductSection";
import ProductSection from "./ProductSection2";
import HotProductBanner from "./ProductBanner";

const Home = () => {
  const isMobile = useMobile();

  return (
    <>
      <main className="min-h-screen lg:mx-auto">
        {/* Mobile view */}
        {isMobile ? (
          <div className="">
            <div className="relative  mt-6">
              <Hero />
            </div>
            <MovingBanner />
            <Sidebar />
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row gap-3 pt-6">
              <div className="hidden md:block  w-64 md:w-50 lg:w-64 h-[500px] overflow-y-auto  overflow-x-hidden">
                <Sidebar />
              </div>
              <div className="flex-1  h-[500px]">
                <Hero />
              </div>
            </div>
            <div className="">
              <MovingBanner />
            </div>
          </div>
        )}

        {/* Product Sections */}
        <div className="">
          <HotProductSection />
        </div>
        <div className="">
          <HotProductBanner />
        </div>
        <div>
          <ProductSection />
        </div>

        <div className="">
          <HotProductBanner />
        </div>
        <div>
          <ProductSection />
        </div>
      </main>
    </>
  );
};

export default Home;

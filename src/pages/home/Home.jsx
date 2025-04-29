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
      <main className="min-h-screen lg:max-w-6xl lg:mx-auto lg:px-12">
        {/* Mobile view */}
        {isMobile ? (
          <div className="">
            <div className="relative mx-4 mt-6">
              <Hero />
            </div>
            <MovingBanner />
            <Sidebar />
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row gap-6 pt-6">
              <div className="hidden md:block  md:w-64 h-[500px] overflow-y-auto overflow-x-hidden">
                <Sidebar />
              </div>
              <div className="flex-1 -ml-2 h-[500px]">
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

import React from "react";
import Sidebar from "./CategorySidebar";
import Hero from "./Hero";
import useMobile from "../../hooks/use-mobile";
import MovingBanner from "./DownBanner";
import HotProductSection from "./HotProductSection";
import ProductSection from "./ProductSection2";
import HotProductBanner from "./ProductBanner";
// import Hero from "./Hero2";
const Home = () => {
  const isMobile = useMobile();
  return (
    <>
      <main className="min-h-screen">
        {/* Mobile view */}
        {isMobile ? (
          <div className="mx-4">
            <Sidebar />
            <Hero />
          </div>
        ) : (
          <div className="flex flex-col mx-4 md:flex-row gap-6 py-6">
            <div className="md:w-64 h-[500px] overflow-y-auto">
              <Sidebar />
            </div>
            <div className="flex-1 -ml-2 h-[500px]">
              <Hero />
            </div>
          </div>
        )}
        <div className="mx-4">
          <MovingBanner />
        </div>

        {/* Product Section */}
        <div className="mx-4">
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

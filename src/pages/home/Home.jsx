import React, { useEffect } from "react";
import Sidebar from "./CategorySidebar";
import Hero from "./Hero";
import useMobile from "../../hooks/use-mobile";
import MovingBanner from "./DownBanner";
import HotProductSection from "./HotProductSection";
import ProductSection from "./FeaturedProducts";
import HotProductBanner from "./ProductBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/thunks/productThunk";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
  const isMobile = useMobile();

  const dispatch = useDispatch();
  let { products, loading, error } = useSelector((state) => state.products);
  const productList = products.results || {};
  const featuredProducts = productList?.slice(9, 20) || [];
  const topProducts = productList?.slice(0, 8) || [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
          <HotProductSection topProducts={topProducts} />
        </div>
        <div className="">
          <HotProductBanner />
        </div>
        <div>
          <FeaturedProducts featuredProducts={featuredProducts} />
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

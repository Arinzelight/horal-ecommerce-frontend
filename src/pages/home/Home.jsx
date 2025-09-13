import React, { useEffect } from "react";
import Sidebar from "./CategorySidebar";
import Hero from "./Hero";
import useMobile from "../../hooks/use-mobile";
import MovingBanner from "./DownBanner";
import HotProductSection from "./HotProductSection";
import ProductSection from "./FeaturedProducts";
import HotProductBanner from "./ProductBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "../../redux/product/thunks/productThunk";
import { fetchProducts } from "../../redux/product/thunks/productThunk";
import FeaturedProducts from "./FeaturedProducts";
import CategoryTopBar from "./CategoryTopBar";
import RightSideBar from "./RightSideBar";

const Home = () => {
  const isMobile = useMobile();

  const dispatch = useDispatch();
  let { products, loading, error, topProducts, topLoading } = useSelector(
    (state) => state.products
  );

  const productList = Array.isArray(products) ? products : [];
  const top = Array.isArray(topProducts) ? topProducts : [];
  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
    dispatch(fetchTopProducts());
  }, [dispatch]);

  return (
    <>
      <main className="min-h-screen lg:mx-auto">
        {/* Mobile view */}
        {isMobile ? (
          <div className="">
            <div className="relative  sm:mt-6 mt-2">
              <Hero />
            </div>
            <MovingBanner />
            <Sidebar />
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <div className="hidden md:block   min-w-[20%] h-[500px] overflow-y-auto  overflow-x-hidden">
                <Sidebar />
              </div>
              <div className="flex-1  h-[500px]">
                <Hero />
              </div>
              <div className="hidden xl:block   w-[25%]">
                <RightSideBar />
              </div>
            </div>
            <div className="">
              <MovingBanner />
            </div>
          </div>
        )}

        {/* Product Sections */}
        <div className="">
          <FeaturedProducts featuredProducts={productList} loading={loading} />
        </div>

        <div className="">
          <HotProductBanner />
        </div>
        <div>
          <HotProductSection topProducts={top} loading={topLoading} />
        </div>

        {/* <div className="">
          <HotProductBanner />
        </div> */}
        {/* <div>
          <ProductSection />
        </div> */}
      </main>
    </>
  );
};

export default Home;

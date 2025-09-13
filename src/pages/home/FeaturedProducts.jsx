import { FaChevronRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { FadeLoader } from "react-spinners";

import { Link } from "react-router-dom";
import RightSideBar from "./RightSideBar";
import React from "react";

const FeaturedProducts = ({ featuredProducts, loading }) => {
  // One-third point of the products
  const insertIndex = Math.floor(featuredProducts?.length / 3);
  let sidebarInserted = false;

  return (
    <div className="pb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between h-[45px] mb-2 bg-[#0C3555] p-4">
        <h2 className="text-[18px] font-bold text-white">Featured Products</h2>
        <Link to="/products" className="flex text-[14px] items-center text-white">
          See all <FaChevronRight className="ml-1" />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#4A90E2" size={60} speedMultiplier={1} />
        </div>
      ) : featuredProducts?.length === 0 ? (
        <div className="text-center text-gray-500">No products available</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {featuredProducts?.map((product, index) => {
            //  shift by +1 so it appears after the Nth product
            const shouldInsertSidebar =
              !sidebarInserted && index === insertIndex - 1;

            return (
              <React.Fragment key={product.id}>
                <ProductCard product={product} />

                {shouldInsertSidebar && (
                  <div className="col-span-2 block sm:hidden">
                    <RightSideBar />
                  </div>
                )}

                {shouldInsertSidebar && (sidebarInserted = true)}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;

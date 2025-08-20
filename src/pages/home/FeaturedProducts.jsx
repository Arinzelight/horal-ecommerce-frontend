import { FaChevronRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import InitialLoader from "../../components/Loader";
import { FadeLoader } from "react-spinners";
const FeaturedProducts = ({ featuredProducts, loading }) => {
  return (
    <div className="pb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between h-[45px] mb-2 bg-[#0C3555] p-4">
        <h2 className="text-[18px] font-bold text-white">Featured Products</h2>
        {/* <button className="flex text-[14px] items-center text-white">
          See all <FaChevronRight className="ml-1" />
        </button> */}
      </div>

      {loading ? (
        <div className="flex justify-center items-center  ">
              <FadeLoader color="#4A90E2" size={60} speedMultiplier={1} />
            </div>
      ) : featuredProducts?.length === 0 ? (
      
        <div className="text-center text-gray-500">No products available</div>
      ) : (
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {featuredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;

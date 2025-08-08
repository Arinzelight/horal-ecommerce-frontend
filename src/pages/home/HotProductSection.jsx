import { FaChevronRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import useMobile from "../../hooks/use-mobile";
import InitialLoader from "../../components/Loader";
import { FadeLoader } from "react-spinners";
const HotProductSection = ({ topProducts, loading }) => {
  const isMobile = useMobile();

  return (
    <div className="pb-4 pt-4">
      {/* Section Header */}
      <div className="flex items-center justify-between h-[45px] mb-2 bg-[#0C3555] p-4">
        <h2 className="text-[18px] font-bold text-white">
          Top Selling Products
        </h2>
        <button className="flex text-[14px] items-center text-white">
          See all <FaChevronRight className="ml-1" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center  ">
          <FadeLoader color="#4A90E2" size={60} speedMultiplier={1} />
        </div>
      ) : (
        <>
          {topProducts.length === 0 ? (
            <div className="col-span-2 md:col-span-4 text-center">
              <p className="text-gray-500">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HotProductSection;

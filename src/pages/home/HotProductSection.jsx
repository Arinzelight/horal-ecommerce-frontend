import { FaChevronRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import useMobile from "../../hooks/use-mobile";

const HotProductSection = ({ products = {} }) => {
  const isMobile = useMobile();

  console.log("HotProductSection products:", products);

  // Extract the results array from the products object
  const productsList = products.results || [];

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

      {/* Product Grid */}
      {productsList.length === 0 && (
        <div className="col-span-2 md:col-span-4 text-center">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {productsList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HotProductSection;

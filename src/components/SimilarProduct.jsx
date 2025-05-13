import { DiVim } from "react-icons/di";
import ProductCard from "./ProductCard"
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SimilarProducts({ products, title, link }) {
  return (
    <div className="mt-12">
      <div className="flex justify-between items-end border-b-[1.50px] border-neutral-400 ">
        <h2 className="text-neutral-900 text-xl font-bold">
          {title}
        </h2>
        {link && (<Link
          to={link}
          className="text-primary-500 hover:text-blue-600 flex items-center gap-1 w-fit pb-1"
        >
          See all <FaChevronRight size={16} />
        </Link>
        )}
        
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

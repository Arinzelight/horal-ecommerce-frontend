import { useState } from "react";
import { FaFire, FaHeart, FaShoppingCart, FaCheck } from "react-icons/fa";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-t-sm hover:shadow-md transition-shadow">
      {/* Product Image with Overlays */}
      <div className="relative">
        <div className="aspect-square relative">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        {/* Wishlist and Cart Icons */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 left-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaHeart
            className={isWishlisted ? "text-red-500" : "text-gray-400"}
          />
        </button>

        <button className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
          <FaShoppingCart className="text-blue-500" />
        </button>

        {/* Hot Label */}
        {product.isHot && (
          <div className="absolute  top-1  left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex items-center bg-red-500 text-white px-1 -py-1  rounded-full shadow-lg">
              <span className="font-bold  text-[8px] whitespace-nowrap">
                Hot Price
              </span>
              <FaFire className="text-yellow-300" />
            </div>
          </div>
        )}

        {/* Verified Badge */}
        {product.isVerified && (
          <div className="absolute bottom-2 right-2 bg-primary-900 text-white px-3 py-1 rounded-full flex items-center text-xs">
            <FaCheck className="mr-1" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3">
        <div className="text-primary font-bold mb-1">
          ₦{" "}
          {product?.price?.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
          })}
        </div>

        <h3 className="font-medium text-[#333333] text-sm mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-primary-900 text-[10px] whitespace-nowrap">
            {product.location} {" ,"} {product.localGvt}
          </span>
          <div className="flex items-center text-orange-500">
            <span className="text-xs">★</span>
            <span className="text-xs ml-1">{product.rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <span className="bg-blue-100 text-primary-900 text-[10px] px-2 py-1 rounded-md whitespace-nowrap">
              {product.condition}
            </span>
            <span className="bg-blue-100 text-primary-900 text-[10px] px-2 py-1 rounded-md whitespace-nowrap">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

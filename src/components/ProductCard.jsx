import React, { useState } from "react";
import { FaFire, FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { addToCartUniversal } from "../redux/cart/thunk/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Improved cart item finding logic
  const cartItem = items.find((item) => {
    // Handle API response structure (nested product)
    if (item.product?.id) {
      return item.product.id === product.id;
    }
    // Handle local cart structure (direct product_id)
    if (item.product_id) {
      return item.product_id === product.id;
    }
    return false;
  });

  // Get the quantity if the product is in cart
  const quantityInCart = cartItem?.quantity || 0;
  const isInCart = quantityInCart > 0;

  const toggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      console.log("Adding product to cart:", product.id);
      console.log("User authenticated:", !!userInfo);

      // Get the default variant if available
      const defaultVariant = product.variants_details?.[0];

      const result = await dispatch(
        addToCartUniversal({
          product_id: product.id,
          quantity: 1,
          price: product.price,
          product: product,
         
          ...(defaultVariant?.color && { color: defaultVariant.color }),
          ...(defaultVariant?.standard_size && {
            standard_size: defaultVariant.standard_size,
          }),
          ...(defaultVariant?.custom_size_unit && {
            custom_size_unit: defaultVariant.custom_size_unit,
          }),
          ...(defaultVariant?.custom_size_value && {
            custom_size_value: defaultVariant.custom_size_value,
          }),
        })
      ).unwrap();

      console.log("Successfully added to cart:", result);
      toast.success(result.message || "Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(
        error.message || "Failed to add item to cart. Please try again."
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const placeholderImg =
    "https://ui-avatars.com/api/?name=Image&background=cccccc&color=ffffff&size=400";

  return (
    <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative">
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image with Overlays */}
        <div className="relative">
          <div className="aspect-square relative overflow-hidden ">
            <img
              src={placeholderImg || product.images?.[0]?.url}
              alt={product.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Hot Label */}
          {product.isHot && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center bg-red-500 text-white px-2 py-1 rounded-full shadow-lg">
                <span className="font-bold text-[8px] whitespace-nowrap">
                  Hot Price
                </span>
                <FaFire className="text-white ml-1" size={10} />
              </div>
            </div>
          )}

          {/* Verified Badge */}
          {product.isVerified && (
            <div className="absolute bottom-2 right-2 bg-primary-900 text-white px-2 py-1 rounded-full flex items-center text-xs shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="mr-1"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12.438 1.248c4.27 0 7.75 3.48 7.75 7.75c0 2.48-1.18 4.69-3 6.11v5.4c0 1.03 0 1.78-.69 2.12c-.17.08-.33.12-.49.12c-.5 0-.99-.36-1.61-.83l-1.21-.91l-.091-.067c-.283-.211-.57-.424-.66-.433c-.09.01-.376.222-.659.433l-.09.067l-1.2.9l-.027.02c-.816.61-1.4 1.046-2.084.7c-.69-.34-.69-1.09-.69-2.12v-5.4c-1.82-1.42-3-3.63-3-6.11c0-4.27 3.48-7.75 7.75-7.75"
                />
              </svg>
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-3">
          <div className="text-primary font-bold  mb-1">
            ₦{parseFloat(product?.price || 0).toLocaleString("en-NG")}
          </div>

          <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px]">
            {product.title}
          </h3>

          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 text-[10px]">
              {product.state}
              {product.local_govt ? `, ${product.local_govt}` : ""}
            </span>
            {product.rating && (
              <div className="flex items-center text-yellow-500">
                <FaStar size={12} />
                <span className="text-xs ml-1 text-gray-600">
                  {product.rating}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between ">
            {product.condition && (
              <span className="capitalize  text-primary-900 text-[10px] p-0.5 rounded-md">
                {product.condition.replace("_", " ")}
              </span>
            )}
            {product.category_object && (
              <span className=" text-primary-900 text-[10px] p-0.5 rounded-md capitalize text-center">
                {product.category_object.category.name}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <button
        onClick={toggleWishlist}
        className={`absolute top-3 left-3 p-2 rounded-full transition-all duration-200 shadow-lg z-20 ${
          isWishlisted ? "bg-primary text-white" : "bg-white text-primary"
        }`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
      </button>

      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className={`absolute top-3 right-3 flex items-center justify-center p-2 rounded-full transition-all duration-200 shadow-lg z-20 ${
          isInCart
            ? "bg-primary text-white"
            : "bg-white text-primary hover:bg-primary hover:text-white"
        } ${isAddingToCart ? "opacity-75 cursor-not-allowed" : ""}`}
        aria-label={isInCart ? "Item in cart" : "Add to cart"}
      >
        {isAddingToCart ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
        ) : isInCart ? (
          <div className="flex items-center">
            <HiShoppingCart size={16} />
            <span className="absolute -top-1 -right-1 text-xs font-bold ml-1 bg-white text-primary rounded-full w-4 h-4 flex items-center justify-center">
              {quantityInCart}
            </span>
          </div>
        ) : (
          <HiOutlineShoppingCart size={16} />
        )}
      </button>
    </div>
  );
}
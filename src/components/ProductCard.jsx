import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/wishlistThunk";
import { useState } from "react";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const {
    isInCart,
    getCartItem,
    addItemToCart,
    removeItemFromCart,
    
  } = useCart();
  const { data: wishlistData } = useSelector((state) => state.wishlist);
  const cartItem = getCartItem(product.id);
  const inCart = isInCart(product.id);
  
  const isWishlisted = wishlistData?.items?.some(
    (item) => item.product?.id === product.id
  );

  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsWishlistLoading(true);
      if (isWishlisted) {
        const wishlistItem = wishlistData.items.find(
          (item) => item.product?.id === product.id
        );
        if (wishlistItem) {
          await dispatch(
            removeFromWishlist({ item_id: wishlistItem.id })
          ).unwrap();
          toast.success("Removed from wishlist");
        }
      } else {
        await dispatch(addToWishlist({ product_id: product.id })).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error("Error updating wishlist");

    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsCartLoading(true);
      if (isCartLoading) return; 
      if (inCart) {
        await removeItemFromCart(cartItem.id);
        toast.success("Removed from cart");
      } else {
        await addItemToCart(product.id);
        toast.success("Added to cart");
      }
    } catch (err) {
      console.error("Cart error:", err);
      toast.error(err.message || "Error updating cart");
    } finally {
      setIsCartLoading(false);
    }
  };

  const placeholderImg =
    "https://ui-avatars.com/api/?name=Image&background=cccccc&color=ffffff&size=400";

  return (
    <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative">
          <div className="aspect-square relative">
            <img
              src={placeholderImg || product.images?.[0]?.url}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>

          {product.isHot && (
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center bg-red-500 text-white px-1 py-0.5 rounded-full shadow-lg">
                <span className="font-bold text-[8px]">Hot Price</span>
              </div>
            </div>
          )}

          {product.isVerified && (
            <div className="absolute bottom-2 right-2 bg-primary-900 text-white px-2 py-1 rounded-full flex items-center text-xs">
              <span>Verified</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="text-primary font-bold mb-1">
            ₦
            {product?.price?.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
            })}
          </div>

          <h3 className="font-medium text-[#333333] text-sm mb-1 line-clamp-2 md:line-clamp-1">
            {product.title}
          </h3>

          <div className="flex justify-between items-center mb-2">
            <span className="text-primary-900 text-[10px] line-clamp-1">
              {product.state}, {product.local_govt}
            </span>
            {product.rating && (
              <div className="flex items-center text-secondary text-xs">
                <FaStar className="fill-secondary" size={12} />
                <span className="ml-1">{product.rating}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {product.condition && (
              <span className="bg-primary-50 capitalize text-primary-900 text-[10px] px-1 py-1 rounded-sm text-center">
                {product.condition.replace("_", " ")}
              </span>
            )}
            {product.category_object && (
              <span className="hidden md:block bg-primary-100 text-primary-900 capitalize text-[10px] px-1 py-1 rounded-md text-center">
                {product.category_object.category.name}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={handleWishlistToggle}
        disabled={isWishlistLoading}
        className={`absolute top-2 left-2 p-2 rounded-full z-10 transition-colors shadow-lg ${
          isWishlisted ? "bg-primary" : "bg-white"
        } ${isWishlistLoading ? "opacity-75 cursor-not-allowed" : ""}`}
        aria-label="Toggle wishlist"
      >
        {isWishlistLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-primary"></div>
        ) : isWishlisted ? (
          <FaHeart className="text-white" />
        ) : (
          <FaRegHeart className="text-primary" />
        )}
      </button>

      <button
        onClick={handleAddToCart}
        disabled={isCartLoading}
        className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-colors shadow-lg ${
          inCart ? "bg-primary" : "bg-white"
        } ${isCartLoading ? "opacity-75 cursor-not-allowed" : ""}`}
        aria-label="Add to cart"
      >
        {isCartLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-primary"></div>
        ) : inCart ? (
          <HiShoppingCart className="text-white" />
        ) : (
          <HiOutlineShoppingCart className="text-primary" />
        )}
      </button>
    </div>
  );
}

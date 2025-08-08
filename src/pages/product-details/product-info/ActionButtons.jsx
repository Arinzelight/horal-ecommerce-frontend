import { FaSpinner } from "react-icons/fa";

export default function ActionButtons({
  itemInCart,
  isProcessing,
  cartLoading,
  currentVariant,
  isWishlisted,
  isWishlistLoading,
  onCartAction,
  onWishlistAction,
}) {
  return (
    <div className="flex mt-8 flex-col sm:flex-row gap-3 mb-8">
      <button
        onClick={onCartAction}
        disabled={
          isProcessing ||
          cartLoading ||
          (currentVariant && currentVariant.stock_quantity <= 0)
        }
        className={`text-sm flex-1 py-3 rounded-md font-medium transition-colors flex items-center justify-center ${
          itemInCart
            ? "bg-secondary hover:opacity-85 text-white"
            : "bg-secondary hover:opacity-85 text-white"
        } ${
          isProcessing ||
          cartLoading ||
          (currentVariant && currentVariant.stock_quantity <= 0)
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        aria-label={itemInCart ? "Remove from cart" : "Add to cart"}
      >
        {isProcessing || cartLoading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            {itemInCart ? "Removing..." : "Adding..."}
          </>
        ) : itemInCart ? (
          "Remove from Cart"
        ) : (
          "Add to Cart"
        )}
      </button>

      <button
        onClick={onWishlistAction}
        disabled={isWishlistLoading}
        className="text-sm flex-1 text-orange border border-secondary cursor-pointer text-secondary hover:border-gray-400 py-3 rounded-md font-medium transition-colors"
        aria-label="Add to wishlist"
      >
        {isWishlistLoading ? (
          <>{isWishlisted ? "Removing..." : "Adding..."}</>
        ) : isWishlisted ? (
          "Remove from Wishlist"
        ) : (
          "Add to Wishlist"
        )}
      </button>
    </div>
  );
}
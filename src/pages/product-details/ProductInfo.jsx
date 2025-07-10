import { useState, useEffect, useMemo } from "react";
import {
  FaCheck,
  FaPlusCircle,
  FaMinusCircle,
  FaSpinner,
} from "react-icons/fa";
import { getColorClass } from "../../utils/color-class";
import StarRating from "../../utils/star-rating";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/wishlist/wishlistThunk";

export default function ProductInfo({
  name,
  category,
  rating,
  reviews,
  price,
  variants = [],
  productId,
}) {

  // Extract unique colors and sizes from variants (memoized to prevent recreation)
  const availableColors = useMemo(() => {
    const colors = [...new Set(variants.map((v) => v.color))].filter(Boolean);
    return colors;
  }, [variants]);

  const availableSizes = useMemo(() => {
    const sizes = [...new Set(variants.map((v) => v.standard_size))].filter(
      Boolean
    );
    return sizes;
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  // Cart hook
  const {
    isInCart,
    getCartItem,
    getProductCartItems,
    toggleCartItem,
    removeItemFromCart,
    isLoading: cartLoading,
    error: cartError,
  } = useCart();

  const { data: wishlistData } = useSelector((state) => state.wishlist);

  const isWishlisted = wishlistData?.items?.some(
    (item) => item.product?.id === productId
  );

  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  // Get all cart items for this product
  const allProductCartItems = getProductCartItems(productId);

  // Get current variant based on selections
  const currentVariant = variants.find(
    (v) => v.color === selectedColor && v.standard_size === selectedSize
  );

  // Display price (use override if available)
  const displayPrice = currentVariant?.price_override || price;

  // Check if current configuration is in cart
  const itemInCart = isInCart(productId, selectedColor, selectedSize);
  const cartItem = getCartItem(productId, selectedColor, selectedSize);


  // Initialize state from cart item if product is already in cart 
  useEffect(() => {

    if (allProductCartItems.length > 0) {
      // If there's only one cart item for this product, use its variant details
      if (allProductCartItems.length === 1) {
        const cartItem = allProductCartItems[0];
        const cartColor =
          cartItem.user_selected_variant?.color || cartItem.color;
        const cartSize =
          cartItem.user_selected_variant?.custom_size ||
          cartItem.user_selected_variant?.standard_size ||
          cartItem.standard_size;

        if (cartColor && availableColors.includes(cartColor)) {
          setSelectedColor(cartColor);
        }
        if (cartSize && availableSizes.includes(cartSize)) {
          setSelectedSize(cartSize);
        }
        setQuantity(cartItem.quantity || 1);
      } else {
        // Multiple variants in cart - keep null selections to force user choice
        console.log("🎯 Multiple variants in cart");
      }
    } else {
      // No items in cart, keep null selections
      console.log("🎯 No items in cart, keeping null selections");
    }
  }, [productId]); // Only depend on productId to run once per product

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);

    // Reset size if the selected color doesn't have the current size
    if (
      selectedSize &&
      !variants.some(
        (v) => v.color === color && v.standard_size === selectedSize
      )
    ) {
      const firstAvailableSize = variants.find(
        (v) => v.color === color
      )?.standard_size;
      setSelectedSize(firstAvailableSize || null);
    }
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    console.log("📏 Size selected:", size);
    setSelectedSize(size);
  };

  // Handle quantity increment
  const incrementQuantity = () => {
    
    setQuantity((prev) => prev + 1);
  };

  // Handle quantity decrement
  const decrementQuantity = () => {
    if (quantity > 1) {
      
      setQuantity((prev) => prev - 1);
    }
  };

  // Handle add to cart / remove from cart
  const handleCartAction = async () => {

    // For remove action, if item is in cart, remove it
    if (itemInCart && cartItem) {
      setIsProcessing(true);

      try {
        await removeItemFromCart(cartItem.id);
        toast.success("Item removed from cart");
      } catch (error) {
        toast.error("Failed to remove item from cart");
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // Validation
    if (!productId) {
      toast.error("Product ID is required");
      return;
    }

    if (availableColors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if (availableSizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    // Check if the selected variant combination exists
    if (selectedColor && selectedSize && !currentVariant) {
      toast.error(
        `This product is not available in ${selectedColor} color and size ${selectedSize}. Please select a different size or color.`
      );
      return;
    }

    if (currentVariant && currentVariant.stock_quantity <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    if (quantity <= 0) {
      toast.error("Please select a valid quantity");
      return;
    }

    setIsProcessing(true);

    try {

      const options = {
        color: selectedColor,
        standard_size: selectedSize,
        quantity,
        // Add custom sizing support if needed
        custom_size_unit: null,
        custom_size_value: null,
      };

      const result = await toggleCartItem(productId, options);

      // Only show success message if we reach this point
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
      // Handle different types of errors
      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error;

        // Check for specific variant-related error messages
        if (
          errorMessage &&
          (errorMessage.toLowerCase().includes("variant") ||
            errorMessage.toLowerCase().includes("combination") ||
            errorMessage.toLowerCase().includes("not available") ||
            errorMessage.toLowerCase().includes("invalid"))
        ) {
          toast.error(
            `This variant combination (${
              selectedColor ? `${selectedColor} color` : ""
            }${selectedColor && selectedSize ? ", " : ""}${
              selectedSize ? `size ${selectedSize}` : ""
            }) is not available for this product.`
          );
        } else if (
          errorMessage &&
          errorMessage.toLowerCase().includes("stock")
        ) {
          toast.error(
            "This variant is out of stock. Please select a different combination."
          );
        } else {
          toast.error(
            errorMessage ||
              "This variant combination is not available. Please select a different combination."
          );
        }
      } else if (error.response?.status === 404) {
        toast.error(
          "Product not found. Please refresh the page and try again."
        );
      } else if (error.response?.status >= 500) {
        toast.error("Network error. Please try again later.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to add item to cart. Please try again."
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWishlistAction = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsWishlistLoading(true);
      if (isWishlisted) {
        const wishlistItem = wishlistData.items.find(
          (item) => item.product?.id === productId
        );
        if (wishlistItem) {
          await dispatch(
            removeFromWishlist({ item_id: wishlistItem.id })
          ).unwrap();
          toast.success("Removed from wishlist");
        }
      } else {
        await dispatch(addToWishlist({ product_id: productId })).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error("Error updating wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-lg md:text-2xl lg:text-xl xl:text-4xl font-bold mb-1">
        {name}
      </h1>
      <p className="text-gray-600 mb-2 md:text-xl lg:text-lg xl:text-xl">
        {category}
      </p>

      {/* Ratings */}
      <div className="flex items-center mb-4">
        <StarRating
          rating={rating}
          reviews={reviews || 0}
          size={18}
          showReviewCount={reviews > 0}
          showAverageRating={false}
        />
      </div>

      {/* Price */}
      <div className="md:text-xl lg:text-xl xl:text-3xl font-bold mb-4 mt-6">
        ₦{" "}
        {typeof displayPrice === "string"
          ? parseFloat(displayPrice.replace(/[^\d.-]/g, "")).toLocaleString(
              "en-NG",
              {
                minimumFractionDigits: 2,
              }
            )
          : displayPrice?.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
            })}
      </div>

      {/* Color and Quantity Section */}
      <div className="my-6">
        <div
          className={`flex ${
            availableColors.length > 0 ? "justify-between" : "justify-start"
          } items-start`}
        >
          {/* Color options - only shown if colors exist */}
          {availableColors.length > 0 && (
            <div className="">
              <div className="md:text-lg lg:text-lg xl:text-xl font-bold mb-2">
                Available color
              </div>
              <div className="flex space-x-4">
                {availableColors.map((color, index) => (
                  <button
                    key={index}
                    className={`${getColorClass(
                      color
                    )} w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedColor === color
                        ? "ring-2 ring-secondary ring-offset-2"
                        : ""
                    }`}
                    onClick={() => handleColorSelect(color)}
                    aria-label={color}
                  >
                    {selectedColor === color && (
                      <FaCheck className="text-white text-xs" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity controls - always shown */}
          <div className="flex flex-col items-start mr-12 md:ml-24">
            <div className="md:text-lg lg:text-lg xl:text-xl font-bold mb-2">
              Quantity
            </div>
            <div className="flex -ml-1">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className={`w-6 h-6 text-xl flex items-center justify-center rounded-full ${
                  quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Decrease quantity"
              >
                <FaMinusCircle className="text-xl text-primary" />
              </button>
              <span className="w-8 text-center text-xl font-semibold">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={
                  currentVariant &&
                  currentVariant.stock_quantity > 0 &&
                  quantity >= currentVariant.stock_quantity
                }
                className="w-6 h-6 text-xl flex items-center justify-center rounded-full"
                aria-label="Increase quantity"
              >
                <FaPlusCircle className="text-xl text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Size options */}
      {availableSizes.length > 0 && (
        <div className="mb-6 mt-8">
          <h3 className="md:text-lg font-bold mb-5">
            Available Size:{" "}
            <span className="font-normal">
              {selectedSize || "Please select"}
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-1 text-sm rounded-4xl border ${
                  selectedSize === size
                    ? "bg-primary text-white"
                    : "bg-white text-gray-800 border-primary"
                }`}
                onClick={() => handleSizeSelect(size)}
                aria-label={`Size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stock information */}
      {currentVariant && (
        <div className="mb-4 text-sm text-gray-600">
          {currentVariant.stock_quantity > 0
            ? currentVariant.stock_quantity < 5
              ? `${currentVariant.stock_quantity} in stock`
              : "In stock"
            : "Out of stock"}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex mt-8 flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={handleCartAction}
          disabled={
            isProcessing ||
            cartLoading ||
            (currentVariant && currentVariant.stock_quantity <= 0)
          }
          className={`flex-1 py-3 rounded-md font-medium transition-colors flex items-center justify-center ${
            itemInCart
              ? "bg-red-500 hover:bg-red-600 text-white"
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
          onClick={handleWishlistAction}
          disabled={isWishlistLoading}
          className="flex-1 text-orange border border-secondary cursor-pointer text-secondary hover:border-gray-400 py-3 rounded-md font-medium transition-colors"
          aria-label="Add to wishlist"
        >
          {isWishlistLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              {isWishlisted ? "Removing..." : "Adding..."}
            </>
          ) : isWishlisted ? (
            "Remove from Wishlist"
          ) : (
            "Add to Wishlist"
          )}
        </button>
      </div>

      {/* Error display */}
      {cartError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {cartError}
        </div>
      )}
    </div>
  );
}

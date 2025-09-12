import StarRating from "../../utils/star-rating";
import ColorSelector from "./product-info/ColorSelector";
import SizeSelector from "./product-info/SizeSelector";
import QuantityControls from "./product-info/QuantityControl";
import ActionButtons from "./product-info/ActionButtons";
import { useProductVariants } from "./product-info/hooks/useProductVariants";
import { useProductWishlist } from "./product-info/hooks/useWishlistAction";
import { useProductCart } from "./product-info/hooks/useCartAction";
import { useProductSelection } from "./product-info/hooks/useProductSelection";
import {
  getDisplayPrice,
  formatPrice,
  getStockStatus,
} from "./product-info/StockInfo";

export default function ProductInfo({
  name,
  category,
  rating,
  reviews,
  price,
  variants = [],
  productId,
  productQuantity,
}) {
  const {
    availableColors,
    availableSizes,
    getCurrentVariant,
    getCartCheckValue,
  } = useProductVariants(variants);

  const { isWishlisted, isWishlistLoading, handleWishlistAction } =
    useProductWishlist(productId);

  const {
    isProcessing,
    cartLoading,
    allProductCartItems,
    getCartItemForVariant,
    handleCartAction: performCartAction,
  } = useProductCart(productId);

  const {
    selectedColor,
    selectedSize,
    quantity,
    colorError,
    sizeError,
    handleColorSelect,
    handleSizeSelect,
    incrementQuantity,
    decrementQuantity,
    setValidationErrors,
  } = useProductSelection(
    availableColors,
    availableSizes,
    variants,
    allProductCartItems
  );

  // Get current variant based on selections
  const currentVariant = getCurrentVariant(selectedColor, selectedSize);

  // Display price (use override if available)
  const displayPrice = getDisplayPrice(currentVariant, price);

  // Check if current configuration is in cart
  const { itemInCart, cartItem } = getCartItemForVariant(
    selectedColor,
    selectedSize,
    getCartCheckValue
  );

  // Check if product has variants
  const hasVariants = availableColors.length > 0 || availableSizes.length > 0;

  // Stock status
  const stockStatus = getStockStatus(
    productQuantity,
    currentVariant,
    availableColors,
    availableSizes
  );

  const handleCartActionWrapper = () => {
    performCartAction(
      selectedColor,
      selectedSize,
      quantity,
      currentVariant,
      availableColors,
      availableSizes,
      productQuantity,
      setValidationErrors,
      getCartCheckValue
    );
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
          showReviewCount={true}
          showAverageRating={false}
        />
      </div>
      {/* Price */}
      <div className="md:text-xl lg:text-xl xl:text-3xl font-bold mb-4 mt-6">
        ₦ {formatPrice(displayPrice)}
      </div>
      {/* Color and Quantity Section - Fixed Layout */}
      <div className="my-6">
        {hasVariants ? (
          // Layout when variants exist
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <ColorSelector
                availableColors={availableColors}
                selectedColor={selectedColor}
                onColorSelect={handleColorSelect}
              />
              {/* Color error message */}
              {colorError && (
                <div className="text-red-500 text-sm font-medium">
                  {colorError}
                </div>
              )}
            </div>

            <div className="ml-6">
              <QuantityControls
                quantity={quantity}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
                currentVariant={currentVariant}
              />
            </div>
          </div>
        ) : (
          // Layout when no variants - quantity control positioned normally
          <div className="flex justify-start">
            <QuantityControls
              quantity={quantity}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
              currentVariant={currentVariant}
            />
          </div>
        )}
      </div>
      {/* Size options */}
      <div>
        <SizeSelector
          availableSizes={availableSizes}
          selectedSize={selectedSize}
          onSizeSelect={handleSizeSelect}
        />
        {/* Size error message */}
        {sizeError && (
          <div className=" text-red-500 text-sm font-medium">{sizeError}</div>
        )}
      </div>
      {/* Stock information */}
      <div className="mb-4 text-sm text-gray-600">{stockStatus}</div>
      {/* Action buttons */}
      <ActionButtons
        itemInCart={itemInCart}
        isProcessing={isProcessing}
        cartLoading={cartLoading}
        currentVariant={currentVariant}
        isWishlisted={isWishlisted}
        isWishlistLoading={isWishlistLoading}
        onCartAction={handleCartActionWrapper}
        onWishlistAction={handleWishlistAction}
        productQuantity={productQuantity}
      />
    </div>
  );
}
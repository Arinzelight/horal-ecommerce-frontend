import { useCart } from "../../hooks/useCart";
import { useProductVariants } from "./product-info/hooks/useProductVariants";
import { useCartActions } from "./product-info/hooks/useCartAction";
import { useWishlistActions} from "./product-info/hooks/useWishlistAction";
import ProductHeader from "./product-info/Details";
import VariantSelection from "./product-info/VariantSelection";
import StockDisplay from "./product-info/StockInfo";
import ActionButtons from "./product-info/ActionButtons";

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
  // Get all cart items for this product
  const { getProductCartItems, ...cartHookReturn } = useCart();
  const allProductCartItems = getProductCartItems(productId);

  // Product variants management
  const {
    selectedColor,
    selectedSize,
    quantity,
    colorError,
    sizeError,
    availableColors,
    availableSizes,
    currentVariant,
    handleColorSelect,
    handleSizeSelect,
    incrementQuantity,
    decrementQuantity,
    getCartCheckValue,
    clearErrors,
    validateSelections,
  } = useProductVariants(variants, allProductCartItems);

  // Cart actions
  const { itemInCart, isProcessing, cartLoading, handleCartAction } =
    useCartActions({
      useCart: cartHookReturn,
      productId,
      selectedColor,
      selectedSize,
      currentVariant,
      quantity,
      getCartCheckValue,
      validateSelections,
      clearErrors,
      availableColors,
      availableSizes,
    });

  // Wishlist actions
  const { isWishlisted, isWishlistLoading, handleWishlistAction } =
    useWishlistActions(productId);

  // Display price (use override if available)
  const displayPrice = currentVariant?.price_override || price;

  // Check if product has variants
  const hasVariants = availableColors.length > 0 || availableSizes.length > 0;

  return (
    <div className="">
      <ProductHeader
        name={name}
        category={category}
        rating={rating}
        reviews={reviews}
        displayPrice={displayPrice}
      />

      <VariantSelection
        hasVariants={hasVariants}
        availableColors={availableColors}
        selectedColor={selectedColor}
        onColorSelect={handleColorSelect}
        colorError={colorError}
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onSizeSelect={handleSizeSelect}
        sizeError={sizeError}
        quantity={quantity}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        currentVariant={currentVariant}
        productQuantity={productQuantity}
      />

      <StockDisplay
        productQuantity={productQuantity}
        currentVariant={currentVariant}
        availableColors={availableColors}
        availableSizes={availableSizes}
      />

      <ActionButtons
        itemInCart={itemInCart}
        isProcessing={isProcessing}
        cartLoading={cartLoading}
        currentVariant={currentVariant}
        isWishlisted={isWishlisted}
        isWishlistLoading={isWishlistLoading}
        onCartAction={handleCartAction}
        onWishlistAction={handleWishlistAction}
        productQuantity={productQuantity}
      />
    </div>
  );
}
import { useState } from "react";
import { useCart } from "../../../../hooks/useCart";
import { toast } from "../../../../components/toast";
import { extractBackendError } from "../../../../utils/backend-error";

export const useProductCart = (productId) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    isInCart,
    getCartItem,
    getProductCartItems,
    toggleCartItem,
    removeItemFromCart,
    isLoading: cartLoading,
  } = useCart();

  const allProductCartItems = getProductCartItems(productId);

  const getCartItemForVariant = (
    selectedColor,
    selectedSize,
    getCartCheckValue
  ) => {
    const itemInCart = isInCart(
      productId,
      selectedColor,
      getCartCheckValue(selectedSize)
    );
    const cartItem = getCartItem(
      productId,
      selectedColor,
      getCartCheckValue(selectedSize)
    );

    return { itemInCart, cartItem };
  };

  const handleCartAction = async (
    selectedColor,
    selectedSize,
    quantity,
    currentVariant,
    availableColors,
    availableSizes,
    productQuantity,
    onValidationError,
    getCartCheckValue
  ) => {
    // Clear previous errors
    onValidationError("", "");

    const { itemInCart, cartItem } = getCartItemForVariant(
      selectedColor,
      selectedSize,
      getCartCheckValue
    );

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

    let hasErrors = false;
    let colorError = "";
    let sizeError = "";

    if (availableColors.length > 0 && !selectedColor) {
      colorError = "Please select a color";
      hasErrors = true;
    }

    if (availableSizes.length > 0 && !selectedSize) {
      sizeError = "Please select a size";
      hasErrors = true;
    }

    // If there are validation errors, don't proceed
    if (hasErrors) {
      onValidationError(colorError, sizeError);
      return;
    }

    // Check if the selected variant combination exists
    if (selectedColor && selectedSize && !currentVariant) {
      toast.error(`Selected size is not available for this color.`);
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
        quantity,
      };

      // Set appropriate size field based on selected size type
      if (selectedSize?.type === "standard") {
        options.standard_size = selectedSize.value;
      } else if (selectedSize?.type === "footwear") {
        // Use 'size' field for new footwear format
        options.size = selectedSize.value;
      } else if (selectedSize?.type === "custom") {
        options.custom_size_value = selectedSize.value;
        options.custom_size_unit = selectedSize.unit;
      }

      await toggleCartItem(productId, options);
      toast.success("Item added to cart");
    } catch (error) {

      // First try to extract the backend error message
      const backendError = extractBackendError(error);

      if (backendError) {
        toast.error(backendError);
      } else if (error.response?.status === 404) {
        toast.error(
          "Product not found. Please refresh the page and try again."
        );
      } else if (error.response?.status >= 500) {
        toast.error("Network error. Please try again later.");
      } else {
        // Generic fallback
        if (error.isRemoveError) {
          toast.error("Failed to remove item from cart. Please try again.");
        } else {
          toast.error("Failed to add item to cart. Please try again.");
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    cartLoading,
    allProductCartItems,
    getCartItemForVariant,
    handleCartAction,
  };
};

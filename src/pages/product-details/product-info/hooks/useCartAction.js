import { useState } from "react";
import { toast } from "../../../../components/toast";

export const useCartActions = ({
  useCart,
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
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    isInCart,
    getCartItem,
    toggleCartItem,
    removeItemFromCart,
    isLoading: cartLoading,
    error: cartError,
  } = useCart;

  // Check if current configuration is in cart
  const itemInCart = isInCart(productId, selectedColor, getCartCheckValue());
  const cartItem = getCartItem(productId, selectedColor, getCartCheckValue());

  const handleCartAction = async () => {
    clearErrors();

    // If item is in cart, remove it
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

    const hasValidationErrors = validateSelections(
      availableColors,
      availableSizes
    );
    if (hasValidationErrors) {
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
        options.size = selectedSize.value;
      } else if (selectedSize?.type === "footwear_legacy") {
        options.custom_size_value = selectedSize.value;
      } else if (selectedSize?.type === "custom") {
        options.custom_size_value = selectedSize.value;
        options.custom_size_unit = selectedSize.unit;
      }

      await toggleCartItem(productId, options);
      toast.success("Item added to cart");
    } catch (error) {
      handleCartError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCartError = (error) => {
    if (error.response?.status === 400) {
      const errorMessage = error.response?.data || error.response?.data?.error;

      if (
        errorMessage &&
        (errorMessage.toLowerCase().includes("variant") ||
          errorMessage.toLowerCase().includes("combination") ||
          errorMessage.toLowerCase().includes("not available") ||
          errorMessage.toLowerCase().includes("invalid"))
      ) {
        toast.error(`Product is not available in the selected combination.`);
      } else if (errorMessage && errorMessage.toLowerCase().includes("stock")) {
        toast.error(
          "This variant is out of stock. Please select a different combination."
        );
      } else if (
        errorMessage &&
        errorMessage
          .toLowerCase()
          .includes("Insufficient stock for this product variant")
      ) {
        toast.error(
          "Insufficient stock for this product variant. Please reduce the quantity or select a different combination."
        );
      } else {
        toast.error(
          errorMessage ||
            "This variant combination is not available. Please select a different combination."
        );
      }
    } else if (error.response?.status === 404) {
      toast.error("Product not found. Please refresh the page and try again.");
    } else if (error.response?.status >= 500) {
      toast.error("Network error. Please try again later.");
    } else {
      toast.error(
        error.response?.data || "Failed to add item to cart. Please try again."
      );
    }
  };

  return {
    itemInCart,
    cartItem,
    isProcessing,
    cartLoading,
    cartError,
    handleCartAction,
  };
};

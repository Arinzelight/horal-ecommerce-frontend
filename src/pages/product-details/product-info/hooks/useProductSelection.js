import { useState, useEffect } from "react";

export const useProductSelection = (
  availableColors,
  availableSizes,
  variants,
  allProductCartItems
) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Error states for inline validation
  const [colorError, setColorError] = useState("");
  const [sizeError, setSizeError] = useState("");

  useEffect(() => {
    if (allProductCartItems.length > 0) {
      // If there's only one cart item for this product, use its variant details
      if (allProductCartItems.length === 1) {
        const cartItem = allProductCartItems[0];
        const cartColor =
          cartItem.user_selected_variant?.color || cartItem.color;

        // Handle size from cart item
        const cartSize = cartItem.user_selected_variant?.size || cartItem.size;

        const cartStandardSize =
          cartItem.user_selected_variant?.standard_size ||
          cartItem.standard_size;

        const cartCustomSize =
          cartItem.user_selected_variant?.custom_size_value ||
          cartItem.custom_size_value;

        const cartCustomUnit =
          cartItem.user_selected_variant?.custom_size_unit ||
          cartItem.custom_size_unit;

        if (cartColor && availableColors.includes(cartColor)) {
          setSelectedColor(cartColor);
        }

        // Find matching size object
        if (cartStandardSize) {
          const matchingSize = availableSizes.find(
            (size) =>
              size.type === "standard" && size.value === cartStandardSize
          );
          if (matchingSize) {
            setSelectedSize(matchingSize);
          }
        } else if (cartSize) {
          // Handle 'size' field for footwear
          const matchingSize = availableSizes.find(
            (size) =>
              (size.type === "footwear" && size.value === cartSize) ||
              (size.type === "footwear_legacy" && size.value === cartSize)
          );
          if (matchingSize) {
            setSelectedSize(matchingSize);
          }
        } else if (cartCustomSize) {
          const matchingSize = availableSizes.find(
            (size) =>
              size.type === "custom" &&
              size.value === cartCustomSize &&
              size.unit === cartCustomUnit
          );
          if (matchingSize) {
            setSelectedSize(matchingSize);
          }
        }

        setQuantity(cartItem.quantity || 1);
      }
    }
  }, [availableColors, availableSizes, allProductCartItems]);

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Clear color error when user selects a color
    setColorError("");

    // Reset size if the selected color doesn't have the current size
    if (selectedSize) {
      const hasSize = variants.some((v) => {
        if (v.color !== color) return false;

        if (selectedSize.type === "standard") {
          return v.standard_size === selectedSize.value;
        } else if (selectedSize.type === "footwear") {
          return v.size === selectedSize.value;
        } else if (selectedSize.type === "footwear_legacy") {
          return (
            v.custom_size_value === selectedSize.value && !v.custom_size_unit
          );
        } else if (selectedSize.type === "custom") {
          return (
            v.custom_size_value === selectedSize.value &&
            v.custom_size_unit === selectedSize.unit
          );
        }

        return false;
      });

      if (!hasSize) {
        // Find first available size for this color
        const firstVariant = variants.find((v) => v.color === color);
        if (firstVariant) {
          let firstSize = null;

          if (firstVariant.standard_size) {
            firstSize = availableSizes.find(
              (size) =>
                size.type === "standard" &&
                size.value === firstVariant.standard_size
            );
          } else if (firstVariant.size) {
            firstSize = availableSizes.find(
              (size) =>
                size.type === "footwear" && size.value === firstVariant.size
            );
          } else if (firstVariant.custom_size_value) {
            firstSize = availableSizes.find(
              (size) =>
                size.type === "custom" &&
                size.value === firstVariant.custom_size_value &&
                size.unit === firstVariant.custom_size_unit
            );
          }

          setSelectedSize(firstSize);
        } else {
          setSelectedSize(null);
        }
      }
    }
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    // Clear size error when user selects a size
    setSizeError("");
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

  const setValidationErrors = (colorErr, sizeErr) => {
    setColorError(colorErr);
    setSizeError(sizeErr);
  };

  return {
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
  };
};

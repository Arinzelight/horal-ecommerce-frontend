import { useState, useEffect, useMemo } from "react";

export const useProductVariants = (variants = [], allProductCartItems = []) => {
  const isFootwearVariant = (variant) => {
    // Check if variant has size field (new footwear format) or custom_size_value without custom_size_unit (old footwear format)
    return (
      variant.size || (variant.custom_size_value && !variant.custom_size_unit)
    );
  };

  // Extract unique colors and sizes from variants (memoized to prevent recreation)
  const availableColors = useMemo(() => {
    const colors = [...new Set(variants.map((v) => v.color))].filter(Boolean);
    return colors;
  }, [variants]);

  const availableSizes = useMemo(() => {
    const sizeMap = new Map();

    variants.forEach((variant) => {
      // Handle standard sizes
      if (variant.standard_size) {
        const key = `standard_${variant.standard_size}`;
        if (!sizeMap.has(key)) {
          sizeMap.set(key, {
            type: "standard",
            value: variant.standard_size,
            display: variant.standard_size,
            key: key,
          });
        }
      }

      if (variant.size) {
        // NEW: Use 'size' field for footwear (primary)
        const display = variant.size.toString();
        const key = `footwear_${variant.size}`;

        if (!sizeMap.has(key)) {
          sizeMap.set(key, {
            type: "footwear",
            value: variant.size,
            display: display,
            key: key,
          });
        }
      } else if (variant.custom_size_value && !variant.custom_size_unit) {
        // LEGACY: Handle old footwear data using custom_size_value without unit
        const display = variant.custom_size_value.toString();
        const key = `footwear_legacy_${variant.custom_size_value}`;

        if (!sizeMap.has(key)) {
          sizeMap.set(key, {
            type: "footwear_legacy",
            value: variant.custom_size_value,
            display: display,
            key: key,
          });
        }
      } else if (variant.custom_size_value && variant.custom_size_unit) {
        // Handle true custom sizes (with units)
        const display = `${variant.custom_size_value} ${variant.custom_size_unit}`;
        const key = `custom_${variant.custom_size_value}_${variant.custom_size_unit}`;

        if (!sizeMap.has(key)) {
          sizeMap.set(key, {
            type: "custom",
            value: variant.custom_size_value,
            unit: variant.custom_size_unit,
            display: display,
            key: key,
          });
        }
      }
    });

    return Array.from(sizeMap.values());
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Error states for inline validation
  const [colorError, setColorError] = useState("");
  const [sizeError, setSizeError] = useState("");

  // Get current variant based on selections
  const currentVariant = variants.find((v) => {
    if (!selectedColor || !selectedSize) return false;

    const colorMatch = v.color === selectedColor;

    if (selectedSize.type === "standard") {
      return colorMatch && v.standard_size === selectedSize.value;
    } else if (selectedSize.type === "footwear") {
      return colorMatch && v.size === selectedSize.value;
    } else if (selectedSize.type === "custom") {
      return (
        colorMatch &&
        v.custom_size_value === selectedSize.value &&
        v.custom_size_unit === selectedSize.unit
      );
    }

    return false;
  });

  const getCartCheckValue = () => {
    if (!selectedSize) return null;

    if (selectedSize.type === "standard") {
      return selectedSize.value;
    } else if (
      selectedSize.type === "footwear" ||
      selectedSize.type === "footwear_legacy"
    ) {
      return selectedSize.value;
    } else if (selectedSize.type === "custom") {
      return selectedSize.value;
    }

    return null;
  };

  // Initialize from cart items
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
    setSizeError("");
  };

  // Handle quantity controls
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const clearErrors = () => {
    setColorError("");
    setSizeError("");
  };

  const validateSelections = (availableColors, availableSizes) => {
    let hasErrors = false;

    if (availableColors.length > 0 && !selectedColor) {
      setColorError("Please select a color");
      hasErrors = true;
    }

    if (availableSizes.length > 0 && !selectedSize) {
      setSizeError("Please select a size");
      hasErrors = true;
    }

    return hasErrors;
  };

  return {
    // State
    selectedColor,
    selectedSize,
    quantity,
    colorError,
    sizeError,

    // Computed values
    availableColors,
    availableSizes,
    currentVariant,

    // Handlers
    handleColorSelect,
    handleSizeSelect,
    incrementQuantity,
    decrementQuantity,
    getCartCheckValue,
    clearErrors,
    validateSelections,

    // Utilities
    isFootwearVariant,
  };
};

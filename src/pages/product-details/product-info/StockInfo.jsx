export const getDisplayPrice = (currentVariant, basePrice) => {
  return currentVariant?.price_override || basePrice;
};

export const formatPrice = (price) => {
  if (!price) return "0";

  const numericPrice =
    typeof price === "string" ? price.replace(/[^\d.-]/g, "") : price;

  return Number(numericPrice).toLocaleString("en-NG", {
    maximumFractionDigits: 0,
  });
};

export const getStockStatus = (
  productQuantity,
  currentVariant,
  availableColors,
  availableSizes
) => {
  // Check if general product quantity is 0
  if (productQuantity !== undefined && productQuantity <= 0) {
    return "Out of stock";
  }

  // If there's a current variant, check its stock
  if (currentVariant) {
    if (currentVariant.stock_quantity > 0) {
      return currentVariant.stock_quantity < 5
        ? `${currentVariant.stock_quantity} in stock`
        : "In stock";
    } else {
      return "Out of stock";
    }
  }

  // If no variant is selected but variants exist
  if (availableColors.length > 0 || availableSizes.length > 0) {
    return "Select a variant to see stock";
  }

  return "";
};

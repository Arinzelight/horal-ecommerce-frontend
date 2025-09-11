export default function StockDisplay({
  productQuantity,
  currentVariant,
  availableColors,
  availableSizes,
}) {
  const getStockMessage = () => {
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

  return <div className="mb-4 text-sm text-gray-600">{getStockMessage()}</div>;
}

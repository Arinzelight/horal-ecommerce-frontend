import React, { useState } from "react";
import ColorSelector from "./ColorSelectors";
import SizeTypeSelector from "./SizeTypeSelector";
import SizeQuantityGrid from "./SizeQuantityGrid";
import StockQuantityInput from "./StockQuantityInput";
import CustomSizeInput from "./CustomSizeInput";
import { isCustomSizeType } from "../../utils/getSizeOptions";

const VariantForm = ({ onSave, onCancel, category, initialData }) => {
  const [variant, setVariant] = useState(
    initialData || {
      color: "",
      sizeType: "clothing",
      sizes: {},
      priceOverride: "",
      stockQuantity: "",
      customSizeUnit: "",
      customSizeValue: "",
    }
  );

  const handleSave = () => {
    // if (!variant.color) {
    //   alert("Please select a color");
    //   return;
    // }

    // Validation for custom size unit
    if (isCustomSizeType(variant.sizeType)) {
      if (!variant.customSizeUnit) {
        alert("Please select a size unit");
        return;
      }
      if (!variant.customSizeValue) {
        alert("Please enter a size value");
        return;
      }
      if (!variant.stockQuantity) {
        alert("Please enter stock quantity");
        return;
      }
    }

    let variantData = {
      id: initialData?.id || Date.now().toString(),
      color: variant.color,
      sizeType: variant.sizeType,
      priceOverride: variant.priceOverride || null,
    };

    // Handle different size types
    if (variant.sizeType === "noSize") {
      variantData.sizes = { "One Size": parseInt(variant.stockQuantity) };
    } else if (isCustomSizeType(variant.sizeType)) {
      // For custom size units, create a unique key combining value and unit
      const sizeKey = `${variant.customSizeValue}${variant.customSizeUnit}`;
      variantData.sizes = { [sizeKey]: parseInt(variant.stockQuantity) };
      variantData.customSizeUnit = variant.customSizeUnit;
      variantData.customSizeValue = variant.customSizeValue;
    } else {
      variantData.sizes = variant.sizes;
    }

    onSave(variantData);
  };

  const handleSizeQuantityChange = (size, quantity) => {
    const updatedSizes = { ...variant.sizes };
    if (quantity === "" || quantity === "0") {
      delete updatedSizes[size];
    } else {
      updatedSizes[size] = parseInt(quantity) || 0;
    }
    setVariant({ ...variant, sizes: updatedSizes });
  };

  const renderSizeSection = () => {
    if (variant.sizeType === "noSize") {
      return (
        <StockQuantityInput
          stockQuantity={variant.stockQuantity}
          onChange={(qty) => setVariant({ ...variant, stockQuantity: qty })}
        />
      );
    } else if (isCustomSizeType(variant.sizeType)) {
      return (
        <CustomSizeInput
          selectedUnit={variant.customSizeUnit}
          sizeValue={variant.customSizeValue}
          stockQuantity={variant.stockQuantity}
          onUnitChange={(unit) =>
            setVariant({
              ...variant,
              customSizeUnit: unit,
              customSizeValue: "",
              stockQuantity: "",
            })
          }
          onSizeValueChange={(value) =>
            setVariant({ ...variant, customSizeValue: value })
          }
          onStockQuantityChange={(qty) =>
            setVariant({ ...variant, stockQuantity: qty })
          }
        />
      );
    } else {
      return (
        <SizeQuantityGrid
          sizes={variant.sizes}
          sizeType={variant.sizeType}
          category={category}
          onQuantityChange={handleSizeQuantityChange}
        />
      );
    }
  };

  return (
    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-800">
          {initialData ? "Edit Variant" : "Add New Variant"}
        </h4>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <ColorSelector
        selectedColor={variant.color}
        onChange={(color) => setVariant({ ...variant, color })}
      />

      <SizeTypeSelector
        category={category}
        selectedType={variant.sizeType}
        onChange={(type) =>
          setVariant({
            ...variant,
            sizeType: type,
            sizes: {},
            stockQuantity: "",
            customSizeUnit: "",
            customSizeValue: "",
          })
        }
      />

      {renderSizeSection()}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Override (Optional)
        </label>
        <input
          type="number"
          step="0.01"
          value={variant.priceOverride || ""}
          onChange={(e) =>
            setVariant({ ...variant, priceOverride: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Leave blank to use base price"
        />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialData ? "Save Changes" : "Add Variant"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VariantForm;

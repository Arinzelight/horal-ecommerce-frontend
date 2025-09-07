import React, { useState } from "react";
import ColorSelector from "./ColorSelectors";
import SizeTypeSelector from "./SizeTypeSelector";
import SizeQuantityGrid from "./SizeQuantityGrid";
import StockQuantityInput from "./StockQuantityInput";
import CustomSizeInput from "./CustomSizeInput";
import { isCustomSizeType } from "../../utils/getSizeOptions";
import { toast } from "../../../../../../../components/toast";
import LogisticsDataInput from "./LogisticsDataInput";

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
      logisticsData: {
        weightMeasurement: "",
        totalWeight: "",
      },
    }
  );

  const handleSave = () => {
    // Validation for logistics data (REQUIRED)
    if (
      !variant.logisticsData.weightMeasurement ||
      variant.logisticsData.weightMeasurement.trim() === ""
    ) {
      toast.error("Please select a weight measurement unit for logistics");
      return;
    }
    if (
      !variant.logisticsData.totalWeight ||
      parseFloat(variant.logisticsData.totalWeight) <= 0
    ) {
      toast.error("Please enter a valid total weight for logistics");
      return;
    }

    // Validation for custom size unit
    if (isCustomSizeType(variant.sizeType)) {
      if (!variant.customSizeUnit || variant.customSizeUnit.trim() === "") {
        toast.error("Please select a size unit");
        return;
      }
      if (!variant.customSizeValue || variant.customSizeValue.trim() === "") {
        toast.error("Please enter a size value");
        return;
      }
      if (!variant.stockQuantity || parseInt(variant.stockQuantity) <= 0) {
        toast.error("Please enter a valid stock quantity");
        return;
      }
    }

    // Validate that at least some stock is provided
    if (
      variant.sizeType === "noSize" &&
      (!variant.stockQuantity || parseInt(variant.stockQuantity) <= 0)
    ) {
      toast.error("Please enter a valid stock quantity");
      return;
    }

    // For regular sizes, ensure at least one size has stock
    if (!isCustomSizeType(variant.sizeType) && variant.sizeType !== "noSize") {
      const hasStock = Object.values(variant.sizes).some(
        (qty) => parseInt(qty) > 0
      );
      if (!hasStock) {
        toast.error("Please enter stock quantity for at least one size");
        return;
      }
    }

    let variantData = {
      id: initialData?.id || Date.now().toString(),
      color: variant.color || null, // Allow null color
      sizeType: variant.sizeType,
      priceOverride: variant.priceOverride || null,
      logisticsData: {
        weightMeasurement: variant.logisticsData.weightMeasurement,
        totalWeight: parseFloat(variant.logisticsData.totalWeight),
      },
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

  // Handle logistics data changes
  const handleLogisticsChange = (field, value) => {
    setVariant({
      ...variant,
      logisticsData: {
        ...variant.logisticsData,
        [field]: value,
      },
    });
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

      <LogisticsDataInput
        weightMeasurement={variant.logisticsData.weightMeasurement}
        totalWeight={variant.logisticsData.totalWeight}
        onWeightMeasurementChange={(value) =>
          handleLogisticsChange("weightMeasurement", value)
        }
        onTotalWeightChange={(value) =>
          handleLogisticsChange("totalWeight", value)
        }
      />

      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Override (Optional)
        </label>
        <input
          type="number"
          value={variant.priceOverride || ""}
          onChange={(e) =>
            setVariant({ ...variant, priceOverride: e.target.value })
          }
          className="text-sm w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Fill this if the variant price is different. If this is filled, it will override the base price"
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




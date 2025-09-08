import React, { useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import VariantForm from "./variant-manager/VariantForm";
import VariantItem from "./variant-manager/VariantItem";
import { isCustomSizeType } from "../utils/getSizeOptions";

const VariantManager = ({
  category = "fashion",
  onVariantsChange,
  initialVariants = [],
  isEditMode = false,
}) => {
  const [variants, setVariants] = useState([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

  // Helper function to check if size type is footwear
  const isFootwearSizeType = (sizeType) => {
    return sizeType === "footwear" || sizeType === "childrenFootwear";
  };

  // Convert API variants to component format
  const convertApiVariantsToComponentFormat = (apiVariants) => {
    if (!apiVariants || apiVariants.length === 0) return [];

    // Group variants by color (handle null colors)
    const groupedByColor = apiVariants.reduce((acc, variant) => {
      const color = variant.color || "no-color"; // Handle null/empty colors
      if (!acc[color]) {
        // Determine size type based on API fields
        let sizeType = "noSize";
        if (variant.standard_size) {
          sizeType = "clothing";
        } else if (variant.custom_size_value && variant.custom_size_unit) {
          sizeType = "customSizeUnit";
        } else if (variant.size) {
          // NEW: Check for 'size' field for footwear (primary)
          sizeType = "footwear";
        } else if (variant.custom_size_value && !variant.custom_size_unit) {
          // LEGACY: Support old data that used custom_size_value for footwear
          // sizeType = "footwear";
        }

        // Extract logistics data - CHECK BOTH logistics AND logistics_data
        let logisticsData = {
          weightMeasurement: "",
          totalWeight: "",
        };

        // Check for logistics_data first (from API response)
        if (variant.logistics_data && variant.logistics_data.length > 0) {
          logisticsData = {
            weightMeasurement:
              variant.logistics_data[0].weight_measurement || "",
            totalWeight: variant.logistics_data[0].total_weight || "",
          };
        }
        // Fallback to logistics (in case it exists in some responses)
        else if (variant.logistics && variant.logistics.length > 0) {
          logisticsData = {
            weightMeasurement: variant.logistics[0].weight_measurement || "",
            totalWeight: variant.logistics[0].total_weight || "",
          };
        }
        // Handle if logistics as an object instead of array
        else if (
          variant.logistics &&
          typeof variant.logistics === "object" &&
          !Array.isArray(variant.logistics)
        ) {
          logisticsData = {
            weightMeasurement: variant.logistics.weight_measurement || "",
            totalWeight: variant.logistics.total_weight || "",
          };
        }

        acc[color] = {
          id: `${color}_${Date.now()}`,
          color: variant.color || "",
          sizeType: sizeType,
          sizes: {},
          priceOverride: variant.price_override,
          customSizeUnit: variant.custom_size_unit || "",
          customSizeValue: variant.custom_size_value || "",
          logisticsData: logisticsData,
        };
      }

      // Determine the size key
      let sizeKey = "One Size";
      if (variant.standard_size) {
        sizeKey = variant.standard_size;
      } else if (variant.custom_size_value && variant.custom_size_unit) {
        sizeKey = `${variant.custom_size_value}${variant.custom_size_unit}`;
      } else if (variant.size) {
        // NEW: Use 'size' field for footwear (primary)
        sizeKey = variant.size;
      } else if (variant.custom_size_value) {
        // LEGACY: Fall back to custom_size_value for old footwear data
        // sizeKey = variant.custom_size_value;
      }

      acc[color].sizes[sizeKey] = variant.stock_quantity;

      return acc;
    }, {});

    return Object.values(groupedByColor);
  };

  // Initialize variants from props when component mounts or initialVariants changes
  useEffect(() => {
    if (initialVariants && initialVariants.length > 0) {
      const convertedVariants =
        convertApiVariantsToComponentFormat(initialVariants);
      setVariants(convertedVariants);
    }
  }, [initialVariants]);

  const updateParentVariants = useCallback(
    (currentVariants, isEditMode = false) => {
      const formattedVariants = [];
      currentVariants.forEach((variant) => {
        Object.entries(variant.sizes).forEach(([size, quantity]) => {
          if (quantity > 0) {
            let apiVariant = {
              stock_quantity: parseInt(quantity),
              has_size: variant.sizeType !== "noSize",
            };

            // Handle logistics data - use different field names based on create vs edit mode
            if (
              variant.logisticsData &&
              variant.logisticsData.weightMeasurement &&
              variant.logisticsData.totalWeight
            ) {
              const logisticsFieldName = isEditMode
                ? "logistics"
                : "logistics";
              apiVariant[logisticsFieldName] = {
                weight_measurement: variant.logisticsData.weightMeasurement,
                total_weight: parseFloat(
                  variant.logisticsData.totalWeight
                ).toFixed(2),
              };
            }

            // Only include color if it has a value
            if (variant.color && variant.color.trim() !== "") {
              apiVariant.color = variant.color.toLowerCase();
            }

            // Only include price_override if it has a value
            if (variant.priceOverride && variant.priceOverride.trim() !== "") {
              apiVariant.price_override = parseFloat(variant.priceOverride);
            }

            // Handle size fields based on size type
            if (
              variant.sizeType === "clothing" ||
              variant.sizeType === "childrenClothing"
            ) {
              if (size && size.trim() !== "") {
                apiVariant.standard_size = size;
              }
            } else if (isFootwearSizeType(variant.sizeType)) {
              // NEW: Use 'size' field for footwear instead of custom_size_value
              if (size && size.trim() !== "") {
                apiVariant.size = size;
                // LEGACY: Also include custom_size_value for backward compatibility
                // apiVariant.custom_size_value = size;
              }
            } else if (isCustomSizeType(variant.sizeType)) {
              // For custom size type, only include fields that have values
              if (
                variant.customSizeValue &&
                variant.customSizeValue.trim() !== ""
              ) {
                apiVariant.custom_size_value = variant.customSizeValue.trim();
              }
              if (
                variant.customSizeUnit &&
                variant.customSizeUnit.trim() !== ""
              ) {
                apiVariant.custom_size_unit = variant.customSizeUnit.trim();
              }
            }
            // For noSize, don't include any size-related fields at all

            formattedVariants.push(apiVariant);
          }
        });
      });
      onVariantsChange(formattedVariants);
    },
    [onVariantsChange]
  );

  // Update parent whenever variants change
  useEffect(() => {
    updateParentVariants(variants, isEditMode);
  }, [variants, updateParentVariants, isEditMode]);

  const handleAddVariant = (variantData) => {
    const updatedVariants = [...variants, variantData];
    setVariants(updatedVariants);
    setIsAddingVariant(false);
  };

  const handleUpdateVariant = (updatedVariant) => {
    const updatedVariants = variants.map((v) =>
      v.id === updatedVariant.id ? updatedVariant : v
    );
    setVariants(updatedVariants);
    setEditingVariant(null);
  };

  const handleDeleteVariant = (variantId) => {
    const updatedVariants = variants.filter((v) => v.id !== variantId);
    setVariants(updatedVariants);
  };

  return (
    <div className="mb-6">
      <h3 className="text-[16px] font-medium ">Product Variants</h3>
      <p className="text-sm text-gray-600 mb-2">
        Manage the different variants of your product, including size and color
        options. Ensure all fields are filled out correctly before publishing.
      </p>
      <div className="border border-neutral-200 rounded-md p-4">
        {variants.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Added Variants
            </h4>
            <div className="space-y-3">
              {variants.map((variant) => (
                <VariantItem
                  key={variant.id}
                  variant={variant}
                  isEditing={editingVariant?.id === variant.id}
                  onEdit={setEditingVariant}
                  onUpdate={handleUpdateVariant}
                  onCancelEdit={() => setEditingVariant(null)}
                  onDelete={handleDeleteVariant}
                  category={category}
                />
              ))}
            </div>
          </div>
        )}

        {isAddingVariant ? (
          <VariantForm
            onSave={handleAddVariant}
            onCancel={() => setIsAddingVariant(false)}
            category={category}
          />
        ) : (
          <button
            onClick={() => setIsAddingVariant(true)}
            className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <FaPlus size={20} className="mr-2" />
            Add Product Variant
          </button>
        )}

        {variants.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Total Variants:</strong>{" "}
                {variants.reduce(
                  (total, v) =>
                    total +
                    (v.sizeType === "noSize" || isCustomSizeType(v.sizeType)
                      ? 1
                      : Object.keys(v.sizes).length),
                  0
                )}
              </p>
              <p>
                <strong>Total Stock:</strong>{" "}
                {variants.reduce(
                  (total, v) =>
                    total +
                    Object.values(v.sizes).reduce(
                      (sum, qty) => sum + (parseInt(qty) || 0),
                      0
                    ),
                  0
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariantManager;

import React, { useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import VariantForm from "./variant-manager/VariantForm";
import VariantItem from "./variant-manager/VariantItem";
import { isCustomSizeType } from "../utils/getSizeOptions";

const VariantManager = ({
  category = "fashion",
  onVariantsChange,
  initialVariants = [],
}) => {
  const [variants, setVariants] = useState([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

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
        } else if (variant.custom_size_value && !variant.custom_size_unit) {
          sizeType = "footwear"; // Assuming footwear if custom_size_value without unit
        }

        acc[color] = {
          id: `${color}_${Date.now()}`,
          color: variant.color || "", // Keep original color (empty if null)
          sizeType: sizeType,
          sizes: {},
          priceOverride: variant.price_override,
          customSizeUnit: variant.custom_size_unit || "",
          customSizeValue: variant.custom_size_value || "",
        };
      }

      // Determine the size key
      let sizeKey = "One Size";
      if (variant.standard_size) {
        sizeKey = variant.standard_size;
      } else if (variant.custom_size_value && variant.custom_size_unit) {
        sizeKey = `${variant.custom_size_value}${variant.custom_size_unit}`;
      } else if (variant.custom_size_value) {
        sizeKey = variant.custom_size_value;
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
    (currentVariants) => {
      const formattedVariants = [];
      currentVariants.forEach((variant) => {
        Object.entries(variant.sizes).forEach(([size, quantity]) => {
          if (quantity > 0) {
            let apiVariant = {
              stock_quantity: parseInt(quantity),
              price_override: variant.priceOverride || null,
              has_size: variant.sizeType !== "noSize",
            };

            // Handle color - only include if it has a value
            if (variant.color && variant.color.trim() !== "") {
              apiVariant.color = variant.color.toLowerCase();
            }
            // If no color is provided, don't include the color field at all

            // Set size fields based on size type - ONLY include fields that should be sent
            if (
              variant.sizeType === "clothing" ||
              variant.sizeType === "childrenClothing"
            ) {
              apiVariant.standard_size = size;
            } else if (
              variant.sizeType === "footwear" ||
              variant.sizeType === "childrenFootwear"
            ) {
              // For footwear, ONLY send custom_size_value, NOT custom_size_unit
              apiVariant.custom_size_value = size;
            } else if (isCustomSizeType(variant.sizeType)) {
              // For custom size type, send BOTH fields
              if (variant.customSizeValue && variant.customSizeValue.trim()) {
                apiVariant.custom_size_value = variant.customSizeValue.trim();
              }
              if (variant.customSizeUnit && variant.customSizeUnit.trim()) {
                apiVariant.custom_size_unit = variant.customSizeUnit.trim();
              }
            }
            // For noSize, don't add any size-related fields

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
    updateParentVariants(variants);
  }, [variants, updateParentVariants]);

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
      <h3 className="text-[16px] font-medium mb-4">Product Variants</h3>
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

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ColorDisplay from "./ColorDisplay";
import VariantForm from "./VariantForm";
import { getSizeTypeLabel } from "../../utils/getSizeOptions";

const VariantItem = ({
  variant,
  isEditing,
  onEdit,
  onUpdate,
  onCancelEdit,
  onDelete,
  category,
}) => {
  const totalStock = Object.values(variant.sizes).reduce(
    (total, qty) => total + (parseInt(qty) || 0),
    0
  );

  if (isEditing) {
    return (
      <VariantForm
        initialData={variant}
        onSave={onUpdate}
        onCancel={onCancelEdit}
        category={category}
      />
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <ColorDisplay colorName={variant.color} />
            <span className="ml-2 text-sm text-gray-600">
              ({getSizeTypeLabel(variant.sizeType, category)})
            </span>
          </div>

          {variant.sizeType === "noSize" ? (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Stock: </span>
              {totalStock}
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Sizes: </span>
                {Object.entries(variant.sizes)
                  .map(([size, qty]) => `${size}(${qty})`)
                  .join(", ")}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Total Stock: </span>
                {totalStock}
              </div>
            </>
          )}

          {variant.priceOverride && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Price Override: </span>$
              {variant.priceOverride}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(variant)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={() => onDelete(variant.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantItem;

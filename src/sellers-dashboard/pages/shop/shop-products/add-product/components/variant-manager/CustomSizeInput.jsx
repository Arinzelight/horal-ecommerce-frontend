import React from "react";
import { getCustomSizeUnits } from "../../utils/getSizeOptions";

const CustomSizeInput = ({
  selectedUnit,
  sizeValue,
  stockQuantity,
  onUnitChange,
  onSizeValueChange,
  onStockQuantityChange,
}) => {
  const sizeUnits = getCustomSizeUnits();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Size Unit
        </label>
        <select
          value={selectedUnit || ""}
          onChange={(e) => onUnitChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Choose a unit...</option>
          {sizeUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      {selectedUnit && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size Value ({selectedUnit})
            </label>
            <input
              type="number"
              min="0"
              value={sizeValue || ""}
              onChange={(e) => onSizeValueChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder={`Enter size in ${selectedUnit}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              min="0"
              value={stockQuantity || ""}
              onChange={(e) => onStockQuantityChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter stock quantity"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSizeInput;

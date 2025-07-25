import React from "react";
import { getSizeOptions } from "../../utils/getSizeOptions";

const SizeQuantityGrid = ({ sizes, sizeType, category, onQuantityChange }) => {
  const availableSizes = getSizeOptions(sizeType, category);
  const isFootwear = sizeType.includes("footwear");

  return (
    <div className="space-y-3">
      {isFootwear && (
        <>
          <p className="text-xs text-blue-600 font-medium">
            * Sizing is in EUR
          </p>
        </>
      )}
      <p className="text-xs text-gray-500 mb-3">
        For every size selected, a corresponding quantity must be provided.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {availableSizes.map((size) => (
          <div key={size} className="flex flex-col items-center">
            <label className="text-xs font-medium text-gray-700 mb-1">
              {size}
            </label>
            <input
              type="number"
              min="0"
              value={sizes[size] || ""}
              onChange={(e) => onQuantityChange(size, e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeQuantityGrid;

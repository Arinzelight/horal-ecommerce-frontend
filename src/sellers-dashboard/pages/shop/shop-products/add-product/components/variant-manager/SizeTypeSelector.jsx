import React from "react";
import { getSizeTypeOptions } from "../../utils/getSizeOptions";

const SizeTypeSelector = ({ category, selectedType, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Size Type
    </label>
    <p className="text-xs text-gray-500">
      If the product does not have a specific size type, select "No Size".
      Proceed to add product stock and price override if necessary.
    </p>
    <p className="text-xs text-gray-500">
      <span className="font-bold">No Size: </span>For product without specific sizes (e.g., jewelry, watches).
    </p>
    <p className="text-xs text-gray-500">
      <span className="font-bold">Standard Size: </span>For products with common sizing (e.g., clothing).
    </p>
    <p className="text-xs text-gray-500 mb-3">
      <span className="font-bold">Custom Size: </span>For products requiring unique measurements (e.g.
      gadgets, furniture).
    </p>
    <div className="space-y-2">
      {getSizeTypeOptions(category).map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            checked={selectedType === option.value}
            onChange={() => onChange(option.value)}
            className="mr-2"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export default SizeTypeSelector;

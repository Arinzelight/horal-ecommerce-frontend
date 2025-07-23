import React from "react";
import { getSizeTypeOptions } from "../../utils/getSizeOptions";

const SizeTypeSelector = ({ category, selectedType, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Size Type
    </label>
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

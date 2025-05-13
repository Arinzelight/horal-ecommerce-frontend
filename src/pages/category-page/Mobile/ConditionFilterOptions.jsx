import React from "react";
import { conditions } from "../../../data/mockProducts";

const ConditionFilterOptions = ({ activeFilters, onFilterChange }) => (
  <div className="space-y-3">
    {conditions.map((condition) => (
      <div key={condition} className="flex items-center">
        <input
          type="checkbox"
          id={`m-condition-${condition}`}
          checked={activeFilters.condition.includes(condition)}
          onChange={() => onFilterChange("condition", condition)}
          className="h-4 w-4 text-blue-600 rounded"
        />
        <label
          htmlFor={`m-condition-${condition}`}
          className="ml-2 text-sm text-gray-700"
        >
          {condition}
        </label>
      </div>
    ))}
  </div>
);

export default ConditionFilterOptions;

import React from "react";


const ConditionFilterOptions = ({ activeFilters, onFilterChange, products }) => {
  const conditions = [
    ...new Set(products.map((product) => product.condition).filter(Boolean)),
  ];

  return (
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
};

export default ConditionFilterOptions;

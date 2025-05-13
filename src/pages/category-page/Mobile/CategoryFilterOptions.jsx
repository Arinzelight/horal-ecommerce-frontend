
import React from "react";
import { categories } from "../../../data/mockProducts";

const CategoryFilterOptions = ({ activeFilters, onFilterChange }) => (
  <div className="space-y-3">
    {categories.map(category => (
      <div key={category.name} className="flex items-center">
        <input
          type="checkbox"
          id={`m-category-${category.name}`}
          checked={activeFilters.category.includes(category.name)}
          onChange={() => onFilterChange("category", category.name)}
          className="h-4 w-4 text-blue-600 rounded"
        />
        <label
          htmlFor={`m-category-${category.name}`}
          className="ml-2 text-sm text-gray-700 flex items-center"
        >
          {category.name}
        </label>
      </div>
    ))}
  </div>
);

export default CategoryFilterOptions;
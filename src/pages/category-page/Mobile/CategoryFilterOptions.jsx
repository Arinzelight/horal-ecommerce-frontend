
import React from "react";
import { useCategories } from "../../../hooks/useCategories";

const CategoryFilterOptions = ({ activeFilters, onFilterChange }) => {
  
  const { categories } = useCategories();

  return (
    <div className="space-y-3">
      {categories &&categories.map((category) => (
        <div key={category.name} className="flex items-center">
        <input
          type="checkbox"
          id={`category-${category.name}`}
          checked={activeFilters.category?.includes(category.name)}
          onChange={() => onFilterChange("category", category.name)}
          className="h-4 w-4 text-blue-600 rounded"
        />
        <label
          htmlFor={`category-${category.name}`}
          className="capitalize ml-2 text-sm text-gray-700 flex items-center"
        >
          {category.name}
        </label>
      </div>
    ))}
  </div>
  );
}

export default CategoryFilterOptions;
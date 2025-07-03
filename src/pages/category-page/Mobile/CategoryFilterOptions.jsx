
import React, { useEffect } from "react";
import { fetchCategories } from "../../../redux/category/thunk/categoryThunk";
import { useDispatch, useSelector } from "react-redux";

const CategoryFilterOptions = ({ activeFilters, onFilterChange }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
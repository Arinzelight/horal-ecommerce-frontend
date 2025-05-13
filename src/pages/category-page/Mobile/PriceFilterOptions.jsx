import React from "react";
import { priceRanges } from "../../../data/mockProducts";

const PriceFilterOptions = ({ activeFilters, onFilterChange }) => (
  <div className="space-y-3">
    {priceRanges.map((range) => (
      <div key={range.id} className="flex items-center">
        <input
          type="radio"
          id={`m-price-${range.id}`}
          checked={activeFilters.price === range.id}
          onChange={() => onFilterChange("price", range.id)}
          name="m-price"
          className="h-4 w-4 text-blue-600"
        />
        <label
          htmlFor={`m-price-${range.id}`}
          className="ml-2 text-sm text-gray-700"
        >
          {range.label}
        </label>
      </div>
    ))}
  </div>
);

export default PriceFilterOptions;

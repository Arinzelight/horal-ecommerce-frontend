import React from "react";
import { ratings } from "../../../data/mockProducts";

const RatingFilterOptions = ({ activeFilters, onFilterChange }) => (
  <div className="space-y-3">
    {ratings.map((rating) => (
      <div key={rating.value} className="flex items-center">
        <input
          type="radio"
          id={`m-rating-${rating.value}`}
          checked={activeFilters.rating === rating.value}
          onChange={() => onFilterChange("rating", rating.value)}
          name="m-rating"
          className="h-4 w-4 text-blue-600"
        />
        <label
          htmlFor={`m-rating-${rating.value}`}
          className="ml-2 text-sm text-gray-700 flex items-center"
        >
          {rating.label}
          <div className="ml-1 flex text-yellow-400">
            {Array(rating.value)
              .fill(0)
              .map((_, i) => (
                <span key={i}>★</span>
              ))}
          </div>
        </label>
      </div>
    ))}
  </div>
);

export default RatingFilterOptions;

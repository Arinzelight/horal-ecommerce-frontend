import React from "react";

const FilterChips = ({ openModal, getActiveFilterCount }) => (
  <div className="flex overflow-x-auto space-x-4 pb-2">
    {[
      { type: "category", label: "Categories" },
      { type: "brand", label: "Brand" },
      { type: "condition", label: "Condition" },
      { type: "rating", label: "Rating" },
      { type: "price", label: "Price" },
      { type: "location", label: "Location" },
    ].map((filter) => (
      <button
        key={filter.type}
        onClick={() => openModal(filter.type)}
        className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm ${
          getActiveFilterCount(filter.type) > 0
            ? "bg-blue-100 text-blue-700 border border-blue-300"
            : "bg-gray-100 text-gray-700 border border-gray-300"
        }`}
      >
        {filter.label}{" "}
        {getActiveFilterCount(filter.type) > 0 &&
          `(${getActiveFilterCount(filter.type)})`}
      </button>
    ))}
  </div>
);

export default FilterChips;

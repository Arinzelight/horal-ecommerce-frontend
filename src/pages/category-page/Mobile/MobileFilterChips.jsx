import React from "react";

const FilterChips = ({
  openModal,
  getActiveFilterCount,
  isSpecificCategoryPage,
}) => (
  <div className="flex overflow-x-auto space-x-4 pb-2">
    {[
      ...(!isSpecificCategoryPage
        ? [{ type: "category", label: "Category" }]
        : []),
      { type: "brand", label: "Brand" },
      { type: "condition", label: "Condition" },
      { type: "rating", label: "Rating" },
      { type: "price", label: "Price" },
      { type: "location", label: "Location" },
    ].map((filter) => (
      <button
        key={filter.type}
        onClick={() => openModal(filter.type)}
        className={`whitespace-nowrap px-2 rounded-md text-sm ${
          getActiveFilterCount(filter.type) > 0
            ? "bg-blue-100 text-primary-700 border border-blue-300"
            : "bg-neutral-200 text-gray-700 border border-gray-300"
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

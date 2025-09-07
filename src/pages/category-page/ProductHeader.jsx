import React from "react";
// import { useParams } from "react-router-dom";

export default function ProductsHeader({ sort, onSortChange }) {
  const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    // { value: "newest", label: "Newest Arrivals" },
    // { value: "oldest", label: "Oldest Arrivals" },
  ];

  return (
    <div className="mb-6 flex justify-end gap-2">
      <div>
        <select
          value={sort || ""}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-2 py-2 text-xs border border-secondary rounded-lg h-8 bg-white hover:bg-gray-50 focus:outline-none  min-w-22"
        >
          <option value="">Sort by...</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

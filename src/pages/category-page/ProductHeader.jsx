// import React from 'react'
// export default function ProductsHeader({
//   title,
//   totalProducts,
//   startIndex,
//   endIndex,
//   sort,
//   onSortChange,
// }) {
//   return (
//     <div className="mb-6">
//       <h1 className="text-2xl font-bold mb-2">{title}</h1>
//       <div className="flex flex-row md:flex-row md:justify-between md:items-center gap-2">
//         <p className="text-gray-600 text-sm">
//           Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
//         </p>
//         <div className="flex items-center">
//           <label htmlFor="sort" className="mr-2 text-sm">
//             Sort by:
//           </label>
//           <select
//             id="sort"
//             className="border rounded-md px-2 py-1 text-sm w-30"
//             value={sort}
//             onChange={(e) => onSortChange(e.target.value)}
//           >
//             <option value="featured">Popularity</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//             <option value="rating">Rating</option>
//             <option value="newest">Newest</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useState } from "react";
import { FaChevronDown, FaTimes} from "react-icons/fa";

export default function ProductsHeader({ sort, onSortChange, clearAllFilters, hasActiveFilters }) {
  const [showSortModal, setShowSortModal] = useState(false);

  const sortOptions = [
    { value: "featured", label: "Popularity" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
    { value: "newest", label: "Newest" },
  ];

  return (
    <div className="mb-6 flex justify-end">
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-100 transition"
        >
          Clear all filters
        </button>
      )}
      <button
        onClick={() => setShowSortModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg h-8 hover:bg-gray-50"
      >
        <span className="text-sm">
          Sort by: {sortOptions.find((option) => option.value === sort)?.label}
        </span>
        <FaChevronDown size={16} />
      </button>

      {showSortModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-xl md:rounded-xl max-w-xs w-full p-6 shadow-xl md:max-w-md md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Sort By</h2>
              <button
                onClick={() => setShowSortModal(false)}
                aria-label="Close modal"
              >
                <FaTimes size={22} />
              </button>
            </div>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`block w-full text-left px-4 py-2 rounded-md text-md ${
                    sort === option.value
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    onSortChange(option.value);
                    setShowSortModal(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
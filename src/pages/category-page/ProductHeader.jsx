import React, { useState, useRef } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
// import { useParams } from "react-router-dom";

export default function ProductsHeader({
  sort,
  onSortChange,
  
}) {
  const [showSortModal, setShowSortModal] = useState(false);
  // const {category} = useParams();
  const buttonRef = useRef(null);

  // const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';


  const sortOptions = [
    { value: "featured", label: "Popularity" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
    { value: "newest", label: "Newest" },
  ];

  // Get button position for modal placement
  const getButtonPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      };
    }
    return { top: 0, left: 0, width: 0 };
  };

  const buttonPosition = getButtonPosition();

  return (
    <div className="mb-6 flex justify-end gap-2">
     
      <button
        ref={buttonRef}
        onClick={() => setShowSortModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-[1px] border-secondary rounded-lg h-8 hover:bg-gray-50"
      >
        <span className="text-xs">
          Sort by: {sortOptions.find((option) => option.value === sort)?.label}
        </span>
        <FaChevronDown size={16} />
      </button>

      {showSortModal && (
        <>
          <div
            className="fixed inset-0 z-40 "
            onClick={() => setShowSortModal(false)}
          />
          <div
            className="fixed z-50 bg-white mt-1 rounded-lg shadow-xl p-4 w-48"
            style={{
              top: `${buttonPosition.top}px`,
              left: `${buttonPosition.left}px`,
            }}
          >
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`block w-full text-left px-2 py-1 rounded-md text-xs ${
                    sort === option.value
                      ? "bg-blue-100 "
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
        </>
      )}
    </div>
  );
}

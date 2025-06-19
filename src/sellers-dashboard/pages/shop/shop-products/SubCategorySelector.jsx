"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { subcategories } from "../../../../data/mockProducts";

const SubcategorySelector = ({
  selectedCategory,
  selectedSubcategory,
  onSubcategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSubcategorySelect = (subcategoryId) => {
    onSubcategoryChange(subcategoryId);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get subcategories for the selected category
  const availableSubcategories = selectedCategory
    ? subcategories[selectedCategory] || []
    : [];

  // Find selected subcategory object
  const selectedSubcategoryObj = availableSubcategories.find(
    (subcat) => subcat.id === selectedSubcategory
  );

  // Don't render if no category is selected or no subcategories available
  if (!selectedCategory || availableSubcategories.length === 0) {
    return null;
  }

  return (
    <div className="mb-4" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Subcategory
      </label>
      <div className="relative">
        <button
          type="button"
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          {selectedSubcategoryObj ? (
            <span>{selectedSubcategoryObj.name}</span>
          ) : (
            <span className="text-gray-500">Select Subcategory</span>
          )}
          <FaChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="max-h-60 overflow-y-auto p-1">
              {availableSubcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  type="button"
                  className="flex items-center px-3 py-2 text-left hover:bg-gray-100 rounded-md w-full text-sm"
                  onClick={() => handleSubcategorySelect(subcategory.id)}
                >
                  <span>{subcategory.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategorySelector;

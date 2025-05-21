
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { categories } from "../../../../data/mockProducts";

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCategorySelect = (categoryId) => {
    onCategoryChange(categoryId);
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

  const selectedCategoryObj = categories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <div className="mb-6 " ref={dropdownRef}>
      <div className="relative md:w-92">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          {selectedCategoryObj ? (
            <span className="flex items-center">
              <span className="mr-2 ">
                {selectedCategoryObj.icon}
              </span>
              {selectedCategoryObj.name}
            </span>
          ) : (
            <span className="text-gray-500">Select Category</span>
          )}
          <FaChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full  bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="max-h-60 overflow-y-auto p-2 grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className="flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-md w-full"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <span className="mr-2 text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;

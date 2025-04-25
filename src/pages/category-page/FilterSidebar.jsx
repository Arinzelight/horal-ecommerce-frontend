import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaTshirt,
  FaGem,
  FaHeartbeat,
  FaMobile,
  FaBaby,
  FaTools,
  FaUtensils,
  FaCar,
  FaWrench,
  FaGamepad,
  FaHome,
  FaBook,
  FaLaptop,
  FaEllipsisH,
} from "react-icons/fa";
import {
  categories,
  getBrands,
  getLocations,
  conditions,
  ratings,
  priceRanges,
} from "../../data/mockProducts";

const FilterOption = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4  pb-2">
      <div
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-gray-700">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && (
        <div className="max-h-60 overflow-y-auto py-2">{children}</div>
      )}
    </div>
  );
};

const FilterSidebar = ({ activeFilters, onFilterChange }) => {
  const brands = getBrands();
  const locations = getLocations();

  //reset filter
  const resetFilters = () => {
    onFilterChange("category", []);
    onFilterChange("brand", []);
    onFilterChange("condition", []);
    onFilterChange("rating", null);
    onFilterChange("price", null);
    onFilterChange("location", []);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">Filter by</h2>
        {activeFilters.length > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-500 hover:text-blue-700 mb-4"
          >
            Clear All
          </button>
        )}
      </div>

      <FilterOption title="Category" defaultOpen={true}>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.name}`}
                checked={activeFilters.category.includes(category.name)}
                onChange={() => onFilterChange("category", category.name)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label
                htmlFor={`category-${category.name}`}
                className="ml-2 text-sm text-gray-700 flex items-center"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Brand">
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand.name}`}
                checked={activeFilters.brand.includes(brand.name)}
                onChange={() => onFilterChange("brand", brand.name)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label
                htmlFor={`brand-${brand.name}`}
                className="ml-2 text-sm text-gray-700"
              >
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Condition">
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center">
              <input
                type="checkbox"
                id={`condition-${condition}`}
                checked={activeFilters.condition.includes(condition)}
                onChange={() => onFilterChange("condition", condition)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label
                htmlFor={`condition-${condition}`}
                className="ml-2 text-sm text-gray-700"
              >
                {condition}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Rating">
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating.value}`}
                checked={activeFilters.rating === rating.value}
                onChange={() => onFilterChange("rating", rating.value)}
                name="rating"
                className="h-4 w-4 text-blue-600"
              />
              <label
                htmlFor={`rating-${rating.value}`}
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
      </FilterOption>

      <FilterOption title="Price">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center">
              <input
                type="radio"
                id={`price-${range.id}`}
                checked={activeFilters.price === range.id}
                onChange={() => onFilterChange("price", range.id)}
                name="price"
                className="h-4 w-4 text-blue-600"
              />
              <label
                htmlFor={`price-${range.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Location">
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location.name} className="flex items-center">
              <input
                type="checkbox"
                id={`location-${location.name}`}
                checked={activeFilters.location.includes(location.name)}
                onChange={() => onFilterChange("location", location.name)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label
                htmlFor={`location-${location.name}`}
                className="ml-2 text-sm text-gray-700"
              >
                {location.name}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>
    </div>
  );
};

export default FilterSidebar;

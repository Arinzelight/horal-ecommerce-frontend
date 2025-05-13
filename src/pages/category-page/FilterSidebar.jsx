import React, { memo, useCallback, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
} from "react-icons/fa";
import {
  categories,
  getBrands,
  getLocations,
  conditions,
  ratings,
  priceRanges,
} from "../../data/mockProducts";

const FilterOption = memo(({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [])

  return (
    <div className="mb-4  p-2 bg-white shadow-lg">
      <div
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={toggleOpen}
      >
        <h3 className="font-semibold text-gray-700">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && (
        <div className="max-h-60 overflow-y-auto py-2">{children}</div>
      )}
    </div>
  );
});

const CheckboxFilter = memo(({ id, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 rounded"
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-700">
      {label}
    </label>
  </div>
));

const FilterSidebar = memo(({ activeFilters, onFilterChange }) => {
  const brands = getBrands();
  const locations = getLocations();

  const handleFilterChange = useCallback((type, value) => {
    onFilterChange(type, value);
  },[onFilterChange])

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
    <div className="flex-shrink-0">
      <FilterOption title="Category" defaultOpen={true}>
        <div className="space-y-2 ">
          {categories.map((category) => (
            <CheckboxFilter
              key={category.name}
              id={`category-${category.name}`}
              label={category.name}
              checked={activeFilters.category?.includes(category.name)}
              onChange={() => handleFilterChange("category", category.name)}
            />
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Brand" defaultOpen={true}>
        <div className="space-y-2">
          {brands.map((brand) => (
            <CheckboxFilter
              key={brand.name}
              id={`brand-${brand.name}`}
              label={brand.name}
              checked={activeFilters.brand?.includes(brand.name)}
              onChange={() => handleFilterChange("brand", brand.name)}
            />
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Condition" defaultOpen={true}>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <CheckboxFilter
              key={condition}
              id={`condition-${condition}`}
              label={condition}
              checked={activeFilters.condition?.includes(condition)}
              onChange={() => handleFilterChange("condition", condition)}
            />
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Rating" defaultOpen={true}>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating.value}`}
                checked={activeFilters.rating === rating.value}
                onChange={() => onFilterChange("rating", rating.value)}
                name="rating"
                className="h-4 w-4 text-primary"
              />
              <label
                htmlFor={`rating-${rating.value}`}
                className={`text-sm flex items-center ${
                  activeFilters.rating === rating.value
                    ? "text-primary"
                    : "text-gray-700"
                }`}
              >
                <div
                  className={`ml-2 mr-1 flex ${
                    activeFilters.rating === rating.value
                      ? "text-primary"
                      : "text-gray-700"
                  }`}
                >
                  <span>
                    <FaStar />
                  </span>
                </div>
                {rating.label}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Price" defaultOpen={true}>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div
              key={range.id}
              onClick={() => onFilterChange("price", range.id)}
              className={`cursor-pointer p-2 rounded transition-colors ${
                activeFilters.price === range.id
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {range.label}
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Location" defaultOpen={true}>
        <div className="space-y-2">
          {locations.map((location) => (
            <CheckboxFilter
              key={location.name}
              id={`location-${location.name}`}
              label={location.name}
              checked={activeFilters.location?.includes(location.name)}
              onChange={() => handleFilterChange("location", location.name)}
            />
          ))}
        </div>
      </FilterOption>
    </div>
  );
});

export default FilterSidebar;

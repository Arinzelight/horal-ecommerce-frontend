import React, { memo, useCallback, useState, useMemo } from "react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { ratings, priceRanges } from "../../utils/price-rating-list";
import { nigerianStates } from "../../layouts/header/StateDropdown";
import { useCategories } from "../../hooks/useCategories";
import { getUniqueBrands } from "../../utils/normalize-brandname";

const FilterOption = memo(({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="mb-4 p-2 bg-white shadow">
      <div
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={toggleOpen}
      >
        <h3 className="font-semibold text-gray-700">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && (
        <div className="max-h-60 overflow-y-auto py-2 capitalize">
          {children}
        </div>
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
      className="h-3 w-3 text-blue-600 rounded"
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-700">
      {label}
    </label>
  </div>
));

const FilterSidebar = memo(
  ({
    activeFilters,
    onFilterChange,
    products,
    isSpecificCategoryPage,
    hideLocationFilter = false,
  }) => {
    // Memoize unique values to prevent unnecessary recalculations
    const uniqueValues = useMemo(() => {
      if (!products || !Array.isArray(products) || products.length === 0) {
        return { brands: [], locations: [], conditions: [] };
      }

      const brands = getUniqueBrands(products);

      const conditions = [
        ...new Set(
          products.map((product) => product.condition).filter(Boolean)
        ),
      ];

      return { brands, conditions };
    }, [products]);

    const locations = nigerianStates;

    const { categories } = useCategories();

    const handleFilterChange = useCallback(
      (type, value) => {
        onFilterChange(type, value);
      },
      [onFilterChange]
    );

    return (
      <div className="flex-shrink-0">
        {/* Only show Category filter if NOT on a specific category page */}
        {!isSpecificCategoryPage && (
          <FilterOption title="Category" defaultOpen={true}>
            <div className="space-y-2">
              {categories &&
                categories.map((category) => (
                  <CheckboxFilter
                    key={category.name}
                    id={`category-${category.name}`}
                    label={category.name}
                    checked={activeFilters.category?.includes(category.name)}
                    onChange={() =>
                      handleFilterChange("category", category.name)
                    }
                  />
                ))}
            </div>
          </FilterOption>
        )}

        <FilterOption title="Brand" defaultOpen={true}>
          <div className="space-y-2">
            {uniqueValues.brands.map((brand) => (
              <CheckboxFilter
                key={brand}
                id={`brand-${brand}`}
                label={brand}
                checked={activeFilters.brand?.includes(brand)}
                onChange={() => handleFilterChange("brand", brand)}
              />
            ))}
          </div>
        </FilterOption>

        <FilterOption title="Condition" defaultOpen={true}>
          <div className="space-y-2">
            {uniqueValues.conditions.map((condition) => (
              <CheckboxFilter
                key={condition}
                id={`condition-${condition}`}
                label={condition.replace("_", " ")}
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
          <div className="space-y-2 scrollbar-hide">
            {priceRanges.map((range) => (
              <div
                key={range.id}
                onClick={() => onFilterChange("price", range.id)}
                className={`cursor-pointer p-2 rounded transition-colors ${
                  activeFilters.price === range.id
                    ? "bg-primary text-white"
                    : "text-neutral-700 "
                }`}
              >
                {range.label}
              </div>
            ))}
          </div>
        </FilterOption>

        {!hideLocationFilter && (
          <FilterOption title="Location" defaultOpen={true}>
            <div className="space-y-2 ">
              {locations.map((location) => (
                <CheckboxFilter
                  key={location}
                  id={`location-${location}`}
                  label={location}
                  checked={activeFilters.location?.includes(location)}
                  onChange={() => handleFilterChange("location", location)}
                />
              ))}
            </div>
          </FilterOption>
        )}
      </div>
    );
  }
);

export default FilterSidebar;

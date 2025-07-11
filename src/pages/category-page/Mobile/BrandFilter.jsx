import React from "react";

const BrandFilterOptions = ({ activeFilters, onFilterChange, products }) => {
  const brands = [
    ...new Set(products.map((product) => product.brand).filter(Boolean)),
  ];

  return (
    <div className="space-y-3">
      {brands.map((brand) => (
        <div key={brand.name} className="flex items-center">
          <input
            type="checkbox"
            id={`m-brand-${brand.name}`}
            checked={activeFilters.brand.includes(brand.name)}
            onChange={() => onFilterChange("brand", brand.name)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label
            htmlFor={`m-brand-${brand.name}`}
            className="ml-2 text-sm text-gray-700"
          >
            {brand.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default BrandFilterOptions;

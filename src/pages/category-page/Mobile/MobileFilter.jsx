import React, { useState } from "react";
import ProductGrid from "../ProductGrid";
import FilterChips from "./MobileFilterChips";
import BrandFilterOptions from "./BrandFilter";
import FilterModal from "./FilterModal";
import CategoryFilterOptions from "./CategoryFilterOptions";
import ConditionFilterOptions from "./ConditionFilterOptions";
import RatingFilterOptions from "./RatingFilterOptions";
import PriceFilterOptions from "./PriceFilterOptions";
import LocationFilterOptions from "./LocationFilterOptions";

const MobileFilters = ({
  activeFilters,
  onFilterChange,
  clearAllFilters,
  products,
  totalProducts,
  productsPerPage,
  currentPage,
  paginate,
  sort,
  handleSortChange,
  isSpecificCategoryPage,
  loading,
  hasProducts = false,
  category
}) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getActiveFilterCount = (filterType) => {
    if (filterType === "rating" || filterType === "price") {
      return activeFilters[filterType] ? 1 : 0;
    }
    return activeFilters[filterType].length;
  };

  const hasActiveFilters = Object.values(activeFilters).some((filter) =>
    Array.isArray(filter) ? filter.length > 0 : filter !== null
  );

  return (
    <div className="mb-6">
      <div className="mb-2">
        <FilterChips
          openModal={openModal}
          getActiveFilterCount={getActiveFilterCount}
          isSpecificCategoryPage={isSpecificCategoryPage}
        />
      </div>

      {/* Render Product Grid below filters when not in modal */}
      <div className="mb-4">
        <ProductGrid
          products={products}
          totalProducts={totalProducts}
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          paginate={paginate}
          sort={sort}
          onSortChange={handleSortChange}
          clearAllFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
          loading={loading}
          hasProducts={hasProducts}
          category={category}

        />
      </div>

      {/* Modals - Only show category modal if NOT on specific category page */}
      {activeModal === "category" && !isSpecificCategoryPage && (
        <FilterModal title="Categories" onClose={closeModal}>
          <CategoryFilterOptions
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            products={products}
          />
        </FilterModal>
      )}

      {activeModal === "brand" && (
        <FilterModal title="Brand" onClose={closeModal}>
          <BrandFilterOptions
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            products={products}
          />
        </FilterModal>
      )}

      {activeModal === "condition" && (
        <FilterModal title="Condition" onClose={closeModal}>
          <ConditionFilterOptions
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            products={products}
          />
        </FilterModal>
      )}

      {activeModal === "rating" && (
        <FilterModal title="Rating" onClose={closeModal}>
          <RatingFilterOptions
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
          />
        </FilterModal>
      )}

      {activeModal === "price" && (
        <FilterModal title="Price" onClose={closeModal}>
          <PriceFilterOptions
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
          />
        </FilterModal>
      )}

      {activeModal === "location" && (
        <FilterModal title="Location" onClose={closeModal}>
          <LocationFilterOptions
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
          />
        </FilterModal>
      )}
    </div>
  );
};

export default MobileFilters;

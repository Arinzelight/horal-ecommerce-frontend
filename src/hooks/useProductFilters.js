import { useState, useMemo, useCallback } from "react";
import { matchesBrandFilter } from "../utils/normalize-brandname";

// Apply filters
const applyFilters = (products, filters, isSpecificCategoryPage) => {
  let filtered = [...products];

  if (filters.category.length > 0 && !isSpecificCategoryPage) {
    filtered = filtered.filter((product) => {
      const categoryName =
        product.category || product.category_object?.category?.name;
      return categoryName && filters.category.includes(categoryName);
    });
  }

  if (filters.brand.length > 0) {
      filtered = filtered.filter((product) =>
        matchesBrandFilter(product, filters.brand)
      );
    }

  if (filters.condition.length > 0) {
    filtered = filtered.filter((product) =>
      filters.condition.includes(product.condition)
    );
  }

  if (filters.location.length > 0) {
    filtered = filtered.filter((product) =>
      filters.location.includes(product.state)
    );
  }

  if (filters.price) {
    const [min, max] = filters.price.split("-").map(Number);
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.price);
      return price >= min && (max ? price <= max : true);
    });
  }

  if (filters.rating) {
    filtered = filtered.filter((product) => {
      const rating = parseFloat(product.rating || 0);
      return rating >= parseFloat(filters.rating);
    });
  }

  return filtered;
};

// Apply sorting
const applySorting = (products, sortType) => {
  const sorted = [...products];
  switch (sortType) {
    case "price-asc":
      return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case "price-desc":
      return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    case "name-asc":
      return sorted.sort((a, b) => a.title?.localeCompare(b.title));
    case "name-desc":
      return sorted.sort((a, b) => b.title?.localeCompare(a.title));
    default:
      return sorted;
  }
};

// Reusable hook
export const useProductFilters = (
  products,
  initialFilters,
  initialSort,
  isSpecificCategoryPage
) => {
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [sort, setSort] = useState(initialSort);

  const processedProducts = useMemo(() => {
    const filtered = applyFilters(
      products,
      activeFilters,
      isSpecificCategoryPage
    );
    return applySorting(filtered, sort);
  }, [products, activeFilters, sort, isSpecificCategoryPage]);

  const handleFilterChange = useCallback((filterType, value) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (filterType === "rating" || filterType === "price") {
        newFilters[filterType] = value;
      } else {
        const currentValues = newFilters[filterType];
        newFilters[filterType] = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value];
      }

      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters(initialFilters);
  }, [initialFilters]);

  return {
    processedProducts,
    activeFilters,
    setActiveFilters,
    sort,
    setSort,
    handleFilterChange,
    clearAllFilters,
  };
};

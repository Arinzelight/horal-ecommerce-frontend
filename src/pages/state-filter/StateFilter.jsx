import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import ProductGrid from "../category-page/ProductGrid";
import MobileFilters from "../category-page/Mobile/MobileFilter";
import useMobile from "../../hooks/use-mobile";
import { fetchProducts } from "../../redux/product/thunks/productThunk";
import FilterSidebar from "../category-page/FilterSidebar";
import { matchesBrandFilter } from "../../utils/normalize-brandname";

// Constants
const PRODUCTS_PER_PAGE = 20;
const DEFAULT_SORT = "newest";

const applyFilters = (products, filters, selectedState) => {
  let filtered = [...products];

  // First filter by the selected state from URL params
  if (selectedState) {
    filtered = filtered.filter(
      (product) => product.state?.toLowerCase() === selectedState.toLowerCase()
    );
  }

  // Apply additional filters
  if (filters.category.length > 0) {
    filtered = filtered.filter((product) =>
      filters.category.includes(
        product.category || product.category_object?.category?.name
      )
    );
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

// Sorting logic (same as SearchResultsPage)
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

const StateFilterPage = () => {
  const { state: stateParam } = useParams(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isMobile = useMobile();

  const { products, loading, error } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(searchParams.get("sort") || DEFAULT_SORT);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    brand: [],
    condition: [],
    rating: null,
    price: null,
  });

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, sort }));
  }, [dispatch, currentPage, sort]);

  // Apply state filtering and other filters
  const processedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const filtered = applyFilters(products, activeFilters, stateParam);
    return applySorting(filtered, sort);
  }, [products, activeFilters, sort, stateParam]);

  // Pagination info
  const totalProducts = processedProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return processedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [processedProducts, currentPage]);

  // Handlers
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = useCallback((filterType, value) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (filterType === "rating" || filterType === "price") {
        newFilters[filterType] = value;
      } else {
        const currentValues = newFilters[filterType];
        newFilters[filterType] = currentValues?.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value];
      }
      return newFilters;
    });
  }, []);

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setSortModalOpen(false);
    setCurrentPage(1);
    setSearchParams({ sort: newSort });
  };

  const clearAllFilters = useCallback(() => {
    setActiveFilters({
      category: [],
      brand: [],
      condition: [],
      rating: null,
      price: null,
    });
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(activeFilters).some(([key, value]) =>
      Array.isArray(value) ? value.length > 0 : value !== null
    );
  }, [activeFilters]);

  // Format state name for display
  const formatStateName = (state) => {
    return state?.charAt(0).toUpperCase() + state?.slice(1).toLowerCase();
  };

  return (
    <main className="min-h-screen lg:mx-auto pt-4">
      <h1 className="text-lg font-semibold mb-4">
        Products in:{" "}
        <span className="text-primary">"{formatStateName(stateParam)}"</span>
      </h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      {isMobile ? (
        <MobileFilters
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          clearAllFilters={clearAllFilters}
          products={processedProducts}
          totalProducts={totalProducts}
          productsPerPage={PRODUCTS_PER_PAGE}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={handlePageChange}
          hasNext={currentPage < totalPages}
          hasPrevious={currentPage > 1}
          sort={sort}
          onSortChange={() => setSortModalOpen(true)}
          sortModalOpen={sortModalOpen}
          setSortModalOpen={setSortModalOpen}
          handleSortChange={handleSortChange}
          loading={loading}
          hasProducts={processedProducts.length > 0}
          hideLocationFilter={true}
        />
      ) : (
        <div className="hidden md:flex flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <FilterSidebar
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              products={products}
              isSpecificCategoryPage={false}
              hideLocationFilter={true}
            />
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="mt-4 text-sm text-gray-900 bg-primary-100 hover:bg-gray-300 px-2 py-1 rounded-md"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="w-full md:w-3/4">
            <ProductGrid
              products={paginatedProducts}
              totalProducts={totalProducts}
              productsPerPage={PRODUCTS_PER_PAGE}
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={handlePageChange}
              hasNext={currentPage < totalPages}
              hasPrevious={currentPage > 1}
              sort={sort}
              onSortChange={handleSortChange}
              loading={loading}
              hasProducts={processedProducts.length > 0}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default StateFilterPage;

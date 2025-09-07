import React, { useState, useEffect, useMemo, useCallback } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import MobileFilters from "./Mobile/MobileFilter";
import useMobile from "../../hooks/use-mobile";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import { fetchProductsByCategoryId } from "../../redux/category/thunk/categoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { useCategories } from "../../hooks/useCategories";
import { fetchProducts } from "../../redux/product/thunks/productThunk";
import HotProductBanner from "../home/ProductBanner";
import { resetProducts } from "../../redux/category/slice/categorySlice";

// Constants
const PRODUCTS_PER_PAGE = 30;
const DEFAULT_SORT = "newest";

// Filter application functions
const applyFilters = (products, filters, isSpecificCategoryPage) => {
  let filtered = [...products];

  // Category filter (only for general products page)
  if (filters.category.length > 0 && !isSpecificCategoryPage) {
    filtered = filtered.filter((product) => {
      // Check both possible data structures for category
      const categoryName =
        product.category || 
        product.category_object?.category?.name; 

      return categoryName && filters.category.includes(categoryName);
    });
  }

  // Brand filter
  if (filters.brand.length > 0) {
    filtered = filtered.filter(
      (product) => product.brand && filters.brand.includes(product.brand)
    );
  }

  // Condition filter
  if (filters.condition.length > 0) {
    filtered = filtered.filter((product) =>
      filters.condition.includes(product.condition)
    );
  }

  // Location filter
  if (filters.location.length > 0) {
    filtered = filtered.filter((product) =>
      filters.location.includes(product.state)
    );
  }

  // Price filter
  if (filters.price) {
    const [min, max] = filters.price.split("-").map(Number);
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.price);
      return price >= min && (max ? price <= max : true);
    });
  }

  // Rating filter
  if (filters.rating) {
    filtered = filtered.filter((product) => {
      const rating = parseFloat(product.rating || 0);
      return rating >= parseFloat(filters.rating);
    });
  }

  return filtered;
};

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

const CategoryPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategories();
  const dispatch = useDispatch();
  const isMobile = useMobile();

  // Redux state
  const {
    products: allProducts,
    count: allProductsCount,
    next: allProductsNext,
    previous: allProductsPrevious,
    loading: allProductsLoading,
  } = useSelector((state) => state.products);

  const {
    products: categoryProducts,
    count: categoryProductsCount,
    next: categoryNext,
    previous: categoryPrevious,
    loading: categoryLoading,
    error: productsError,
  } = useSelector((state) => state.categories);

  // URL-derived state
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const sortFromUrl = searchParams.get("sort") || DEFAULT_SORT;

  // Local state
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    brand: [],
    condition: [],
    rating: null,
    price: null,
    location: [],
  });
  const [sort, setSort] = useState(sortFromUrl);
  const [sortModalOpen, setSortModalOpen] = useState(false);

  // Computed values
  const isSpecificCategoryPage = useMemo(() => {
    return location.pathname.startsWith("/category/") && category;
  }, [location.pathname, category]);

  const categoryId = useMemo(() => {
    if (!category || !categories.length) return null;
    const foundCategory = categories.find(
      (cat) => cat.name.toLowerCase() === category.toLowerCase()
    );
    return foundCategory?.id || null;
  }, [categories, category]);

  // Data source selection
  const dataSource = useMemo(() => {
    if (isSpecificCategoryPage) {
      return {
        products: categoryProducts || [],
        totalCount: categoryProductsCount || 0,
        isLoading: categoryLoading,
        next: categoryNext,
        previous: categoryPrevious,
      };
    }
    return {
      products: allProducts || [],
      totalCount: allProductsCount || 0,
      isLoading: allProductsLoading,
      next: allProductsNext,
      previous: allProductsPrevious,
    };
  }, [
    isSpecificCategoryPage,
    categoryProducts,
    categoryProductsCount,
    categoryLoading,
    categoryNext,
    categoryPrevious,
    allProducts,
    allProductsCount,
    allProductsLoading,
    allProductsNext,
    allProductsPrevious,
  ]);

  // Client-side filtering and sorting
  const processedProducts = useMemo(() => {
    if (!Array.isArray(dataSource.products)) {
      return [];
    }

    const filtered = applyFilters(
      dataSource.products,
      activeFilters,
      isSpecificCategoryPage
    );
    return applySorting(filtered, sort);
  }, [dataSource.products, activeFilters, sort, isSpecificCategoryPage]);

  
  // Pagination calculations
  const paginationInfo = useMemo(
    () => ({
      totalPages: Math.ceil(dataSource.totalCount / PRODUCTS_PER_PAGE),
      hasNext: !!dataSource.next,
      hasPrevious: !!dataSource.previous,
    }),
    [dataSource.totalCount, dataSource.next, dataSource.previous]
  );

  // Active filters check
  const hasActiveFilters = useMemo(() => {
    return Object.entries(activeFilters).some(([key, value]) => {
      if (key === "category") return false;
      return Array.isArray(value) ? value.length > 0 : value !== null;
    });
  }, [activeFilters]);

  // API functions
  const buildApiParams = useCallback(
    (pageNumber) => ({ page: pageNumber }),
    []
  );

  const fetchProductsData = useCallback(
    (pageNumber = 1) => {
      const params = buildApiParams(pageNumber);

      if (isSpecificCategoryPage && categoryId) {
        dispatch(fetchProductsByCategoryId({ categoryId, params }));
      } else {
        dispatch(fetchProducts(params));
      }
    },
    [dispatch, isSpecificCategoryPage, categoryId, buildApiParams]
  );

  const updateUrlParams = useCallback(
    (pageNumber, sortValue) => {
      const params = new URLSearchParams();

      if (pageNumber > 1) {
        params.set("page", pageNumber.toString());
      }
      if (sortValue && sortValue !== DEFAULT_SORT) {
        params.set("sort", sortValue);
      }

      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  // Event handlers
  const handlePageChange = useCallback(
    (pageNumber) => {
      updateUrlParams(pageNumber, sort);
      fetchProductsData(pageNumber);
    },
    [updateUrlParams, fetchProductsData, sort]
  );

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

  const handleSortChange = useCallback(
    (newSort) => {
      setSort(newSort);
      setSortModalOpen(false);
      updateUrlParams(currentPage, newSort);
    },
    [updateUrlParams, currentPage]
  );

  const clearAllFilters = useCallback(() => {
    setActiveFilters({
      category: category ? [category] : [],
      brand: [],
      condition: [],
      rating: null,
      price: null,
      location: [],
    });
  }, [category]);

  // Effects
  useEffect(() => {
    // Initialize filters from URL
    const filtersFromUrl = {
      category: category ? [category] : [],
      brand: searchParams.get("brand")?.split(",") || [],
      condition: searchParams.get("condition")?.split(",") || [],
      location: searchParams.get("location")?.split(",") || [],
      price: searchParams.get("price"),
      average_rating: searchParams.get("average_rating"),
    };

    setActiveFilters(filtersFromUrl);
    setSort(sortFromUrl);
  }, [searchParams, category, sortFromUrl]);

  useEffect(() => {
    // Reset and fetch when category or page changes
    if (isSpecificCategoryPage) {
      dispatch(resetProducts());
    }
    fetchProductsData(currentPage);
  }, [
    category,
    categoryId,
    currentPage,
    fetchProductsData,
    dispatch,
    isSpecificCategoryPage,
  ]);

  // Error state
  if (productsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-md p-6 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-700 mb-4">
            We're having trouble loading this page. Please try again later.
          </p>
          <p className="text-sm text-gray-500">
            Error details: {productsError?.message || productsError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render
  return (
    <main className="min-h-screen lg:mx-auto">
      <div className="pt-3">
        <div className="hidden md:block">
          <HotProductBanner />
        </div>

        <div className="flex items-center justify-between md:justify-start md:gap-32 lg:gap-12 xl:gap-26">
          <h1 className="text-sm md:text-gray-900 md:text-[20px] md:font-bold mb-2">
            {isSpecificCategoryPage
              ? `${
                  category.charAt(0).toUpperCase() + category.slice(1)
                } Products`
              : "Filter by:"}
          </h1>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-900 mb-2 bg-primary-100 hover:bg-gray-300 px-2 py-1 rounded-md"
            >
              Clear filters
            </button>
          )}
        </div>

        {isMobile ? (
          <MobileFilters
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            clearAllFilters={clearAllFilters}
            products={processedProducts}
            totalProducts={dataSource.totalCount}
            productsPerPage={PRODUCTS_PER_PAGE}
            currentPage={currentPage}
            totalPages={paginationInfo.totalPages}
            paginate={handlePageChange}
            hasNext={paginationInfo.hasNext}
            hasPrevious={paginationInfo.hasPrevious}
            sort={sort}
            onSortChange={() => setSortModalOpen(true)}
            sortModalOpen={sortModalOpen}
            setSortModalOpen={setSortModalOpen}
            handleSortChange={handleSortChange}
            isSpecificCategoryPage={isSpecificCategoryPage}
            loading={dataSource.isLoading}
            hasProducts={processedProducts.length > 0}
            category={category}
          />
        ) : (
          <div className="hidden md:flex flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <FilterSidebar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                products={dataSource.products}
                isSpecificCategoryPage={isSpecificCategoryPage}
              />
            </div>
            <div className="w-full md:w-3/4">
              <ProductGrid
                products={processedProducts}
                totalProducts={dataSource.totalCount}
                productsPerPage={PRODUCTS_PER_PAGE}
                currentPage={currentPage}
                totalPages={paginationInfo.totalPages}
                paginate={handlePageChange}
                hasNext={paginationInfo.hasNext}
                hasPrevious={paginationInfo.hasPrevious}
                sort={sort}
                onSortChange={handleSortChange}
                category={category}
                loading={dataSource.isLoading}
                hasProducts={processedProducts.length > 0}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
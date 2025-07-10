import React, { useState, useEffect, useMemo } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import MobileFilters from "./Mobile/MobileFilter";
import useMobile from "../../hooks/use-mobile";
import { useParams, useLocation } from "react-router-dom";
import { fetchProductsByCategoryId } from "../../redux/category/thunk/categoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { useCategories } from "../../hooks/useCategories";
import { fetchProducts } from "../../redux/product/thunks/productThunk";
import HotProductBanner from "../home/ProductBanner";
import { resetProducts } from "../../redux/category/slice/categorySlice";

const CategoryPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const { categories } = useCategories();
  const dispatch = useDispatch();
  const isMobile = useMobile();

  // Redux state
  const {
    products: allProducts,
    count: allProductsCount,
    loading: allProductsLoading,
  } = useSelector((state) => state.products);
  const {
    products: categoryProducts,
    count: categoryProductsCount,
    loading: categoryLoading,
    error: productsError,
  } = useSelector((state) => state.categories);

  // Local state
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    brand: [],
    condition: [],
    rating: null,
    price: null,
    location: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [sort, setSort] = useState("featured");
  const [sortModalOpen, setSortModalOpen] = useState(false);

  // Determine if we're on a specific category page
  const isSpecificCategoryPage = useMemo(() => {
    return location.pathname.startsWith("/category/") && category;
  }, [location.pathname, category]);

  // Find category ID
  const categoryId = useMemo(() => {
    if (!category || !categories.length) return null;
    const foundCategory = categories.find(
      (cat) => cat.name.toLowerCase() === category.toLowerCase()
    );
    return foundCategory?.id || null;
  }, [categories, category]);

  // Determine source data and loading state
  const { sourceProducts,  isLoading } = useMemo(() => {
    if (isSpecificCategoryPage) {
      return {
        sourceProducts: categoryProducts || [],
        totalCount: categoryProductsCount || 0,
        isLoading: categoryLoading,
      };
    } else {
      return {
        sourceProducts: allProducts?.results || [],
        totalCount: allProductsCount || 0,
        isLoading: allProductsLoading,
      };
    }
  }, [
    isSpecificCategoryPage,
    categoryProducts,
    categoryProductsCount,
    categoryLoading,
    allProducts,
    allProductsCount,
    allProductsLoading,
  ]);

  // Apply filters and sorting in a single memoized operation
  const { filteredProducts, sortedProducts } = useMemo(() => {
    // Don't filter if still loading or no products
    if (isLoading || !sourceProducts.length) {
      return { filteredProducts: [], sortedProducts: [] };
    }

    let filtered = [...sourceProducts];

    // Apply filters only if we have products
    if (sourceProducts.length > 0) {
      // Category filter (only for general products page)
      if (activeFilters.category.length > 0 && !isSpecificCategoryPage) {
        filtered = filtered.filter(
          (product) =>
            product.category_object?.category?.name &&
            activeFilters.category.includes(
              product.category_object.category.name
            )
        );
      }

      // Brand filter
      if (activeFilters.brand.length > 0) {
        filtered = filtered.filter(
          (product) =>
            product.brand && activeFilters.brand.includes(product.brand)
        );
      }

      // Condition filter
      if (activeFilters.condition.length > 0) {
        filtered = filtered.filter((product) =>
          activeFilters.condition.includes(product.condition)
        );
      }

      // Location filter
      if (activeFilters.location.length > 0) {
        filtered = filtered.filter((product) =>
          activeFilters.location.includes(product.state)
        );
      }

      // Price filter
      if (activeFilters.price) {
        const [min, max] = activeFilters.price.split("-").map(Number);
        filtered = filtered.filter((product) => {
          const price = parseFloat(product.price);
          return price >= min && (max ? price <= max : true);
        });
      }
    }

    // Apply sorting
    let sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        break;
    }

    return { filteredProducts: filtered, sortedProducts: sorted };
  }, [sourceProducts, activeFilters, sort, isSpecificCategoryPage, isLoading]);

  // Pagination
  const { currentProducts  } = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const products = sortedProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    const pages = Math.ceil(sortedProducts.length / productsPerPage);

    return { currentProducts: products, pageCount: pages };
  }, [sortedProducts, currentPage, productsPerPage]);

  // Fetch products when component mounts or category changes
  useEffect(() => {
    dispatch(resetProducts());
    setCurrentPage(1);

    if (category && categoryId) {
      dispatch(fetchProductsByCategoryId(categoryId));
    } else if (!category) {
      dispatch(fetchProducts());
    }
  }, [category, categoryId, dispatch]);

  // Update category filter when URL parameter changes
  useEffect(() => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      category: category ? [category] : [],
    }));
  }, [category]);

  // Reset to first page when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, sort]);

  // Event handlers
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (filterType === "rating" || filterType === "price") {
        newFilters[filterType] = value;
      } else {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(
            (item) => item !== value
          );
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      }

      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      category: category ? [category] : [],
      brand: [],
      condition: [],
      rating: null,
      price: null,
      location: [],
    });
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setSortModalOpen(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Check for active filters (excluding category for specific category pages)
  const hasActiveFilters = Object.entries(activeFilters).some(
    ([key, value]) => {
      if (key === "category") return false;
      return Array.isArray(value) ? value.length > 0 : value !== null;
    }
  );

  // Error state
  if (productsError) {
    return (
      <main className="min-h-screen lg:mx-auto">
        <div className="pt-8 flex justify-center items-center">
          <div className="text-lg text-red-500">Error: {productsError}</div>
        </div>
      </main>
    );
  }

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
            products={currentProducts}
            totalProducts={sortedProducts.length}
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            paginate={paginate}
            sort={sort}
            onSortChange={() => setSortModalOpen(true)}
            sortModalOpen={sortModalOpen}
            setSortModalOpen={setSortModalOpen}
            handleSortChange={handleSortChange}
            isSpecificCategoryPage={isSpecificCategoryPage}
            loading={isLoading}
            hasProducts={sourceProducts.length > 0}
            category={category}
          />
        ) : (
          <div className="hidden md:flex flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <FilterSidebar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                products={sourceProducts}
                isSpecificCategoryPage={isSpecificCategoryPage}
              />
            </div>
            <div className="w-full md:w-3/4">
              <ProductGrid
                products={currentProducts}
                totalProducts={sortedProducts.length}
                productsPerPage={productsPerPage}
                currentPage={currentPage}
                paginate={paginate}
                sort={sort}
                onSortChange={handleSortChange}
                category={category}
                loading={isLoading}
                hasProducts={sourceProducts.length > 0}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;

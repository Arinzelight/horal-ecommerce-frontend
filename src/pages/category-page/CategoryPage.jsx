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
import { useProductFilters } from "../../hooks/useProductFilters";

const PRODUCTS_PER_PAGE = 30;
const DEFAULT_SORT = "newest";

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

  // URL state
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const sortFromUrl = searchParams.get("sort") || DEFAULT_SORT;

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

  // Pick correct products
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

  //  Use reusable filter hook
  const {
    processedProducts,
    activeFilters,
    setActiveFilters,
    sort,
    setSort,
    handleFilterChange,
    clearAllFilters,
  } = useProductFilters(
    dataSource.products,
    {
      category: category ? [category] : [],
      brand: [],
      condition: [],
      rating: null,
      price: null,
      location: [],
    },
    sortFromUrl,
    isSpecificCategoryPage
  );

  // Pagination
  const paginationInfo = useMemo(
    () => ({
      totalPages: Math.ceil(dataSource.totalCount / PRODUCTS_PER_PAGE),
      hasNext: !!dataSource.next,
      hasPrevious: !!dataSource.previous,
    }),
    [dataSource.totalCount, dataSource.next, dataSource.previous]
  );

  const updateUrlParams = useCallback(
    (pageNumber, sortValue) => {
      const params = new URLSearchParams();
      if (pageNumber > 1) params.set("page", pageNumber.toString());
      if (sortValue && sortValue !== DEFAULT_SORT)
        params.set("sort", sortValue);
      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (pageNumber) => {
      updateUrlParams(pageNumber, sort);
      if (isSpecificCategoryPage && categoryId) {
        dispatch(
          fetchProductsByCategoryId({
            categoryId,
            params: { page: pageNumber },
          })
        );
      } else {
        dispatch(fetchProducts({ page: pageNumber }));
      }
    },
    [updateUrlParams, sort, isSpecificCategoryPage, categoryId, dispatch]
  );

  const handleSortChange = useCallback(
    (newSort) => {
      setSort(newSort);
      updateUrlParams(currentPage, newSort);
    },
    [updateUrlParams, currentPage, setSort]
  );

  // Effects
  useEffect(() => {
    if (isSpecificCategoryPage) dispatch(resetProducts());
    handlePageChange(currentPage);
  }, [
    category,
    categoryId,
    currentPage,
    dispatch,
    isSpecificCategoryPage,
    handlePageChange,
  ]);

  if (productsError) {
    return <div>Error: {productsError?.message || productsError}</div>;
  }

  return (
    <main className="min-h-screen lg:mx-auto">
      <div className="pt-3">
        <div className="hidden md:block">
          <HotProductBanner />
        </div>

        <div className="flex items-center justify-between md:gap-32">
          <h1 className="text-sm md:text-[20px] md:font-bold mb-2">
            {isSpecificCategoryPage
              ? `${
                  category.charAt(0).toUpperCase() + category.slice(1)
                } Products`
              : "Filter by:"}
          </h1>
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-900 mb-2 bg-primary-100 hover:bg-gray-300 px-2 py-1 rounded-md"
          >
            Clear filters
          </button>
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
            onSortChange={handleSortChange}
            isSpecificCategoryPage={isSpecificCategoryPage}
            loading={dataSource.isLoading}
            hasProducts={processedProducts.length > 0}
            category={category}
          />
        ) : (
          <div className="hidden md:flex flex-row gap-6">
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

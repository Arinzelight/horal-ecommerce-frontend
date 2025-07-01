import React, { useState, useEffect, useMemo } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import MobileFilters from "./Mobile/MobileFilter";
import useMobile from "../../hooks/use-mobile";
import { useParams } from "react-router-dom";
import { fetchProductsByCategoryId } from "../../redux/category/thunk/categoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { useCategories } from "../../hooks/useCategories";
import { fetchProducts } from "../../redux/product/thunks/productThunk";
const CategoryPage = () => {
  const { category } = useParams();
  const { categories } = useCategories();
  const { products } = useSelector((state) => state.products);
  const allProducts = products?.results || [];

  const isMobile = useMobile();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    brand: [],
    condition: [],
    rating: null,
    price: null,
    location: [],
  });

  const {
    products: productsByCategory,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [sort, setSort] = useState("featured");
  const [sortModalOpen, setSortModalOpen] = useState(false);

  // Find category ID based on category name from URL
  const categoryId = useMemo(() => {
    const foundCategory = categories.find(
      (cat) => cat.name.toLowerCase() === category?.toLowerCase()
    );
    return foundCategory?.id;
  }, [categories, category]);

  // Fetch products when category ID is available
  useEffect(() => {
    if (category && categoryId) {
      dispatch(fetchProductsByCategoryId(categoryId));
    } else if (!category) {
      dispatch(fetchProducts());
    }
  }, [category, categoryId, dispatch]);

  // Update category filter when URL parameter changes
  useEffect(() => {
    if (category) {
      setActiveFilters((prevFilters) => ({
        ...prevFilters,
        category: [category],
      }));
    } else {
      setActiveFilters((prevFilters) => ({
        ...prevFilters,
        category: [],
      }));
    }
  }, [category]);

  // Determine which products to use based on whether a category is specified
  const sourceProducts = useMemo(() => {
    return category ? productsByCategory : allProducts;
  }, [category, productsByCategory, allProducts]);

  // Apply filters to products from Redux store
  useEffect(() => {
    if (!sourceProducts || !Array.isArray(sourceProducts)) {
      setFilteredProducts([]);
      return;
    }

    let result = [...sourceProducts];

    // Filter by brand
    if (activeFilters.brand.length > 0) {
      result = result.filter(
        (product) =>
          product.brand && activeFilters.brand.includes(product.brand)
      );
    }

    // Filter by condition
    if (activeFilters.condition.length > 0) {
      result = result.filter((product) =>
        activeFilters.condition.includes(product.condition)
      );
    }

    // Filter by location (using state field)
    if (activeFilters.location.length > 0) {
      result = result.filter((product) =>
        activeFilters.location.includes(product.state)
      );
    }

    // Filter by price
    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split("-").map(Number);
      result = result.filter((product) => {
        const price = parseFloat(product.price);
        return price >= min && (max ? price <= max : true);
      });
    }



    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters,sourceProducts, category]);

  // Memoize sorted products to avoid recomputation
  const sortedProducts = useMemo(() => {
    if (!filteredProducts || !Array.isArray(filteredProducts)) {
      return [];
    }

    let sorted = [...filteredProducts];
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
    return sorted;
  }, [filteredProducts, sort]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update filters
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

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      category: [category], // Keep the category filter
      brand: [],
      condition: [],
      rating: null,
      price: null,
      location: [],
    });
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
    setSortModalOpen(false);
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (filter) => (Array.isArray(filter) ? filter.length > 1 : filter !== null) // Changed from > 0 to > 1 to account for category filter
  );

  // Loading and error states
  // if (productsLoading) {
  //   return (
  //     <main className="min-h-screen lg:mx-auto">
  //       <div className="pt-8 flex justify-center items-center">
  //         <div className="text-lg">Loading products...</div>
  //       </div>
  //     </main>
  //   );
  // }

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
      <div className="pt-8">
        <div className="flex items-center justify-between md:justify-start md:gap-32 lg:gap-12 xl:gap-26">
          <h1 className="text-sm md:text-gray-900 md:text-[20px] md:font-bold mb-2">
            Filter by:
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
          />
        ) : (
          <div className="hiddden flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <FilterSidebar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                products={sourceProducts}
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
                clearAllFilters={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
                category={category}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;

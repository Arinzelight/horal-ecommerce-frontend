import React, { useState, useEffect, useMemo } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import MobileFilters from "./Mobile/MobileFilter";
import { mockProducts } from "../../data/mockProducts";
import useMobile from "../../hooks/use-mobile";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const {category} = useParams();
  const isMobile = useMobile();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
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
  
   // Update category filter when URL parameter changes
  useEffect(() => {
    if (category) {
      setActiveFilters((prevFilters) => ({
        ...prevFilters,
        category: [category],
      }));
    }
  }, [category]);
  // Apply filters to products
  useEffect(() => {
    let result = [...mockProducts];

    // Filter by category
    if (activeFilters.category.length > 0) {
      result = result.filter((product) =>
        activeFilters.category.includes(product.category)
      );
    }

    // Filter by brand
    if (activeFilters.brand.length > 0) {
      result = result.filter((product) =>
        activeFilters.brand.includes(product.brand)
      );
    }

    // Filter by condition
    if (activeFilters.condition.length > 0) {
      result = result.filter((product) =>
        activeFilters.condition.includes(product.condition)
      );
    }

    // Filter by rating
    if (activeFilters.rating) {
      result = result.filter(
        (product) => product.rating >= activeFilters.rating
      );
    }

    // Filter by location
    if (activeFilters.location.length > 0) {
      result = result.filter((product) =>
        activeFilters.location.includes(product.location)
      );
    }

    // Filter by price
    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split("-").map(Number);
      result = result.filter(
        (product) => product.price >= min && (max ? product.price <= max : true)
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters]);

  //memoize sorted products to avoid recomputation
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
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
      category: [],
      brand: [],
      condition: [],
      rating: null,
      price: null,
      location: [],
    });
    setCurrentPage(1);
  };
  //handle sort change
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setCurrentPage(1) // Reset to first page when sort changes
    setSortModalOpen(false)
  };

   const hasActiveFilters = Object.values(activeFilters).some((filter) =>
     Array.isArray(filter) ? filter.length > 0 : filter !== null
   );

  return (
    <div className="max-w-7xl mx-auto  py-8">
      <div className="container mx-auto px-4 py-8">
        {/* <ProductsHeader sort={sort} onSortChange={handleSortChange} /> */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="mb-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            Clear all filters
          </button>
        )}
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
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <FilterSidebar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
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
    </div>
  );
};

export default CategoryPage;

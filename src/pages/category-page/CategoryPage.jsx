// import { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"
// import { mockProducts, categories } from "../../data/mockProducts"
// import useMobile  from "../../hooks/use-mobile"

// // Import components
// import FilterSidebar from "./FilterSidebar"
// import MobileFilterChips from "./MobileFilterChips"
// import MobileFilterDrawer from "./MobileFilterDrawer"
// import {
//   CategoryFilterContent,
//   BrandFilterContent,
//   ConditionFilterContent,
//   RatingFilterContent,
//   PriceFilterContent,
//   LocationFilterContent,
// } from "./MobileFilterContent"
// import ProductGrid from "./ProductGrid"
// import Pagination from "./Pagination"
// import ProductsHeader from "./ProductHeader"

// export default function CategoryPage() {
//   const { categoryName } = useParams()
//   const isMobile = useMobile()

//   // State for filters
//   const [showFilters, setShowFilters] = useState(!isMobile)
//   const [selectedCategories, setSelectedCategories] = useState([])
//   const [selectedBrands, setSelectedBrands] = useState([])
//   const [selectedConditions, setSelectedConditions] = useState([])
//   const [selectedRating, setSelectedRating] = useState(null)
//   const [priceRange, setPriceRange] = useState([0, 1000000])
//   const [selectedState, setSelectedState] = useState(null)
//   const [selectedLGA, setSelectedLGA] = useState(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [sortBy, setSortBy] = useState("featured")

//   // Mobile filter drawer state
//   const [activeFilter, setActiveFilter] = useState(null)

//   // Set initial category from URL if provided
//   useEffect(() => {
//     if (categoryName && categoryName !== "all") {
//       setSelectedCategories([categoryName])
//     }
//   }, [categoryName])

//   // Reset page when filters change
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [selectedCategories, selectedBrands, selectedConditions, selectedRating, priceRange, selectedState, selectedLGA])

//   // Pagination
//   const productsPerPage = 12

//   // Filter products based on selected filters
//   const filteredProducts = mockProducts.filter((product) => {
//     // Filter by categories
//     if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
//       return false
//     }

//     // Filter by brands
//     if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
//       return false
//     }

//     // Filter by condition
//     if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
//       return false
//     }

//     // Filter by rating
//     if (selectedRating && product.rating < selectedRating) {
//       return false
//     }

//     // Filter by price range
//     if (product.price < priceRange[0] || product.price > priceRange[1]) {
//       return false
//     }

//     // Filter by state
//     if (selectedState && product.location !== selectedState) {
//       return false
//     }

//     // Filter by LGA
//     if (selectedLGA && product.localGvt !== selectedLGA) {
//       return false
//     }

//     return true
//   })

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortBy) {
//       case "price-asc":
//         return a.price - b.price
//       case "price-desc":
//         return b.price - a.price
//       case "rating":
//         return b.rating - a.rating
//       case "newest":
//         // Assuming newer products have higher IDs
//         return b.id - a.id
//       default:
//         // Featured - no specific sorting
//         return 0
//     }
//   })

//   // Calculate pagination
//   const indexOfLastProduct = currentPage * productsPerPage
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
//   const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
//   const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

//   // Get unique brands, conditions, states, and LGAs for filters
//   const brands = Array.from(new Set(mockProducts.map((product) => product.brand)))
//   const conditions = Array.from(new Set(mockProducts.map((product) => product.condition)))
//   const states = Array.from(new Set(mockProducts.map((product) => product.location)))
//   const lgas = Array.from(new Set(mockProducts.map((product) => product.localGvt)))

//     useEffect(() => {
//     console.log("Filtered products count:", filteredProducts.length);
//     console.log("Current products count:", currentProducts.length);
//   }, [filteredProducts, currentProducts]);
//   // Price ranges for filter
//   const priceRanges = [
//     { min: 0, max: 10000, label: "₦0 - ₦10,000" },
//     { min: 10000, max: 50000, label: "₦10,000 - ₦50,000" },
//     { min: 50000, max: 100000, label: "₦50,000 - ₦100,000" },
//     { min: 100000, max: 200000, label: "₦100,000 - ₦200,000" },
//     { min: 200000, max: 500000, label: "₦200,000 - ₦500,000" },
//     { min: 500000, max: 1000000, label: "₦500,000 - ₦1,000,000" },
//     { min: 1000000, max: 10000000, label: "Above ₦1,000,000" },
//   ]

//   // Handle category selection
//   const handleCategoryChange = (category) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter((c) => c !== category))
//     } else {
//       setSelectedCategories([...selectedCategories, category])
//     }
//   }

//   // Handle brand selection
//   const handleBrandChange = (brand) => {
//     if (selectedBrands.includes(brand)) {
//       setSelectedBrands(selectedBrands.filter((b) => b !== brand))
//     } else {
//       setSelectedBrands([...selectedBrands, brand])
//     }
//   }

//   // Handle condition selection
//   const handleConditionChange = (condition) => {
//     if (selectedConditions.includes(condition)) {
//       setSelectedConditions(selectedConditions.filter((c) => c !== condition))
//     } else {
//       setSelectedConditions([...selectedConditions, condition])
//     }
//   }

//   // Handle rating selection
//   const handleRatingChange = (rating) => {
//     setSelectedRating(selectedRating === rating ? null : rating)
//   }

//   // Handle price range selection
//   const handlePriceRangeChange = (min, max) => {
//     setPriceRange([min, max])
//   }

//   // Handle state selection
//   const handleStateChange = (state) => {
//     setSelectedState(selectedState === state ? null : state)
//     setSelectedLGA(null) // Reset LGA when state changes
//   }

//   // Handle LGA selection
//   const handleLGAChange = (lga) => {
//     setSelectedLGA(selectedLGA === lga ? null : lga)
//   }

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//     window.scrollTo(0, 0)
//   }

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedCategories([])
//     setSelectedBrands([])
//     setSelectedConditions([])
//     setSelectedRating(null)
//     setPriceRange([0, 1000000])
//     setSelectedState(null)
//     setSelectedLGA(null)
//     setCurrentPage(1)
//   }

//   // Open specific filter drawer
//   const openFilterDrawer = (filterId) => {
//     setActiveFilter(filterId)
//   }

//   // Close filter drawer
//   const closeFilterDrawer = () => {
//     setActiveFilter(null)
//   }

//   // Mobile filter chips options
//   const mobileFilterOptions = [
//     {
//       id: "categories",
//       label: "Categories",
//       isActive: selectedCategories.length > 0,
//       onClick: () => openFilterDrawer("categories"),
//     },
//     {
//       id: "brand",
//       label: "Brand",
//       isActive: selectedBrands.length > 0,
//       onClick: () => openFilterDrawer("brand"),
//     },
//     {
//       id: "price",
//       label: "Price",
//       isActive: priceRange[0] > 0 || priceRange[1] < 1000000,
//       onClick: () => openFilterDrawer("price"),
//     },
//     {
//       id: "condition",
//       label: "Condition",
//       isActive: selectedConditions.length > 0,
//       onClick: () => openFilterDrawer("condition"),
//     },
//     {
//       id: "rating",
//       label: "Rating",
//       isActive: selectedRating !== null,
//       onClick: () => openFilterDrawer("rating"),
//     },
//     {
//       id: "location",
//       label: "Location",
//       isActive: selectedState !== null,
//       onClick: () => openFilterDrawer("location"),
//     },
//   ]

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Mobile Filter Chips */}
//       {isMobile && <MobileFilterChips filterOptions={mobileFilterOptions} />}

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Filters Sidebar - Only shown on desktop */}
//         {!isMobile && (
//           <FilterSidebar
//             categories={categories}
//             brands={brands}
//             conditions={conditions}
//             states={states}
//             lgas={lgas}
//             priceRanges={priceRanges}
//             selectedCategories={selectedCategories}
//             selectedBrands={selectedBrands}
//             selectedConditions={selectedConditions}
//             selectedRating={selectedRating}
//             priceRange={priceRange}
//             selectedState={selectedState}
//             selectedLGA={selectedLGA}
//             onCategoryChange={handleCategoryChange}
//             onBrandChange={handleBrandChange}
//             onConditionChange={handleConditionChange}
//             onRatingChange={handleRatingChange}
//             onPriceRangeChange={handlePriceRangeChange}
//             onStateChange={handleStateChange}
//             onLGAChange={handleLGAChange}
//             onClearFilters={clearAllFilters}
//             isMobile={isMobile}
//           />
//         )}

//         {/* Products Section */}
//         <div className="flex-1 flex flex-col">
//           {/* Products Header */}
//           <ProductsHeader
//             title={categoryName}
//             totalProducts={sortedProducts.length}
//             startIndex={indexOfFirstProduct}
//             endIndex={indexOfLastProduct}
//             onSortChange={setSortBy}
//           />

//           {/* Products Grid */}
//           <div className="flex-grow">
//             <ProductGrid
//               products={currentProducts}
//               filteredProductsCount={filteredProducts.length}
//               emptyMessage="No products found matching your filters."
//               onClearFilters={clearAllFilters}
//             />
//           </div>

//           {/* Pagination - at the bottom */}
//           <div className="mt-auto pt-6">
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Drawers */}
//       {isMobile && (
//         <>
//           {/* Categories Filter */}
//           <MobileFilterDrawer
//             isOpen={activeFilter === "categories"}
//             onClose={closeFilterDrawer}
//             title="Categories"
//           >
//             <CategoryFilterContent
//               categories={categories}
//               selectedCategories={selectedCategories}
//               onCategoryChange={handleCategoryChange}
//             />
//           </MobileFilterDrawer>

//           {/* Brand Filter */}
//           <MobileFilterDrawer
//             isOpen={activeFilter === "brand"}
//             onClose={closeFilterDrawer}
//             title="Brand"
//           >
//             <BrandFilterContent
//               brands={brands}
//               selectedBrands={selectedBrands}
//               onBrandChange={handleBrandChange}
//             />
//           </MobileFilterDrawer>

//           {/* Price Filter */}
//           <MobileFilterDrawer
//             isOpen={activeFilter === "price"}
//             onClose={closeFilterDrawer}
//             title="Price"
//           >
//             <PriceFilterContent
//               priceRanges={priceRanges}
//               priceRange={priceRange}
//               onPriceRangeChange={handlePriceRangeChange}
//             />
//           </MobileFilterDrawer>

//           {/* Condition Filter */}
//           <MobileFilterDrawer
//             isOpen={activeFilter === "condition"}
//             onClose={closeFilterDrawer}
//             title="Condition"
//           >
//             <ConditionFilterContent
//               conditions={conditions}
//               selectedConditions={selectedConditions}
//               onConditionChange={handleConditionChange}
//             />
//           </MobileFilterDrawer>

//           {/* Rating Filter */}
//           <MobileFilterDrawer
//             isOpen={activeFilter === "rating"}
//             onClose={closeFilterDrawer}
//             title="Rating"
//           >
//             <RatingFilterContent
//               selectedRating={selectedRating}
//               onRatingChange={handleRatingChange}
//             />
//           </MobileFilterDrawer>

//           {/* Location Filter */}
//           <MobileFilterDrawer
//             isOpen={activeFilter === "location"}
//             onClose={closeFilterDrawer}
//             title="Location"
//           >
//             <LocationFilterContent
//               states={states}
//               lgas={lgas}
//               selectedState={selectedState}
//               selectedLGA={selectedLGA}
//               onStateChange={handleStateChange}
//               onLGAChange={handleLGAChange}
//             />
//           </MobileFilterDrawer>
//         </>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import MobileFilters from "./Mobile/MobileFilter";
import { mockProducts } from "../../data/mockProducts";
import useMobile from "../../hooks/use-mobile";
import ProductsHeader from "./ProductHeader";

const CategoryPage = () => {
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
                onSortChange={() => setSortModalOpen(true)}
                sortModalOpen={sortModalOpen}
                setSortModalOpen={setSortModalOpen}
                handleSortChange={handleSortChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

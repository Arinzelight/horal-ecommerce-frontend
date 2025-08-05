import React from "react";
import InitialLoader from "../../components/InitialLoader";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import ProductsHeader from "./ProductHeader";

const ProductGrid = ({
  products = [],
  totalProducts,
  productsPerPage,
  currentPage,
  paginate,
  sort,
  onSortChange,
  category,
  loading = false,
}) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  // Show loading state
  if (loading) {
    return (
      <div className="">
        <div className="flex justify-between items-center mb-2">
          <h1 className="hidden md:block text-xs font-medium">
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "All Products"}
            <span className="text-gray-500 text-xs ml-2">(Loading...)</span>
          </h1>
          <ProductsHeader sort={sort} onSortChange={onSortChange} />
        </div>

        <div className="grid grid-cols-2 md:grid-col-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-lg h-64"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // No products found
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No products found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  // Products available
  return (
    <div className="">
      <div className="flex justify-between items-center mb-2">
        <h1 className="hidden md:block text-xs font-medium">
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "All Products"}
          <span className="text-gray-500 text-xs ml-2">
            ({totalProducts} products found)
          </span>
        </h1>
        <ProductsHeader sort={sort} onSortChange={onSortChange} />
      </div>

      <div className="grid grid-cols-2 md:grid-col-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="my-2 flex justify-between items-center">
        <div className="text-gray-600 text-sm">
          Showing {(currentPage - 1) * productsPerPage + 1}-
          {Math.min(currentPage * productsPerPage, totalProducts)} of{" "}
          {totalProducts}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default ProductGrid;

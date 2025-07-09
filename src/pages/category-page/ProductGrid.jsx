import React from "react";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import ProductsHeader from "./ProductHeader";

const ProductGrid = ({
  products,
  totalProducts,
  productsPerPage,
  currentPage,
  paginate,
  sort,
  onSortChange,
  category,
  // clearAllFilters,
  // hasActiveFilters
  
}) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

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
        <ProductsHeader
          sort={sort}
          onSortChange={onSortChange}
          // clearAllFilters={clearAllFilters}
          // hasActiveFilters={hasActiveFilters}
        />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filter options to find what you're looking for.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-col-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="my-2 flex justify-between items-center">
            <div className="text-gray-600 text-sm">
              Showing {(currentPage - 1) * productsPerPage + 1}-
              {Math.min(currentPage * productsPerPage, totalProducts)}(
              {totalProducts} )
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={pageCount}
              onPageChange={paginate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;

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
  hasProducts = false,
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
            {loading ? "(Loading...)" : `(${totalProducts} products found)`}
          </span>
        </h1>
        <ProductsHeader sort={sort} onSortChange={onSortChange} />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-col-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-lg aspect-[3/4]"
            />
          ))}
        </div>
      ) : (
        <>
          {!hasProducts ? (
            // No products from API at all
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
              <p className="text-gray-600">Try adjusting your search terms.</p>
            </div>
          ) : products.length === 0 ? (
            // Has products but filters exclude them all
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.312 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No products match your filters
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more products.
              </p>
            </div>
          ) : (
            // Show products and pagination
            <>
              <div className="grid grid-cols-2 md:grid-col-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalProducts > 0 && (
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
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;

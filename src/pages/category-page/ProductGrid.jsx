
// import ProductCard from "../../components/ProductCard"

// export default function ProductGrid({
//   products,
//   emptyMessage = "No products found.",
//   onClearFilters,
// }) {
//   if (!products || products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-lg text-gray-600">{emptyMessage}</p>
//         <button onClick={onClearFilters} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//           Clear Filters
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   )
// }


import React from "react";
import ProductCard from "../../components/ProductCard";
import Pagination from "./Pagination";
import ProductsHeader from "./ProductHeader";

const ProductGrid = ({
  products,
  totalProducts,
  productsPerPage,
  currentPage,
  paginate,
  sort,
  onSortChange,
  clearAllFilters,
  hasActiveFilters
  
}) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="pt-4">
      <ProductsHeader
        
        sort={sort}
        onSortChange={() => {
          onSortChange;
        }}
        clearAllFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
      />

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
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div className="text-gray-600 text-sm">
              Showing {(currentPage - 1) * productsPerPage + 1}-
              {Math.min(currentPage * productsPerPage, totalProducts)}({totalProducts} )
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

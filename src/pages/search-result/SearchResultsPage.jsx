import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductGrid from "../category-page/ProductGrid";
import { fetchProducts } from "../../redux/product/thunks/productThunk";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const queryParam = useQuery().get("q") || "";
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("latest");

  const productsPerPage = 12;

  useEffect(() => {
    if (queryParam.trim()) {
      dispatch(fetchProducts({ q: queryParam, page: currentPage, sort }));
    }
  }, [queryParam, dispatch, currentPage, sort]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const productList = products?.results || [];
  const totalProducts = products?.count || 0;

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <h1 className="text-lg font-semibold mb-4">
        Search Results for: <span className="text-primary">"{queryParam}"</span>
      </h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      <ProductGrid
        products={productList}
        totalProducts={totalProducts}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        paginate={handlePageChange}
        sort={sort}
        onSortChange={handleSortChange}
        loading={loading}
        hasProducts={!!products && totalProducts > 0}
      />
    </div>
  );
};

export default SearchResultsPage;

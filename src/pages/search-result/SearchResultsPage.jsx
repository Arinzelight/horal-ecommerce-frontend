import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductGrid from "../category-page/ProductGrid";
import { fetchProducts } from "../../redux/product/thunks/productThunk";

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || "";
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("latest");

  const productsPerPage = 12;

  useEffect(() => {
    if (queryParam.trim()) {
      dispatch(fetchProducts({ search: queryParam, page: currentPage, sort }));
    }
  }, [queryParam, dispatch, currentPage, sort]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  const productList = products || [];
  const totalProducts = products?.length || 0;

  return (
    <div className="mt-4 ">
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

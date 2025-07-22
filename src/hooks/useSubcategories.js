// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { fetchSubcategoriesByCategoryId } from "../redux/category/thunk/categoryThunk";

// export const useSubcategories = (categoryId) => {
//   const dispatch = useDispatch();
//   const { subcategories, subcategoriesLoading, subcategoriesCache, error } =
//     useSelector((state) => state.categories);

//   useEffect(() => {
//     if (categoryId && !subcategoriesCache[categoryId]) {
//       dispatch(fetchSubcategoriesByCategoryId(categoryId));
//     }
//   }, [dispatch, categoryId, subcategoriesCache]);

//   return {
//     subcategories: categoryId
//       ? subcategoriesCache[categoryId] || subcategories
//       : [],
//     loading: subcategoriesLoading,
//     error,
//   };
// };



import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSubcategoriesByCategoryId } from "../redux/category/thunk/categoryThunk";

export const useSubcategories = (categoryId) => {
  const dispatch = useDispatch();
  const { subcategories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (categoryId) {
      console.log("Fetching subcategories for category:", categoryId);
      dispatch(fetchSubcategoriesByCategoryId(categoryId));
    }
  }, [dispatch, categoryId]);

  return {
    subcategories,
    loading,
    error,
  };
};
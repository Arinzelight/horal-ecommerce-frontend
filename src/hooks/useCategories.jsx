// hooks/useCategories.js
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../redux/category/thunk/categoryThunk";


export const useCategories = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error, } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
      dispatch(fetchCategories());
    
  }, [dispatch]);

  return {
    categories,
    isLoading,
    error,  
  };
};

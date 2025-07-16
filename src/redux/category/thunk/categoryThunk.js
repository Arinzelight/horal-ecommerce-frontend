import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { addIconsToCategories } from "../../../utils/categoryIconMapper";

 // Async thunk for fetching categories
 export const fetchCategories = createAsyncThunk(
   "categories/fetchCategories",
   async (_, { rejectWithValue }) => {
     try {
       const response = await api.get("category/");
       const data = response.data;

       // Add icons to categories before returning
       const categoriesWithIcons = addIconsToCategories(data.data);

       return categoriesWithIcons;
     } catch (error) {
       return rejectWithValue(
         error instanceof Error ? error.message : "Failed to fetch categories"
       );
     }
   }
 );

  export const fetchProductsByCategoryId = createAsyncThunk(
    "categories/fetchProductsByCategoryId",
    async (categoryId, { rejectWithValue }) => {
      try {
        const response = await api.get(`category/${categoryId}/view/`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products by category');
      }
    }
  )

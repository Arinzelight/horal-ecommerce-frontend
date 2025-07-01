import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
      try {
        
        const response = await api.get('category/'); 
        const data = response.data
        console.log("data", data)
        return data.data;
      } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories');
      }
    }
  );

  export const fetchProductsByCategoryId = createAsyncThunk(
    'categories/fetchProductsByCategoryId',
    async (categoryId, { rejectWithValue }) => {
      try {
        const response = await api.get(`category/${categoryId}/view/`);
        console.log("products in category", response.data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products by category');
      }
    }
  )

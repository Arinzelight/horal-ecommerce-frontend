import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("product/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "product/fetchProductBySlug",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await api.get(`product/${slug}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUserRecentlyViewedProduct = createAsyncThunk(
  "product/fetchUserRecentlyViewedProduct",
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await api.get("product/recently-viewed/");
      
      return response.data.data;
    } catch (error) {
     
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

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

export const fetchingProductById = createAsyncThunk(
  "product/fetchProductById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`product/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

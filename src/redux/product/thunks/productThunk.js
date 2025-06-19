import {  createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("product/");
      console.log("Fetched products:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchingProductById = createAsyncThunk(
  "product/fetchProductById",
  async ({category, id}, { rejectWithValue }) => {
    try {
      const response = await api.get(`product/${category}/${id}/product`);
      console.log("Fetched product by ID:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
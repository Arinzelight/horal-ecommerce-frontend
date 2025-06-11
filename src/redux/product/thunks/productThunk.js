import {  createAsyncThunk } from "@reduxjs/toolkit";
import {getProducts} from "../../utils/product-api";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
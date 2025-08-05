import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`product/?${queryString}`);
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

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ category_name, productData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/product/${category_name}/create/`,
        productData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ category_name, id, productData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/product/${category_name}/${id}/`,
        productData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ category_name, id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/product/${category_name}/${id}/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

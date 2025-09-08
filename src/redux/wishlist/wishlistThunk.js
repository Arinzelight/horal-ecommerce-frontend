import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("favorite/");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const response = await api.post(`favorite/add/`, { product_id });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const mergeWishlist = createAsyncThunk(
  "wishlist/mergeWishlist",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const response = await api.post(`favorite/merge/`, { product_id });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ item_id }, { rejectWithValue }) => {
    try {
      await api.delete(`favorite/${item_id}/`);
      return { item_id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

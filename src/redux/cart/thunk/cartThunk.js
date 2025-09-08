
import api from "../../../utils/api"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("cart/");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async({ product_id, color, standard_size, quantity =1, custom_size_unit, custom_size_value, size}, {rejectWithValue}) => {
    try {
      const payload = {
        product_id,
        quantity,
        ...(color && { color }),
        ...(standard_size && { standard_size }),
        ...(custom_size_unit && { custom_size_unit }),
        ...(custom_size_value && { custom_size_value }),
        ...(size && { size }),
      };
      const response = await api.post("cart/add/", payload)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ product_id }, { rejectWithValue }) => {
    try { 
      const response = await api.post("cart/merge/", { product_id });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)
 
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ item_id, quantity, color, standard_size, custom_size_unit, custom_size_value, size }, { rejectWithValue }) => {
    try {
      const payload = {
        quantity,
        ...(color && { color }),
        ...(standard_size && { standard_size }),
        ...(custom_size_unit && { custom_size_unit }),
        ...(custom_size_value && { custom_size_value }),
        ...(size && { size }),
      };
      const response = await api.put(`cart/item/${item_id}/`, payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
)

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ item_id }, { rejectWithValue }) => {
    try {
      await api.delete(`cart/item/${item_id}/`);
      return { item_id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/clearCart",
  async ({ cart_id }, { rejectWithValue }) => {
    try {
      await api.delete(`cart/${cart_id}/`);
      return { cart_id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)
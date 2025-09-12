import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`dashboard/seller/profile/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }

);

export const updateSellerProfile = createAsyncThunk(
  "seller/updateSellerProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.patch(`dashboard/seller/profile/`, profileData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSellersOrders = createAsyncThunk(
  "seller/fetchSellersOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`dashboard/seller/orders/`);
      return response.data.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerOrderDetails = createAsyncThunk(
  "seller/getSellerOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`dashboard/seller/orders/${orderId}/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSellersReviews = createAsyncThunk(
  "seller/fetchSellersReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`dashboard/seller/reviews/`);
      return response.data.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
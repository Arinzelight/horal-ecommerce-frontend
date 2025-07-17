import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchAllReviewsForProduct = createAsyncThunk(
  "reviews/fetchAllReviewsForProduct",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/rating/product/${product_id}/reviews/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ product_id, reviewData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/rating/product/${product_id}/add/`, reviewData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReview = createAsyncThunk(
  "reviews/fetchReview",
  async ({ review_id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/rating/${review_id}/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
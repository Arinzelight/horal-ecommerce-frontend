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

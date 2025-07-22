import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchShopItems = createAsyncThunk(
  "shop/fetchShopItems",
  async (shop_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shop/${shop_id}/products/`);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

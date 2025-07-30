import { createSlice } from "@reduxjs/toolkit";
import { fetchShopItems } from "./shopThunk";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetShop: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchShopItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetShop } = shopSlice.actions;

export default shopSlice.reducer;
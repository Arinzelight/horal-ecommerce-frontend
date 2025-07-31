import { createSlice } from "@reduxjs/toolkit";
import { fetchSellerProfile, fetchSellersOrders, fetchSellersReviews, updateSellerProfile } from "./sellerThunk";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    profile: null,
    orders: [],
    reviews: [],
    loading: false,
    loadingOrders: false,
    loadingReviews: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSellersOrders.pending, (state) => {
        state.loadingOrders = true;
        state.error = null;
      })
      .addCase(fetchSellersOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.orders = action.payload;
       
      })
      .addCase(fetchSellersOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        state.error = action.payload;
      }
      )
      .addCase(fetchSellersReviews.pending, (state) => {
        state.loadingReviews = true;
        state.error = null;
      })
      .addCase(fetchSellersReviews.fulfilled, (state, action) => {
        state.loadingReviews = false;
        state.reviews = action.payload;
      })
      .addCase(fetchSellersReviews.rejected, (state, action) => {
        state.loadingReviews = false;
        state.error = action.payload;
      }
      )
      .addCase(updateSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
      );
  },
});


export default sellerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllReviewsForProduct,
  createReview,
  fetchReview,
} from "./reviewThunk";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReviewsForProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllReviewsForProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllReviewsForProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.reviews)) {
          state.reviews = [];
        }
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.reviews)) {
          state.reviews = [];
        }
        state.reviews = state.reviews.map((review) =>
          review.id === action.payload.id ? action.payload : review
        );
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;

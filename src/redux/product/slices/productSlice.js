import { fetchProducts, fetchingProductById } from "../thunks/productThunk";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    count: 0,
    next: null,
    previous: null,
    seller_data: null,
    reviews: [],
    loading: false,

    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.count = action.payload.count || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchingProductById.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(fetchingProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product || null;
        state.seller_data = action.payload.seller_data || null;
        state.reviews = action.payload.product_review || [];
      })
      .addCase(fetchingProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;

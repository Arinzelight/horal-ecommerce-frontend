import {
  fetchProducts,
  fetchProductBySlug,
  fetchUserRecentlyViewedProduct,
  createProduct,
} from "../thunks/productThunk";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    recentlyViewedProducts: [],
    count: 0,
    next: null,
    previous: null,
    seller_data: null,
    reviews: [],
    loading: false,
    creating: false,
    createSuccess: false,
    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
    addToRecentlyViewed: (state, action) => {
      const exists = state.recentlyViewedProducts?.some(
        (product) => product.id === action.payload.id
      );
      if (!exists) {
        state.recentlyViewedProducts?.unshift(action.payload);
        state.recentlyViewedProducts = state.recentlyViewedProducts?.slice(
          0,
          10
        );
      }
    },
    clearRecentlyViewed: (state) => {
      state.recentlyViewedProducts = [];
    },
    clearCreateSuccess: (state) => {
      state.createSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
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
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product || null;
        state.seller_data = action.payload.seller_data || null;
        state.reviews = action.payload.product_review || [];
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserRecentlyViewedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRecentlyViewedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyViewedProducts = action.payload;
      })
      .addCase(fetchUserRecentlyViewedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.creating = false;
        state.createSuccess = true;
        if (!Array.isArray(state.products)) {
          state.products = [];
        }
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
        state.createSuccess = false;
      });
  },
});

export const { clearProduct, addToRecentlyViewed, clearRecentlyViewed, clearCreateSuccess, clearError } =
  productSlice.actions;

export default productSlice.reducer;

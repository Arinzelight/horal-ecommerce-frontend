import {
  fetchProducts,
  fetchProductBySlug,
  fetchUserRecentlyViewedProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchTopProducts
} from "../thunks/productThunk";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    topProducts: [],
    recentlyViewedProducts: [],
    count: 0,
    next: null,
    previous: null,
    seller_data: null,
    reviews: [],
    loading: false,
    topLoading: false,
    creating: false,
    updating: false,
    deleting: false,
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
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
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    clearDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetProductState: (state) => {
      state.creating = false;
      state.updating = false;
      state.createSuccess = false;
      state.updateSuccess = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.results || [];
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
      })
      .addCase(updateProduct.pending, (state) => {
        state.updating = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        const updatedProduct = action.payload;
        if (!Array.isArray(state.products)) {
          state.products = [];
        }
        const index = state.products?.findIndex(
          (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        if (state.product && state.product.id === updatedProduct.id) {
          state.product = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
        state.updateSuccess = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleting = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleting = false;
        state.deleteSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      })
      .addCase(fetchTopProducts.pending, (state) => {
        state.topLoading = true;
        state.error = null;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topLoading = false;
        state.topProducts = action.payload || [];
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.topLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearProduct,
  addToRecentlyViewed,
  clearRecentlyViewed,
  clearCreateSuccess,
  clearUpdateSuccess,
  clearDeleteSuccess,
  clearError,
  resetProductState
} = productSlice.actions;

export default productSlice.reducer;
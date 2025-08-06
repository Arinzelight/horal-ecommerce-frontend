

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchProductsByCategoryId,
  fetchSubcategoriesByCategoryId,
} from "../thunk/categoryThunk";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    products: [],
    subcategories: [],
    count: 0,
    next: null,
    previous: null,
    selectedCategory: null,
    loading: false,
    error: null,
  },

  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.count = 0;
      state.next = null;
      state.previous = null;
      state.selectedCategory = null;
    },
    clearSubcategories: (state) => {
      state.subcategories = [];
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      // Clear subcategories when category changes
      state.subcategories = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.products = action.payload.results;
        state.count = action.payload.count || 0;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSubcategoriesByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategoriesByCategoryId.fulfilled, (state, action) => {
        state.subcategories = action.payload || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSubcategoriesByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.subcategories = [];
      });
  },
});

export const { resetProducts, clearSubcategories, setSelectedCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
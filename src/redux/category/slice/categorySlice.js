import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../../data/mockProducts";
import { fetchCategories, fetchProductsByCategoryId } from "../thunk/categoryThunk";
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    products: [],
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
      });
  },
})
export const { resetProducts } = categorySlice.actions;
export default categorySlice.reducer;

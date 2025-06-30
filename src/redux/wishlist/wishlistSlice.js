import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWishlist,
  addToWishlist,
  mergeWishlist,
  removeFromWishlist,
} from "./wishlistThunk";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;

        if (state.data && state.data.items) {
          const exists = state.data.items.some(
            (item) => item.id === newItem.id
          );
          if (!exists) state.data.items.push(newItem);
        } else {
          state.data = {
            items: [newItem],
          };
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const itemId = action.meta.arg.item_id;

        if (state.data && state.data.items) {
          state.data.items = state.data.items.filter(
            (item) => item.id !== itemId
          );
        }
      })
      .addCase(mergeWishlist.fulfilled, (state) => {
        state.loading = false;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

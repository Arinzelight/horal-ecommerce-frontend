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
    data: {
      id: null,
      created_at: null,
      items: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.data = {
        id: null,
        created_at: null,
        items: [],
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {
          id: null,
          created_at: null,
          items: [],
        };
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch wishlist";
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.product) {
          state.data.items.push(action.payload);
        }
      })

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const idToRemove = action.payload?.item_id;
        state.data.items = state.data.items.filter(
          (item) => item.id !== idToRemove
        );
      })

      .addCase(mergeWishlist.fulfilled, (state, action) => {
        state.data = action.payload || {
          id: null,
          created_at: null,
          items: [],
        };
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

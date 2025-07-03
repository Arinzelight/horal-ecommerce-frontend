import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  addToCart,
  mergeCart,
  removeFromCart,
  deleteCart,
  updateCartItem,
} from "../thunk/cartThunk";

const initialState = {
  id: null,
  items: [],
  total_item: 0,
  quantity: 0,
  total_price: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart: (state) => {
      state.id = null;
      state.items = [];
      state.total_item = 0;
      state.total_price = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload?.id || null;
        state.items = action.payload?.items || [];
        state.total_item = action.payload?.total_item || 0;
        state.total_price = action.payload?.total_price || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;

        if (newItem) {
          const existingIndex = state.items.findIndex(
            (item) => item.product?.id === newItem.product?.id
          );

          if (existingIndex >= 0) {
            // Update existing item
            state.items[existingIndex] = newItem;
          } else {
            // Add new item
            state.items.push(newItem);
          }

          // Recalculate totals
          state.total_item = state.items.length;
          state.total_price = state.items.reduce(
            (total, item) => total + (item.item_total_price || 0),
            0
          );
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      })
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload?.id || null;
        state.items = action.payload?.items || [];
        state.total_item = action.payload?.total_item || 0;
        state.total_price = action.payload?.total_price || 0;
        state.error = null;
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to merge cart";
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const itemId = action.payload?.item_id;

        if (itemId) {
          const removedItem = state.items.find((item) => item.id === itemId);
          state.items = state.items.filter((item) => item.id !== itemId);

          if (removedItem) {
            state.total_item = state.items.length;
            state.total_price = state.items.reduce(
              (total, item) => total + (item.item_total_price || 0),
              0
            );
          }
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove item from cart";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;

        if (updatedItem) {
          const index = state.items.findIndex(
            (item) => item.id === updatedItem.id
          );
          if (index !== -1) {
            state.items[index] = updatedItem;
            // Recalculate totals
            state.total_item = state.items.length;
            state.total_price = state.items.reduce(
              (total, item) => total + (item.item_total_price || 0),
              0
            );
          }
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update cart item";
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.loading = false;
        state.id = null;
        state.items = [];
        state.total_item = 0;
        state.total_price = 0;
        state.error = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

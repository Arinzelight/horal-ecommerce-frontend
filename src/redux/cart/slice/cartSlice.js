import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartUniversal,
  getCartItems,
  mergeCarts,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "../thunk/cartThunk";

const initialState = {
  id: null, // Cart ID for authenticated users
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  merging: false,
  mergeError: null,
  isAuthenticated: false,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Load local cart on app initialization
    loadLocalCart: (state) => {
      if (typeof window !== "undefined" && window.localStorage) {
        try {
          const localCart = JSON.parse(localStorage.getItem("localCart"));
          if (localCart && localCart.items) {
            state.items = localCart.items;
            state.totalQuantity = localCart.totalQuantity || 0;
            state.totalPrice = localCart.totalPrice || 0;
            state.isAuthenticated = false;
            state.lastUpdated = Date.now();
            console.log("Local cart loaded:", localCart);
          }
        } catch (error) {
          console.error("Error loading local cart:", error);
          // Reset to initial state if there's an error
          state.items = [];
          state.totalQuantity = 0;
          state.totalPrice = 0;
        }
      }
    },

    // Add to local cart (for guest users)
    addToLocalCart: (state, action) => {
      const cartData = action.payload;

      // Handle full cart data from thunks
      if (cartData && cartData.items) {
        state.items = cartData.items;
        state.totalQuantity = cartData.totalQuantity || 0;
        state.totalPrice = cartData.totalPrice || 0;
        state.isAuthenticated = false;
        state.lastUpdated = Date.now();

        // Save to localStorage
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("localCart", JSON.stringify(cartData));
        }
      }
    },

    // Clear local cart storage
    clearLocalCart: (state) => {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("localCart");
      }
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.isAuthenticated = false;
      state.lastUpdated = Date.now();
    },

    // Reset cart state (for logout)
    resetCartState: (state) => {
      return { ...initialState };
    },

    // Clear errors
    clearError: (state) => {
      state.error = null;
      state.mergeError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Add to cart cases
      .addCase(addToCartUniversal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartUniversal.fulfilled, (state, action) => {
        state.loading = false;
        const { success, isAuthenticated, data } = action.payload;

        if (success) {
          state.isAuthenticated = isAuthenticated;
          state.lastUpdated = Date.now();

          if (!isAuthenticated && data) {
            // Guest user - update local state
            state.items = data.items || [];
            state.totalQuantity = data.totalQuantity || 0;
            state.totalPrice = data.totalPrice || 0;
          }
          // For authenticated users, state will be updated by getCartItems
        }
      })
      .addCase(addToCartUniversal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add item to cart";
      })

      // Get cart items cases
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        const { success, isAuthenticated, data } = action.payload;

        if (success && data) {
          state.isAuthenticated = isAuthenticated;
          state.lastUpdated = Date.now();

          // Handle API response structure consistently
          if (isAuthenticated) {
            // API response structure: data contains cart info
            state.id = data.id || null;
            state.items = data.items || [];
            state.totalQuantity = data.total_item || 0;
            state.totalPrice = parseFloat(data.total_price || 0);
          } else {
            // Local storage structure
            state.items = data.items || [];
            state.totalQuantity = data.totalQuantity || 0;
            state.totalPrice = parseFloat(data.totalPrice || 0);
          }

          console.log("Cart state updated:", {
            items: state.items.length,
            totalQuantity: state.totalQuantity,
            totalPrice: state.totalPrice,
            isAuthenticated: state.isAuthenticated,
          });
        }
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart items";
      })

      // Merge carts cases
      .addCase(mergeCarts.pending, (state) => {
        state.merging = true;
        state.mergeError = null;
      })
      .addCase(mergeCarts.fulfilled, (state, action) => {
        state.merging = false;
        const { success } = action.payload;

        if (success) {
          state.isAuthenticated = true;
          state.lastUpdated = Date.now();
          console.log("Cart merge completed:", action.payload);
          // State will be updated by getCartItems call within mergeCarts
        }
      })
      .addCase(mergeCarts.rejected, (state, action) => {
        state.merging = false;
        state.mergeError = action.payload?.message || "Failed to merge carts";
      })

      // Remove from cart cases
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const { success, isAuthenticated, data } = action.payload;

        if (success) {
          state.lastUpdated = Date.now();

          if (!isAuthenticated && data) {
            // Guest user - update local state
            state.items = data.items || [];
            state.totalQuantity = data.totalQuantity || 0;
            state.totalPrice = parseFloat(data.totalPrice || 0);
          }
          // For authenticated users, state will be updated by getCartItems
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to remove item from cart";
      })

      // Update quantity cases
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { success, isAuthenticated, data } = action.payload;

        if (success) {
          state.lastUpdated = Date.now();

          if (!isAuthenticated && data) {
            // Guest user - update local state
            state.items = data.items || [];
            state.totalQuantity = data.totalQuantity || 0;
            state.totalPrice = parseFloat(data.totalPrice || 0);
          }
          // For authenticated users, state will be updated by getCartItems
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart item";
      })

      // Clear cart cases
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        const { isAuthenticated } = action.payload;

        // Reset cart state
        state.id = null;
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
        state.isAuthenticated = isAuthenticated;
        state.lastUpdated = Date.now();
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to clear cart";
      });
  },
});

export const {
  loadLocalCart,
  addToLocalCart,
  clearLocalCart,
  resetCartState,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;
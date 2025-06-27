// import { createSlice } from "@reduxjs/toolkit";
// import {
//   addToCart,
//   addToCartUniversal,
//   getCartItems,
//   mergeCarts,
// } from "../thunk/cartThunk";

// const initialState = {
//   items: [],
//   totalQuantity: 0,
//   totalPrice: 0,
//   loading: false,
//   error: null,
//   merging: false,
//   mergeError: null,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     clearCart: (state) => {
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0;
//     },

//     setCartFromLocalStorage: (state, action) => {
//       const localCart = action.payload;
//       state.items = localCart.items || [];
//       state.totalQuantity = localCart.totalQuantity || 0;
//       state.totalPrice = localCart.totalPrice || 0;
//     },

//     addToLocalCart: (state, action) => {
//       const { productId, quantity = 1, price } = action.payload;
      
//       // Find existing item with consistent ID matching
//       const existingItem = state.items.find(
//         (item) => item.productId === productId || item.product?.id === productId
//       );

//       if (existingItem) {
//         existingItem.quantity += quantity;
//         existingItem.totalPrice = existingItem.price * existingItem.quantity;
//       } else {
//         // Create new item with consistent structure
//         const newItem = {
//           productId,
//           quantity,
//           price,
//           totalPrice: price * quantity,
//           product: { id: productId } // Add product object for consistency
//         };
//         state.items.push(newItem);
//       }

//       state.totalQuantity += quantity;
//       state.totalPrice += price * quantity;

//       // Save to localStorage
//       if (typeof window !== "undefined" && window.localStorage) {
//         localStorage.setItem(
//           "localCart",
//           JSON.stringify({
//             items: state.items,
//             totalQuantity: state.totalQuantity,
//             totalPrice: state.totalPrice,
//           })
//         );
//       }
//     },

//     loadLocalCart: (state) => {
//       if (typeof window !== "undefined" && window.localStorage) {
//         const localCart = JSON.parse(localStorage.getItem("localCart"));
//         if (localCart) {
//           state.items = localCart.items || [];
//           state.totalQuantity = localCart.totalQuantity || 0;
//           state.totalPrice = localCart.totalPrice || 0;
//         }
//       }
//     },

//     clearLocalCart: (state) => {
//       if (typeof window !== "undefined" && window.localStorage) {
//         localStorage.removeItem("localCart");
//       }
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // addToCart cases
//       .addCase(addToCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         // State will be updated by getCartItems call
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to add item to cart";
//       })

//       // getCartItems cases - FIXED
//       .addCase(getCartItems.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getCartItems.fulfilled, (state, action) => {
//         const responseData = action.payload.data || action.payload;
//         const items = responseData.items || [];
//         console.log("Response:", responseData);
//           // Use totals from API response if available
//           state.totalQuantity = responseData.total_item || items.reduce((total, item) => total + item.quantity, 0);
//           state.totalPrice = responseData.total_price || items.reduce((total, item) => total + ((item.product?.price || item.price) * item.quantity), 0);
        

//         state.loading = false;
//       })
//       .addCase(getCartItems.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch cart items";
//       })

//       // addToCartUniversal cases
//       .addCase(addToCartUniversal.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToCartUniversal.fulfilled, (state, action) => {
//         state.loading = false;
//         // For authenticated users, getCartItems will refresh the state
//         // For local cart, addToLocalCart already updated the state
//       })
//       .addCase(addToCartUniversal.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to add item to cart";
//       })

//       // mergeCarts cases
//       .addCase(mergeCarts.pending, (state) => {
//         state.merging = true;
//         state.mergeError = null;
//       })
//       .addCase(mergeCarts.fulfilled, (state) => {
//         state.merging = false;
//         // State will be updated by getCartItems call
//       })
//       .addCase(mergeCarts.rejected, (state, action) => {
//         state.merging = false;
//         state.mergeError = action.payload || "Failed to merge carts";
//       });
//   },
// });

// export const {
//   clearCart,
//   clearLocalCart,
//   addToLocalCart,
//   loadLocalCart,
//   setCartFromLocalStorage,
// } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  addToCartUniversal,
  getCartItems,
  mergeCarts,
} from "../thunk/cartThunk";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  merging: false,
  mergeError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    setCartFromLocalStorage: (state, action) => {
      const localCart = action.payload;
      state.items = localCart.items || [];
      state.totalQuantity = localCart.totalQuantity || 0;
      state.totalPrice = localCart.totalPrice || 0;
    },

    addToLocalCart: (state, action) => {
      const { productId, quantity = 1, price, product } = action.payload;

      // Normalize the item data
      const normalizedItem = {
        id: action.payload.id || Date.now().toString(),
        productId: productId,
        quantity: quantity,
        price: price,
        product: product || { id: productId },
        item_total_price: price * quantity,
      };

      const existingItem = state.items.find(
        (item) => item.productId === productId || item.product?.id === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.item_total_price =
          existingItem.price * existingItem.quantity;
      } else {
        state.items.push(normalizedItem);
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;

      // Save to localStorage
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(
          "localCart",
          JSON.stringify({
            items: state.items,
            totalQuantity: state.totalQuantity,
            totalPrice: state.totalPrice,
          })
        );
      }
    },

    loadLocalCart: (state) => {
      if (typeof window !== "undefined" && window.localStorage) {
        try {
          const localCart = JSON.parse(localStorage.getItem("localCart"));
          if (localCart) {
            state.items = localCart.items || [];
            state.totalQuantity = localCart.totalQuantity || 0;
            state.totalPrice = localCart.totalPrice || 0;
          }
        } catch (error) {
          console.error("Error loading local cart:", error);
          // Reset state if there's an error parsing
          state.items = [];
          state.totalQuantity = 0;
          state.totalPrice = 0;
        }
      }
    },

    clearLocalCart: (state) => {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("localCart");
      }
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    // Helper to update cart totals
    updateCartTotals: (state) => {
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce((total, item) => {
        const itemPrice = item.price || item.product?.price || 0;
        return total + itemPrice * item.quantity;
      }, 0);
    },
  },

  extraReducers: (builder) => {
    builder
      // addToCart cases
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        // If it's a local cart addition, update state directly
        if (action.payload.isLocal) {
          const localCart = JSON.parse(
            localStorage.getItem("localCart") ||
              '{"items":[],"totalQuantity":0,"totalPrice":0}'
          );
          state.items = localCart.items;
          state.totalQuantity = localCart.totalQuantity;
          state.totalPrice = localCart.totalPrice;
        }
        // For authenticated users, state will be updated by getCartItems call
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      })

      // getCartItems cases - FIXED
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;

        const { data, isAuthenticated } = action.payload;

        if (isAuthenticated) {
          // API response structure
          const responseData = data.data || data;
          const items = responseData.items || [];

          state.items = items; // FIX: Actually set the items!
          state.totalQuantity =
            responseData.total_item ||
            items.reduce((total, item) => total + item.quantity, 0);
          state.totalPrice =
            responseData.total_price ||
            items.reduce((total, item) => {
              const itemPrice = item.product?.price || item.price || 0;
              return total + itemPrice * item.quantity;
            }, 0);
        } else {
          // Local storage structure
          state.items = data.items || [];
          state.totalQuantity = data.totalQuantity || 0;
          state.totalPrice = data.totalPrice || 0;
        }

        console.log("Cart state updated:", {
          itemsCount: state.items.length,
          totalQuantity: state.totalQuantity,
          totalPrice: state.totalPrice,
        });
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart items";
      })

      // addToCartUniversal cases
      .addCase(addToCartUniversal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartUniversal.fulfilled, (state, action) => {
        state.loading = false;
        // For authenticated users, getCartItems will refresh the state
        // For local cart, addToLocalCart already updated the state
      })
      .addCase(addToCartUniversal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      })

      // mergeCarts cases
      .addCase(mergeCarts.pending, (state) => {
        state.merging = true;
        state.mergeError = null;
      })
      .addCase(mergeCarts.fulfilled, (state, action) => {
        state.merging = false;
        console.log("Cart merge completed:", action.payload);
        // State will be updated by getCartItems call within mergeCarts
      })
      .addCase(mergeCarts.rejected, (state, action) => {
        state.merging = false;
        state.mergeError = action.payload || "Failed to merge carts";
      });
  },
});

export const {
  clearCart,
  clearLocalCart,
  addToLocalCart,
  loadLocalCart,
  setCartFromLocalStorage,
  updateCartTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { addToLocalCart } from "../slice/cartSlice";

// Helper functions
const getAuthToken = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return token;
};

const getLocalCartItems = () => {
  try {
    const cartData = localStorage.getItem("localCart");
    return cartData
      ? JSON.parse(cartData)
      : { items: [], totalQuantity: 0, totalPrice: 0 };
  } catch (error) {
    console.error("Error parsing local cart items:", error);
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
};

const saveToLocalStorage = (cartData) => {
  try {
    localStorage.setItem("localCart", JSON.stringify(cartData));
    console.log(
      "Cart data saved to localStorage:",
      cartData.items.length,
      "items"
    );
  } catch (error) {
    console.error("Error saving cart data to localStorage:", error);
  }
};

const clearLocalStorage = () => {
  localStorage.removeItem("localCart");
  console.log("Local cart storage cleared");
};

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Add to cart for guest and authenticated users
export const addToCartUniversal = createAsyncThunk(
  "cart/addToCartUniversal",
  async (
    { product_id, quantity = 1, price, product, variant_id },
    { getState, rejectWithValue, dispatch }
  ) => {
    // const { user } = getState();

    try {
      if ( getAuthToken()) {
        // Authenticated user - call API
        const response = await api.post("cart/add/", {
          product_id,
          quantity,
          ...(variant_id && { variant_id }),
        });

        console.log("API response:", response.data);

        // Refresh cart items after adding
        await dispatch(getCartItems());

        return {
          success: true,
          isAuthenticated: true,
          data: response.data,
          message: "Item added to cart successfully",
        };
      } else {
        // Guest user - add to local storage
        const localCart = getLocalCartItems();
        const existingItems = localCart.items || [];

        // Check if product with same variant already exists
        const existingItemIndex = existingItems.findIndex(
          (item) =>
            item.product_id === product_id &&
            (item.variant_id || null) === (variant_id || null)
        );

        let updatedItems;
        if (existingItemIndex >= 0) {
          // Update existing item
          console.log("Updating existing item quantity");
          updatedItems = [...existingItems];
          updatedItems[existingItemIndex].quantity += quantity;
          updatedItems[existingItemIndex].item_total_price =
            parseFloat(updatedItems[existingItemIndex].price) *
            updatedItems[existingItemIndex].quantity;
        } else {
          // Add new item
          console.log("Adding new item to local cart");
          const newItem = {
            id: generateUUID(),
            product_id,
            quantity,
            price: parseFloat(price),
            product,
            variant_id: variant_id || null,
            item_total_price: parseFloat(price) * quantity,
            created_at: new Date().toISOString(),
          };
          updatedItems = [...existingItems, newItem];
        }

        // Calculate totals
        const totalQuantity = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + parseFloat(item.item_total_price || 0),
          0
        );

        const updatedCart = {
          items: updatedItems,
          totalQuantity,
          totalPrice,
        };

        // Save to localStorage and update Redux state
        saveToLocalStorage(updatedCart);
        dispatch(addToLocalCart(updatedCart));

        return {
          success: true,
          isAuthenticated: false,
          data: updatedCart,
          message: "Item added to local cart successfully",
        };
      }
    } catch (error) {
      console.error("Error in addToCartUniversal:", error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);

// Get cart items - handles both guest and authenticated users
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      if (getAuthToken()) {
        console.log("Fetching cart items from API...");
        const response = await api.get("cart/");
        console.log("Cart items fetched from API:", response.data);

        return {
          success: true,
          isAuthenticated: true,
          data: response.data.data, 
        };
      } else {
        console.log("Fetching cart items from localStorage...");
        const localCart = getLocalCartItems();
        console.log("Cart items fetched from localStorage:", localCart);

        return {
          success: true,
          isAuthenticated: false,
          data: localCart,
        };
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);

// Merge guest cart with authenticated cart when user logs in
export const mergeCarts = createAsyncThunk(
  "cart/mergeCarts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      console.log("Starting cart merge process...");

      if (!getAuthToken()) {
        throw new Error("User must be authenticated to merge carts");
      }

      // Get local cart items
      const localCart = getLocalCartItems();
      const localItems = localCart.items || [];

      console.log("Local cart items to merge:", localItems);

      if (localItems.length === 0) {
        console.log("No local cart items found, fetching server cart");
        await dispatch(getCartItems());
        return {
          success: true,
          merged: false,
          message: "No local items to merge",
          data: { items: [] },
        };
      }

      const itemsToMerge = localItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        ...(item.variant_id && { variant_id: item.variant_id }),
      }));

      console.log("Sending items to merge endpoint:", itemsToMerge);
      const response = await api.post("cart/merge/", {
        items: itemsToMerge,
      });

      console.log("Merge response:", response);

      // Clear local storage after successful merge
      clearLocalStorage();

      // Fetch updated cart from server
      const cartResponse = await dispatch(getCartItems());
      console.log("Post-merge cart state:", cartResponse.payload);

      return {
        success: true,
        merged: true,
        data: response.data,
        message: `Successfully merged ${localItems.length} items`,
      };
    } catch (error) {
      console.error("Error merging carts:", error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { item_id, product_id, variant_id },
    { getState, rejectWithValue, dispatch }
  ) => {
    const { user } = getState();

    try {
      if (user.userInfo && getAuthToken()) {
        // Authenticated user - call API
        await api.delete(`cart/item/${item_id}/`);
        await dispatch(getCartItems());

        return {
          success: true,
          isAuthenticated: true,
          message: "Item removed from cart",
        };
      } else {
        // Guest user - remove from local storage
        const localCart = getLocalCartItems();
        const updatedItems = localCart.items.filter(
          (item) =>
            !(
              item.product_id === product_id &&
              (item.variant_id || null) === (variant_id || null)
            )
        );

        const totalQuantity = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + parseFloat(item.item_total_price || 0),
          0
        );

        const updatedCart = {
          items: updatedItems,
          totalQuantity,
          totalPrice,
        };

        saveToLocalStorage(updatedCart);

        return {
          success: true,
          isAuthenticated: false,
          data: updatedCart,
          message: "Item removed from local cart",
        };
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);

// Update item quantity in cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { item_id, product_id, variant_id, quantity },
    { getState, rejectWithValue, dispatch }
  ) => {
    const { user } = getState();

    try {
      if (quantity <= 0) {
        return dispatch(removeFromCart({ item_id, product_id, variant_id }));
      }

      if (user.userInfo && getAuthToken()) {
        // Authenticated user - call API
        await api.put(`cart/item/${item_id}/`, { quantity });
        await dispatch(getCartItems());

        return {
          success: true,
          isAuthenticated: true,
          message: "Cart updated successfully",
        };
      } else {
        // Guest user - update local storage
        const localCart = getLocalCartItems();
        const updatedItems = localCart.items.map((item) => {
          if (
            item.product_id === product_id &&
            (item.variant_id || null) === (variant_id || null)
          ) {
            return {
              ...item,
              quantity,
              item_total_price: parseFloat(item.price) * quantity,
            };
          }
          return item;
        });

        const totalQuantity = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + parseFloat(item.item_total_price || 0),
          0
        );

        const updatedCart = {
          items: updatedItems,
          totalQuantity,
          totalPrice,
        };

        saveToLocalStorage(updatedCart);

        return {
          success: true,
          isAuthenticated: false,
          data: updatedCart,
          message: "Local cart updated successfully",
        };
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);

// Clear entire cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    const { user, cart } = getState();

    try {
      if (user.userInfo && getAuthToken()) {
        // Authenticated user - call API with actual cart ID
        const cartId = cart.id; // Get cart ID from state
        if (cartId) {
          await api.delete(`cart/${cartId}/`);
        }

        return {
          success: true,
          isAuthenticated: true,
          message: "Cart cleared successfully",
        };
      } else {
        // Guest user - clear local storage
        clearLocalStorage();

        return {
          success: true,
          isAuthenticated: false,
          message: "Local cart cleared successfully",
        };
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);


// import api from "../../../utils/api";
// import { addToLocalCart } from "../slice/cartSlice";

// // Helper functions
// const getAuthToken = () => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");
//   return token;
// };

// const getLocalCartItems = () => {
//   try {
//     const cartData = localStorage.getItem("localCart");
//     return cartData
//       ? JSON.parse(cartData)
//       : { items: [], totalQuantity: 0, totalPrice: 0 };
//   } catch (error) {
//     console.error("Error parsing local cart items:", error);
//     return { items: [], totalQuantity: 0, totalPrice: 0 };
//   }
// };

// const saveToLocalStorage = (cartData) => {
//   try {
//     localStorage.setItem("localCart", JSON.stringify(cartData));
//     console.log(
//       "Cart data saved to localStorage:",
//       cartData.items.length,
//       "items"
//     );
//   } catch (error) {
//     console.error("Error saving cart data to localStorage:", error);
//   }
// };

// const clearLocalStorage = () => {
//   localStorage.removeItem("localCart");
//   console.log("Local cart storage cleared");
// };

// const generateUUID = () => {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//     const r = (Math.random() * 16) | 0;
//     const v = c == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

// // Add to cart - hybrid approach: try API first, fallback to localStorage
// export const addToCartUniversal = createAsyncThunk(
//   "cart/addToCartUniversal",
//   async (
//     {
//       product_id,
//       quantity = 1,
//       price,
//       product,
//       variant_id,
//       color,
//       standard_size,
//       custom_size_unit,
//       custom_size_value,
//     },
//     { getState, rejectWithValue, dispatch }
//   ) => {
//     const { user } = getState();
//     const isAuthenticated = !!(user.userInfo && getAuthToken());

//     // Build the request payload based on API documentation
//     const payload = {
//       product_id,
//       quantity,
//       ...(color && { color }),
//       ...(standard_size && { standard_size }),
//       ...(custom_size_unit && { custom_size_unit }),
//       ...(custom_size_value && { custom_size_value }),
//     };

//     console.log("🛒 Adding to cart:", { isAuthenticated, payload });

//     try {
//       // Try API first for both authenticated and anonymous users
//       const response = await api.post("cart/add/", payload);
//       console.log("✅ API add to cart success:", response.data);

//       // For anonymous users, also save to localStorage as backup
//       if (!isAuthenticated) {
//         console.log("💾 Backing up to localStorage for anonymous user");
//         const localCart = getLocalCartItems();
//         const existingItems = localCart.items || [];

//         const existingItemIndex = existingItems.findIndex(
//           (item) =>
//             item.product_id === product_id &&
//             (item.variant_id || null) === (variant_id || null)
//         );

//         let updatedItems;
//         if (existingItemIndex >= 0) {
//           updatedItems = [...existingItems];
//           updatedItems[existingItemIndex].quantity += quantity;
//           updatedItems[existingItemIndex].item_total_price =
//             parseFloat(updatedItems[existingItemIndex].price) *
//             updatedItems[existingItemIndex].quantity;
//         } else {
//           const newItem = {
//             id: response.data.data?.id || generateUUID(),
//             product_id,
//             quantity,
//             price: parseFloat(price),
//             product,
//             variant_id: variant_id || null,
//             item_total_price: parseFloat(price) * quantity,
//             created_at: new Date().toISOString(),
//           };
//           updatedItems = [...existingItems, newItem];
//         }

//         const totalQuantity = updatedItems.reduce(
//           (sum, item) => sum + item.quantity,
//           0
//         );
//         const totalPrice = updatedItems.reduce(
//           (sum, item) => sum + parseFloat(item.item_total_price || 0),
//           0
//         );

//         const updatedCart = {
//           items: updatedItems,
//           totalQuantity,
//           totalPrice,
//         };

//         saveToLocalStorage(updatedCart);
//         dispatch(addToLocalCart(updatedCart));
//       }

//       // Refresh cart items after adding
//       await dispatch(getCartItems());

//       return {
//         success: true,
//         isAuthenticated,
//         data: response.data,
//         message: response.data.message || "Item added to cart successfully",
//       };
//     } catch (error) {
//       console.error("❌ API add to cart failed:", error);

//       // Fallback to localStorage for anonymous users
//       if (!isAuthenticated) {
//         console.log("🔄 Falling back to localStorage for anonymous user");

//         const localCart = getLocalCartItems();
//         const existingItems = localCart.items || [];

//         const existingItemIndex = existingItems.findIndex(
//           (item) =>
//             item.product_id === product_id &&
//             (item.variant_id || null) === (variant_id || null)
//         );

//         let updatedItems;
//         if (existingItemIndex >= 0) {
//           updatedItems = [...existingItems];
//           updatedItems[existingItemIndex].quantity += quantity;
//           updatedItems[existingItemIndex].item_total_price =
//             parseFloat(updatedItems[existingItemIndex].price) *
//             updatedItems[existingItemIndex].quantity;
//         } else {
//           const newItem = {
//             id: generateUUID(),
//             product_id,
//             quantity,
//             price: parseFloat(price),
//             product,
//             variant_id: variant_id || null,
//             item_total_price: parseFloat(price) * quantity,
//             created_at: new Date().toISOString(),
//           };
//           updatedItems = [...existingItems, newItem];
//         }

//         const totalQuantity = updatedItems.reduce(
//           (sum, item) => sum + item.quantity,
//           0
//         );
//         const totalPrice = updatedItems.reduce(
//           (sum, item) => sum + parseFloat(item.item_total_price || 0),
//           0
//         );

//         const updatedCart = {
//           items: updatedItems,
//           totalQuantity,
//           totalPrice,
//         };

//         saveToLocalStorage(updatedCart);
//         dispatch(addToLocalCart(updatedCart));

//         return {
//           success: true,
//           isAuthenticated: false,
//           data: updatedCart,
//           message: "Item added to local cart successfully",
//         };
//       }

//       return rejectWithValue({
//         message: error.response?.data?.message || error.message,
//         status: error.response?.status || 500,
//       });
//     }
//   }
// );

// // Get cart items - hybrid approach
// export const getCartItems = createAsyncThunk(
//   "cart/getCartItems",
//   async (_, { rejectWithValue }) => {
//     const isAuthenticated = !!getAuthToken();

//     try {
//       console.log("📦 Fetching cart items from API...");
//       const response = await api.get("cart/");
//       console.log("✅ Cart items fetched from API:", response.data);

//       // Check if API returned empty cart for anonymous user
//       const apiItems = response.data.data?.items || [];

//       if (!isAuthenticated && apiItems.length === 0) {
//         console.log(
//           "🔍 API returned empty cart for anonymous user, checking localStorage..."
//         );
//         const localCart = getLocalCartItems();

//         if (localCart.items && localCart.items.length > 0) {
//           console.log("💾 Found items in localStorage, using local cart");
//           return {
//             success: true,
//             isAuthenticated: false,
//             data: localCart,
//           };
//         }
//       }

//       return {
//         success: true,
//         isAuthenticated,
//         data: response.data.data, // Use response.data.data based on API structure
//       };
//     } catch (error) {
//       console.error("❌ Error fetching cart items from API:", error);

//       // Fallback to localStorage for anonymous users
//       if (!isAuthenticated) {
//         console.log("🔄 API failed for anonymous user, using localStorage");
//         const localCart = getLocalCartItems();

//         return {
//           success: true,
//           isAuthenticated: false,
//           data: localCart,
//         };
//       }

//       return rejectWithValue({
//         message: error.response?.data?.message || error.message,
//         status: error.response?.status || 500,
//       });
//     }
//   }
// );

// // Merge carts when user logs in
// export const mergeCarts = createAsyncThunk(
//   "cart/mergeCarts",
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       console.log("🔄 Starting cart merge process...");

//       if (!getAuthToken()) {
//         throw new Error("User must be authenticated to merge carts");
//       }

//       // Get local cart items to merge
//       const localCart = getLocalCartItems();
//       const localItems = localCart.items || [];

//       console.log("📋 Local cart items to merge:", localItems);

//       if (localItems.length === 0) {
//         console.log("📭 No local cart items found, fetching server cart");
//         await dispatch(getCartItems());
//         return {
//           success: true,
//           merged: false,
//           message: "No local items to merge",
//           data: { items: [] },
//         };
//       }

//       // Prepare items for merge API call
//       const itemsToMerge = localItems.map((item) => ({
//         product_id: item.product_id,
//         quantity: item.quantity,
//         ...(item.variant_id && { variant_id: item.variant_id }),
//       }));

//       console.log("📤 Sending items to merge endpoint:", itemsToMerge);
//       const response = await api.post("cart/merge/", {
//         items: itemsToMerge,
//       });

//       console.log("✅ Merge response:", response.data);

//       // Clear local storage and anonymous session after successful merge
//       clearLocalStorage();
//       api.clearAnonymousSession();

//       // Fetch updated cart from server
//       const cartResponse = await dispatch(getCartItems());
//       console.log("📦 Post-merge cart state:", cartResponse.payload);

//       return {
//         success: true,
//         merged: true,
//         data: response.data,
//         message: `Successfully merged ${localItems.length} items`,
//       };
//     } catch (error) {
//       console.error("❌ Error merging carts:", error);
//       return rejectWithValue({
//         message: error.response?.data?.message || error.message,
//         status: error.response?.status || 500,
//       });
//     }
//   }
// );

// // Remove item from cart - hybrid approach
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async (
//     { item_id, product_id, variant_id },
//     { getState, rejectWithValue, dispatch }
//   ) => {
//     const isAuthenticated = !!getAuthToken();

//     try {
//       console.log("🗑️ Removing item from cart via API:", item_id);
//       await api.delete(`cart/item/${item_id}/`);
//       await dispatch(getCartItems());

//       return {
//         success: true,
//         isAuthenticated,
//         message: "Item removed from cart",
//       };
//     } catch (error) {
//       console.error("❌ Error removing from cart via API:", error);

//       // Fallback to localStorage for anonymous users
//       if (!isAuthenticated) {
//         console.log("🔄 Falling back to localStorage for anonymous user");
//         const localCart = getLocalCartItems();
//         const updatedItems = localCart.items.filter(
//           (item) =>
//             !(
//               item.product_id === product_id &&
//               (item.variant_id || null) === (variant_id || null)
//             )
//         );

//         const totalQuantity = updatedItems.reduce(
//           (sum, item) => sum + item.quantity,
//           0
//         );
//         const totalPrice = updatedItems.reduce(
//           (sum, item) => sum + parseFloat(item.item_total_price || 0),
//           0
//         );

//         const updatedCart = {
//           items: updatedItems,
//           totalQuantity,
//           totalPrice,
//         };

//         saveToLocalStorage(updatedCart);

//         return {
//           success: true,
//           isAuthenticated: false,
//           data: updatedCart,
//           message: "Item removed from local cart",
//         };
//       }

//       return rejectWithValue({
//         message: error.response?.data?.message || error.message,
//         status: error.response?.status || 500,
//       });
//     }
//   }
// );

// // Update item quantity in cart - hybrid approach
// export const updateCartItemQuantity = createAsyncThunk(
//   "cart/updateQuantity",
//   async (
//     { item_id, product_id, variant_id, quantity },
//     { getState, rejectWithValue, dispatch }
//   ) => {
//     const isAuthenticated = !!getAuthToken();

//     try {
//       if (quantity <= 0) {
//         return dispatch(removeFromCart({ item_id, product_id, variant_id }));
//       }

//       console.log("📝 Updating cart item quantity via API:", {
//         item_id,
//         quantity,
//       });
//       await api.put(`cart/item/${item_id}/`, { quantity });
//       await dispatch(getCartItems());

//       return {
//         success: true,
//         isAuthenticated,
//         message: "Cart updated successfully",
//       };
//     } catch (error) {
//       console.error("❌ Error updating cart quantity via API:", error);

//       // Fallback to localStorage for anonymous users
//       if (!isAuthenticated) {
//         console.log("🔄 Falling back to localStorage for anonymous user");
//         const localCart = getLocalCartItems();
//         const updatedItems = localCart.items.map((item) => {
//           if (
//             item.product_id === product_id &&
//             (item.variant_id || null) === (variant_id || null)
//           ) {
//             return {
//               ...item,
//               quantity,
//               item_total_price: parseFloat(item.price) * quantity,
//             };
//           }
//           return item;
//         });

//         const totalQuantity = updatedItems.reduce(
//           (sum, item) => sum + item.quantity,
//           0
//         );
//         const totalPrice = updatedItems.reduce(
//           (sum, item) => sum + parseFloat(item.item_total_price || 0),
//           0
//         );

//         const updatedCart = {
//           items: updatedItems,
//           totalQuantity,
//           totalPrice,
//         };

//         saveToLocalStorage(updatedCart);

//         return {
//           success: true,
//           isAuthenticated: false,
//           data: updatedCart,
//           message: "Local cart updated successfully",
//         };
//       }

//       return rejectWithValue({
//         message: error.response?.data?.message || error.message,
//         status: error.response?.status || 500,
//       });
//     }
//   }
// );

// // Clear entire cart - hybrid approach
// export const clearCart = createAsyncThunk(
//   "cart/clearCart",
//   async (_, { getState, rejectWithValue }) => {
//     const { cart } = getState();
//     const isAuthenticated = !!getAuthToken();

//     try {
//       console.log("🧹 Clearing cart via API");
//       const cartId = cart.id;
//       if (cartId) {
//         await api.delete(`cart/${cartId}/`);
//       }

//       return {
//         success: true,
//         isAuthenticated,
//         message: "Cart cleared successfully",
//       };
//     } catch (error) {
//       console.error("❌ Error clearing cart via API:", error);

//       // Fallback to localStorage for anonymous users
//       if (!isAuthenticated) {
//         console.log("🔄 Falling back to localStorage for anonymous user");
//         clearLocalStorage();

//         return {
//           success: true,
//           isAuthenticated: false,
//           message: "Local cart cleared successfully",
//         };
//       }

//       return rejectWithValue({
//         message: error.response?.data?.message || error.message,
//         status: error.response?.status || 500,
//       });
//     }
//   }
// );
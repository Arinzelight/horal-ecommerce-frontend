// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../utils/api";
// import { addToLocalCart } from "../slice/cartSlice";


// //get auth token from localStorage
// const getAuthToken = () => {
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//   return token;
// };
// const getLocalCartItems = () => {
//   try {
//     const items = localStorage.getItem("cart_items");
//     return items ? JSON.parse(items) : [];
//   } catch (error) {
//     console.error("Error parsing local cart items:", error);
//     return [];
//   }
// };

// // Helper function to save to local storage
// const saveToLocalStorage = (items) => {
//   try {
//     localStorage.setItem("cart_items", JSON.stringify(items));
//     console.log("Cart items saved to localStorage:", items.length, "items");
//   } catch (error) {
//     console.error("Error saving cart items to localStorage:", error);
//   }
// };

// const clearLocalStorage = () => {
//   localStorage.removeItem("cart_items");
//   console.log("Local cart storage cleared");
// };


// // Thunk to add a product to the cart
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (
//     { product_id },
//     { rejectWithValue, getState }
//   ) => {
//     try {
//       console.log("Adding product to cart:", product_id);
//       if(getAuthToken()) {
//         console.log("User is authenticated, calling API");
//         const response = await api.post("cart/add/", {
//           product_id,
//         });
//         console.log("API response:", response.data);
//         return response.data;
//       } else {
//         console.log("User is not authenticated, adding to local cart");
//         const currentState = getState();
//         const existingItems = currentState.cart.items || [];

//         //check if product already exists in local cart
//         const existingItemIndex = existingItems.findIndex(item => item.productId === product_id);

//         let updatedItems;
//         if (existingItemIndex >= 0) {
//           console.log("Product already exists in local cart, updating quantity");
//           updatedItems = [...existingItems];
//           updatedItems[existingItemIndex].quantity += 1;
//         } else{
//           console.log("Product does not exist in local cart, adding new item");
//           const newItem = {
//             productId: product_id,
//             quantity: 1,
//           };
//           updatedItems = [...existingItems, newItem];
//         }
       
//         saveToLocalStorage(updatedItems);
//         console.log("Updated local cart items:", updatedItems);

//         return {
//           productId: product_id,
//           quantity: 1,
//       }

//       };
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Fixed addToCartUniversal thunk
// export const addToCartUniversal = createAsyncThunk(
//   "cart/addToCartUniversal",
//   async (
//     { product_id, quantity = 1, price },
//     { getState, rejectWithValue, dispatch }
//   ) => {
//     const { user } = getState();

//     try {
//       if (user.userInfo) {
//         // Authenticated user - call API
//         const response = await api.post("cart/add/", {
//           product_id,
//           quantity,
//         });

//         // Refresh cart items after adding
//         await dispatch(getCartItems());

//         return {
//           productId: product_id,
//           quantity: quantity,
//           price: price || response.data.price,
//           isAuthenticated: true,
//           ...response.data,
//         };
//       } else {
//         // Non-authenticated user - add to local cart
//         const cartItem = {
//           productId: product_id,
//           quantity,
//           price,
//           product: { id: product_id }, // Add product object for consistency
//         };
//         dispatch(addToLocalCart(cartItem));
//         return cartItem;
//       }
//     } catch (error) {
//       console.error("Error in addToCartUniversal:", error);
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const getCartItems = createAsyncThunk(
//   "cart/getCartItems",
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("Fetching cart items...");
//       if (getAuthToken()) {
//         console.log("User is authenticated, fetching from API");
//         const response = await api.get("cart/");
//         console.log("cart items fetched from API:", response.data);
//         return response.data;
//       } else {
//         console.log("User is not authenticated, fetching from localStorage");
//         const localItems = getLocalCartItems();
//         console.log("cart items fetched from localStorage:", localItems);
//         return localItems;
//       }
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Fixed mergeCarts to send local cart data
// export const mergeCarts = createAsyncThunk(
//   "cart/mergeCarts",
//   async (_, { rejectWithValue, dispatch, getState }) => {
//     try {
//       // const { cart } = getState();
//       console.log("Merging carts...");

//       // Get local cart items from state or localStorage
//       const localItems = getLocalCartItems();
//       console.log("Local cart items:", localItems);
//       if (localItems.length === 0) {
//         console.log("No local cart items found");

//         // If no local items, fetch from api
//         const response = await api.get("cart/");
//         console.log("Fetched cart items from API:", response.data);
//         return response.data;
//       }
//       console.log("Local cart items found, preparing to merge", localItems);

//       //merge local cart items with API cart
//       const itemsToMerge = localItems.map((item) => ({
//         product_id: item.productId,
//         quantity: item.quantity,
//         price: item.price, // Include price if available
//       }));

//       console.log("Sending cart items for merge:", itemsToMerge);

//       const response = await api.post("cart/merge/", {
//         items: itemsToMerge,
//       });

//       console.log("Merge carts response:", response.data);

//       // Clear local storage after merging
//       clearLocalStorage();

//       return response.data;
//     } catch (error) {
//       console.error("Error merging carts:", error);
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );


import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { addToLocalCart } from "../slice/cartSlice";

//get auth token from localStorage
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

// Helper function to save to local storage
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

// Thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product_id }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log("Adding product to cart:", product_id);
      if (getAuthToken()) {
        console.log("User is authenticated, calling API");
        const response = await api.post("cart/add/", {
          product_id,
        });
        console.log("API response:", response.data);

        // Refresh cart after adding to get updated state
        await dispatch(getCartItems());
        return response.data;
      } else {
        console.log("User is not authenticated, adding to local cart");
        const localCart = getLocalCartItems();
        const existingItems = localCart.items || [];

        //check if product already exists in local cart
        const existingItemIndex = existingItems.findIndex(
          (item) => item.productId === product_id
        );

        let updatedItems;
        let addedQuantity = 1;

        if (existingItemIndex >= 0) {
          console.log(
            "Product already exists in local cart, updating quantity"
          );
          updatedItems = [...existingItems];
          updatedItems[existingItemIndex].quantity += 1;
          addedQuantity = updatedItems[existingItemIndex].quantity;
        } else {
          console.log("Product does not exist in local cart, adding new item");
          const newItem = {
            productId: product_id,
            quantity: 1,
          };
          updatedItems = [...existingItems, newItem];
        }

        const updatedCart = {
          items: updatedItems,
          totalQuantity: (localCart.totalQuantity || 0) + 1,
          totalPrice: localCart.totalPrice || 0, // Will be calculated in slice if price is available
        };

        saveToLocalStorage(updatedCart);
        console.log("Updated local cart:", updatedCart);

        return {
          items: updatedItems,
          addedItem: { productId: product_id, quantity: addedQuantity },
          isLocal: true,
        };
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fixed addToCartUniversal thunk
export const addToCartUniversal = createAsyncThunk(
  "cart/addToCartUniversal",
  async (
    { product_id, quantity = 1, price, product }, // Ensure product is passed
    { getState, rejectWithValue, dispatch }
  ) => {
    const { user } = getState();

    try {
      if (user.userInfo) {
        // Authenticated user - call API
        const response = await api.post("cart/add/", {
          product_id,
          quantity,
        });

        // Refresh cart items after adding
        await dispatch(getCartItems());

        // Standardize the response format
        return {
          id: response.data.id || Date.now().toString(), // Temporary ID for local
          productId: product_id,
          quantity: quantity,
          price: price || response.data.price,
          product: response.data.product || product || { id: product_id },
          variant: response.data.variant,
          variant_detail: response.data.variant_detail,
          item_total_price: response.data.item_total_price || price * quantity,
          isAuthenticated: true,
          status: "success",
          message: "Item added to cart successfully",
        };
      } else {
        // Non-authenticated user - add to local cart
        const cartItem = {
          id: Date.now().toString(), // Temporary unique ID
          productId: product_id,
          quantity,
          price,
          product: product || { id: product_id },
          item_total_price: price * quantity,
          isAuthenticated: false,
          status: "success",
          message: "Item added to cart successfully",
        };

        dispatch(addToLocalCart(cartItem));
        return cartItem;
      }
    } catch (error) {
      console.error("Error in addToCartUniversal:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching cart items...");
      if (getAuthToken()) {
        console.log("User is authenticated, fetching from API");
        const response = await api.get("cart/");
        console.log("cart items fetched from API:", response.data);
        return { data: response.data, isAuthenticated: true };
      } else {
        console.log("User is not authenticated, fetching from localStorage");
        const localCart = getLocalCartItems();
        console.log("cart items fetched from localStorage:", localCart);
        return { data: localCart, isAuthenticated: false };
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fixed mergeCarts to send local cart data
export const mergeCarts = createAsyncThunk(
  "cart/mergeCarts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      console.log("Merging carts...");

      // Get local cart items from localStorage
      const localCart = getLocalCartItems();
      const localItems = localCart.items || [];

      console.log("Local cart items:", localItems);

      if (localItems.length === 0) {
        console.log("No local cart items found");
        // If no local items, just fetch from API
        await dispatch(getCartItems());
        return { merged: false, message: "No local items to merge" };
      }

      console.log("Local cart items found, preparing to merge", localItems);

      //merge local cart items with API cart
      const itemsToMerge = localItems.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price, // Include price if available
      }));

      console.log("Sending cart items for merge:", itemsToMerge);

      const response = await api.post("cart/merge/", {
        items: itemsToMerge,
      });

      console.log("Merge carts response:", response.data);

      // Clear local storage after merging
      clearLocalStorage();

      // Refresh cart items after merging
      await dispatch(getCartItems());

      return { ...response.data, merged: true };
    } catch (error) {
      console.error("Error merging carts:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
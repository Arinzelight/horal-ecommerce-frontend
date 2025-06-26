import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { addToLocalCart } from "../slice/cartSlice";

// Thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { product_id, quantity = 1, price },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post("cart/add/", {
        product_id,
        quantity,
      });
      console.log("Add to cart response:", response.data);

      // Refresh cart items after adding
      await dispatch(getCartItems());

      return {
        productId: product_id,
        quantity: quantity,
        price: price || response.data.price,
        ...response.data,
      };
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
    { product_id, quantity = 1, price },
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

        return {
          productId: product_id,
          quantity: quantity,
          price: price || response.data.price,
          isAuthenticated: true,
          ...response.data,
        };
      } else {
        // Non-authenticated user - add to local cart
        const cartItem = {
          productId: product_id,
          quantity,
          price,
          product: { id: product_id }, // Add product object for consistency
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
      const response = await api.get("cart/");
      console.log("cart items:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fixed mergeCarts to send local cart data
export const mergeCarts = createAsyncThunk(
  "cart/mergeCarts",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { cart } = getState();

      // Get local cart items from state or localStorage
      let localCartItems = cart.items;
      if (!localCartItems || localCartItems.length === 0) {
        const localCartData = localStorage.getItem("localCart");
        if (localCartData) {
          const parsedCart = JSON.parse(localCartData);
          localCartItems = parsedCart.items || [];
        }
      }

      // Transform local cart items to match API format
      const cartItemsForAPI = localCartItems.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));

      console.log("Sending cart items for merge:", cartItemsForAPI);

      const response = await api.post("cart/merge/", {
        items: cartItemsForAPI,
      });

      console.log("Merge carts response:", response.data);

      // Call getCartItems after merging
      await dispatch(getCartItems());

      return response.data;
    } catch (error) {
      console.error("Error merging carts:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

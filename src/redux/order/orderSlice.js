import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/order";

// Checkout Order
export const checkoutOrder = createAsyncThunk(
  "order/checkout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(`${BASE_URL}/checkout/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Checkout failed");
    }
  }
);

// Apply Discount / Coupon
export const applyDiscount = createAsyncThunk(
  "order/applyDiscount",
  async (_, { rejectWithValue }) => {
    try {
      // No body required, just a PATCH
      const response = await api.patch(`${BASE_URL}/checkout/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to apply coupon");
    }
  }
);

// Update Shipping Address
export const updateShippingAddress = createAsyncThunk(
  "order/updateShippingAddress",
  async (shippingAddress, { rejectWithValue }) => {
    try {
      const response = await api.put(`${BASE_URL}/checkout/`, {
        shipping_address: shippingAddress,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (orderId, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/${orderId}/`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

// Get User Orders
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/user-orders/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

// Get Single Order Details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/get/${orderId}/`);
      return response.data;
    } catch (error) {
      const raw = error.response?.data;

      const errorMessage =
        typeof raw === "string"
          ? "Order not found"
          : raw?.message || "Fetch failed";

      return rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Checkout Order
      .addCase(checkoutOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
        state.error = null;
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Shipping Address
      .addCase(updateShippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(updateShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
        state.currentOrder = null;
      })

      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Order
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
        state.error = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;

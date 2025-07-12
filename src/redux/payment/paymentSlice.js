import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/payment";

// Initialize Paystack Payment
export const initializePayment = createAsyncThunk(
  "payment/initialize",
  async ({ email, order_id }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${BASE_URL}/paystack/initialize/`, {
        email,
        order_id,
        platform: "web",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Initialization failed");
    }
  }
);

// Confirm Payment
export const confirmPayment = createAsyncThunk(
  "payment/confirm",
  async (reference, { rejectWithValue }) => {
    try {
      const response = await api.post("/payment/confirmation", { reference });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Confirmation failed");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    paymentUrl: null,
    confirmed: false,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.paymentUrl = null;
      state.confirmed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle initialization
      .addCase(initializePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload?.data?.authorization_url || null;
      })
      .addCase(initializePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle confirmation
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state) => {
        state.loading = false;
        state.confirmed = true;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;

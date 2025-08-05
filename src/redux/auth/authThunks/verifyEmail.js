import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/confirm-registration/", {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to confirm registration"
      );
    }
  }
);

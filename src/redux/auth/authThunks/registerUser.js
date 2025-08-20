import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { toast } from "../../../components/toast";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register/", userData);
      toast.success(
        "Registration successful! Please check your email for the OTP to verify your account"
      );
      navigate("/verify-email");
      return response.data;
    } catch (err) {
      const payload = err.response?.data || "Registration failed";
      const errorMessage =
        typeof payload === "object"
          ? Object.values(payload).flat().join(", ")
          : payload;

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

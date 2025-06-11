import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

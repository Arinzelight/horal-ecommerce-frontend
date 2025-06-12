import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register/", userData);
      toast.success("Registration successful!");
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

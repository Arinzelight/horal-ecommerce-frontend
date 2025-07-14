import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// Async thunk for email/password login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("user/login/", {
        email,
        password,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk for Google login
export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token_id, { rejectWithValue }) => {
    try {
      const res = await api.post("user/google-login/", {
        token_id,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk for user logout - UPDATED
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async ({ refresh, id }, { rejectWithValue }) => {
    try {
      const res = await api.post("user/logout/", {
        refresh,
        id,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;

      // Clear localStorage
      try {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("wishlist");
      } catch (error) {
        console.log("Error clearing localStorage:", error);
      }
    },
    // Clear user state without affecting localStorage
    clearUser: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userInfo = action.payload;
        const access = action.payload?.data?.tokens?.access;
        const refresh = action.payload?.data?.tokens?.refresh;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        if (access) localStorage.setItem("token", access);
        if (refresh) localStorage.setItem("refreshToken", refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Google login cases
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.userInfo = action.payload;
        const access = action.payload?.data?.tokens?.access;
        const refresh = action.payload?.data?.tokens?.refresh;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        if (access) localStorage.setItem("token", access);
        if (refresh) localStorage.setItem("refreshToken", refresh);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.error = null;

        // Clear localStorage
        try {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("wishlist");
        } catch (error) {
          console.log("Error clearing localStorage in fulfilled:", error);
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log("Logout rejected - still clearing user state");
        state.loading = false;
        state.error = action.payload;

        // Clear user state even if API call failed
        state.userInfo = null;

        // Clear localStorage
        try {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("wishlist");
        } catch (error) {
          console.log("Error clearing localStorage in rejected:", error);
        }
      });
  },
});

export const { logout, clearUser } = userSlice.actions;
export default userSlice.reducer;

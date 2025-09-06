import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { forceLogout } from "../../../utils/api";

// -------------------- AUTH --------------------

// Login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("user/login/", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Google Login
export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token_id, { rejectWithValue }) => {
    try {
      const res = await api.post("user/google-login/", { token_id });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("user/logout/");
    } catch (err) {
      if (err.response?.status !== 403) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    }
    forceLogout();
    return true;
  }
);

// -------------------- FORGOT PASSWORD --------------------

// Step 1: Request Reset
export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("user/password-reset/request/", { email });
      const userId = res.data?.data?.user_id;
      if (userId) localStorage.setItem("resetUserId", userId);
      return res.data.data;
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === "object") {
        const message = Object.values(data).flat().join(", ");
        return rejectWithValue(message);
      }
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// Step 2: Verify OTP
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ email, otp, user_id }, { rejectWithValue }) => {
    try {
      const res = await api.post("user/password-reset/verify-otp/", {
        email,
        otp,
        user_id,
      });
      localStorage.removeItem("resetUserId");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Step 3: Confirm New Password
export const confirmPasswordReset = createAsyncThunk(
  "user/confirmPasswordReset",
  async ({ user_id, new_password, confirm_password }, { rejectWithValue }) => {
    try {
      const res = await api.post("user/password-reset/confirm/", {
        user_id,
        new_password,
        confirm_password,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// -------------------- SLICE --------------------

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,

    // forgot password flow
    resetRequested: false,
    otpVerified: false,
    resetSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
    clearResetState: (state) => {
      state.resetRequested = false;
      state.otpVerified = false;
      state.resetSuccess = false;
      state.error = null;
      localStorage.removeItem("resetUserId");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------- LOGIN --------------------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // -------------------- GOOGLE LOGIN --------------------
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Google login failed";
      })

      // -------------------- LOGOUT --------------------
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.error = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userInfo = null;
        state.error = action.payload || "Logout failed";
        state.loading = false;
      })

      // -------------------- FORGOT PASSWORD --------------------
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.resetRequested = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password reset request failed";
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })

      .addCase(confirmPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password reset failed";
      })

      // -------------------- GLOBAL MATCHER --------------------
      // Automatically clear error on any new async request
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null;
        }
      );
  },
});

export const { logout, clearUser, clearResetState, clearError } =
  userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { saveTokens, forceLogout } from "../../../utils/api";

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
      forceLogout();
      return true;
    } catch (err) {
      forceLogout();
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
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
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
        saveTokens(access, refresh);
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // google login
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
        saveTokens(access, refresh);
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Google login failed";
      })

      // logout
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
      });
  },
});

export const { logout, clearUser } = userSlice.actions;
export default userSlice.reducer;

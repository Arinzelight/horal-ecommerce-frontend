import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk for email/password login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("login/", {
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

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async ({ refresh, id }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post("user/logout/", {
        refresh,
        id,
      });
      // clear user data in slice and localStorage
      dispatch(logout());
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
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
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
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
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
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

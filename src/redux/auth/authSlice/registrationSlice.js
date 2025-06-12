import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../authThunks/registerUser";
import { verifyEmail } from "../authThunks/verifyEmail";

const initialState = {
  user: null,
  emailForVerification: localStorage.getItem("emailForVerification") || "",
  loading: false,
  error: null,
};

const registration = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.emailForVerification = "";
      state.error = null;
      localStorage.removeItem("emailForVerification");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.emailForVerification = action.payload.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // handlers for verifyEmail
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.emailForVerification = "";
        localStorage.removeItem("emailForVerification");
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = registration.actions;

export default registration.reducer;

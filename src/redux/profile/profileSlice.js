import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAllProfiles,
} from "./profileThunk";

const initialState = {
  userProfile: null,
  allProfiles: [],
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user profile";
      })
      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = {
          ...state.userProfile,
          ...action.payload,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update user profile";
      })
      // Fetch all profiles
      .addCase(fetchAllProfiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProfiles = action.payload;
      })
      .addCase(fetchAllProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch all profiles";
      });
  },
});

export const { clearProfileError, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;

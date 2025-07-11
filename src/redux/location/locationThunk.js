import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Fetch user location by location ID
export const fetchUserLocation = createAsyncThunk(
  "location/fetchUserLocation",
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await api.get(`user/location/${locationId}/view`);
      return response.data.location;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update user location (PUT)
export const updateUserLocation = createAsyncThunk(
  "location/updateUserLocation",
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `user/location/${locationData.id}/`,
        locationData
      );
      return response.data.location;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Patch user location (PATCH)
export const patchUserLocation = createAsyncThunk(
  "location/patchUserLocation",
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `user/location/${locationData.id}/`,
        locationData
      );
      return response.data.location;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

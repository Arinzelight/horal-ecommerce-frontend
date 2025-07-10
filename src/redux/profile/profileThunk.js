import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
    async (_, {rejectWithValue}) => {
        try {
        const response = await api.get('profile/');
        return response.data.data;
        } catch (error) {
        console.error('Error fetching user profile:', error);
        return rejectWithValue(error.response?.data || 'Failed to fetch profile');
        }
    }
);

// In your updateUserProfile thunk
export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async (profileData, { rejectWithValue }) => {
      try {
        const response = await api.patch('profile/', profileData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

export const fetchAllProfiles = createAsyncThunk(
  'profile/fetchAllProfiles',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get('/profile/all/');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all profiles:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch profiles');
    }
  }
);

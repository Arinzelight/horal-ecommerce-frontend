import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
    async (_, {rejectWithValue}) => {
        try {
        const response = await api.get('profile/');
        console.log('Fetched user profile:', response.data.data);
        return response.data.data;
        } catch (error) {
        console.error('Error fetching user profile:', error);
        return rejectWithValue(error.response?.data || 'Failed to fetch profile');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (profileData, {rejectWithValue}) => {
    try {
      const response = await api.patch('profile/', profileData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return rejectWithValue(error.response?.data || 'Failed to update profile');
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

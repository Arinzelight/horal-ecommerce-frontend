import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAllProfiles,
} from "../redux/profile/profileThunk";
import {
  clearProfileError,
  clearUserProfile,
} from "../redux/profile/profileSlice";

const useProfile = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);

  // Fetch current user's profile
  const getUserProfile = useCallback(() => {
    return dispatch(fetchUserProfile()).unwrap();
  }, [dispatch]);

  // Update current user's profile
  const updateProfile = useCallback(
    async (profileData) => {
      await dispatch(updateUserProfile(profileData)).unwrap();
      // Refresh profile data after successful update
      await getUserProfile();
    },
    [dispatch, getUserProfile]
  );

  // Fetch all profiles (admin functionality)
  const getAllProfiles = useCallback(() => {
    return dispatch(fetchAllProfiles()).unwrap();
  }, [dispatch]);

  // Clear profile error
  const clearError = useCallback(() => {
    dispatch(clearProfileError());
  }, [dispatch]);

  // Clear user profile
  const clearProfile = useCallback(() => {
    dispatch(clearUserProfile());
  }, [dispatch]);

  // Automatically fetch user profile when hook is used
  useEffect(() => {
    getUserProfile();
  }, []);

  return {
    ...profileState,
    getUserProfile,
    updateProfile,
    getAllProfiles,
    clearError,
    clearProfile,
    // Helper selectors
    isProfileLoading: profileState.isLoading,
    profileError: profileState.error,
    currentProfile: profileState.userProfile,
    profilesList: profileState.allProfiles,
  };
};

export default useProfile;

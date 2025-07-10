// hooks/useProfile.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAllProfiles,
} from "../redux/profile/profileThunk";

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
  const getAllProfiles = () => {
    dispatch(fetchAllProfiles());
  };

  // Automatically fetch user profile when hook is used
  useEffect(() => {
    getUserProfile();
  }, []);

  return {
    ...profileState,
    getUserProfile,
    updateProfile,
    getAllProfiles,
    // Helper selectors
    isProfileLoading: profileState.isLoading,
    profileError: profileState.error,
    currentProfile: profileState.userProfile,
    profilesList: profileState.allProfiles,
  };
};

export default useProfile;

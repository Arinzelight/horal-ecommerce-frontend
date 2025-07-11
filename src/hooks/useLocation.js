import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchUserLocation,
  updateUserLocation,
  patchUserLocation,
} from "../redux/location/locationThunk";
import {
  clearLocationError,
  clearUserLocation,
} from "../redux/location/locationSlice";

const useLocation = () => {
  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.location);

  // Fetch user location by ID
  const getUserLocation = useCallback(
    (locationId) => {
      return dispatch(fetchUserLocation(locationId)).unwrap();
    },
    [dispatch]
  );

  // Update user location
  const updateLocation = useCallback(
    async (locationData) => {
      return dispatch(updateUserLocation(locationData)).unwrap();
    },
    [dispatch]
  );

  // Patch user location
  const patchLocation = useCallback(
    async (locationData) => {
      return dispatch(patchUserLocation(locationData)).unwrap();
    },
    [dispatch]
  );

  // Clear location error
  const clearError = useCallback(() => {
    dispatch(clearLocationError());
  }, [dispatch]);

  // Clear user location
  const clearLocation = useCallback(() => {
    dispatch(clearUserLocation());
  }, [dispatch]);

  return {
    ...locationState,
    getUserLocation,
    updateLocation,
    patchLocation,
    clearError,
    clearLocation,
    // Helper selectors
    isLocationLoading: locationState?.isLoading,
    locationError: locationState?.error,
    currentLocation: locationState?.userLocation,
  };
};

export default useLocation;

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchSellerProfile,
  fetchSellersOrders,
  fetchSellersReviews,
  updateSellerProfile,
} from "../redux/seller/sellerThunk";

const useSeller = () => {
  const dispatch = useDispatch();

  const seller = useSelector((state) => {
    return state.seller;
  });

  const {
    profile,
    orders,
    loading,
    loadingOrders,
    error,
    loadingReviews,
    reviews,
  } = seller;

  useEffect(() => {
    // Fetch seller profile on mount
    dispatch(fetchSellerProfile());
    // Fetch seller reviews on mount
    dispatch(fetchSellersReviews());
    dispatch(fetchSellersOrders());
  }, [dispatch]);

  const updateProfile = (profileData) => {
    dispatch(updateSellerProfile(profileData));

    dispatch(fetchSellerProfile());
  };

  return {
    profile,
    orders: orders || [],
    reviews: reviews || [],
    loading,
    loadingOrders,
    loadingReviews,
    error,
    fetchProfile: () => dispatch(fetchSellerProfile()),
    fetchOrders: () => dispatch(fetchSellersOrders()),
    fetchReviews: () => dispatch(fetchSellersReviews()),
    updateProfile,
  };
};

export default useSeller;

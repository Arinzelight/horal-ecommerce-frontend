import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchSellerProfile,
  fetchSellersOrders,
  fetchSellersReviews,
  updateSellerProfile,
  getSellerOrderDetails,
} from "../redux/seller/sellerThunk";

const useSeller = () => {
  const dispatch = useDispatch();

  const seller = useSelector((state) => {
    return state.seller;
  });

  const {
    profile,
    orders,
    currentOrder,
    loading,
    loadingOrders,
    loadingOrderDetails,
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

  const getOrderDetails = (orderId) => {
    dispatch(getSellerOrderDetails(orderId));
  };

  return {
    profile,
    orders: orders || [],
    currentOrder,
    reviews: reviews || [],
    getOrderDetails,
    loading,
    loadingOrders,
    loadingReviews,
    loadingOrderDetails,
    error,
    fetchProfile: () => dispatch(fetchSellerProfile()),
    fetchOrders: () => dispatch(fetchSellersOrders()),
    fetchReviews: () => dispatch(fetchSellersReviews()),
    updateProfile,
    
  };
};

export default useSeller;

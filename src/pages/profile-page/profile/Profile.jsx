import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useProfile from "../../../hooks/useProfile";
import { getUserOrders } from "../../../redux/order/orderSlice";
import ProfileInfo from "./component/ProfileInfo";
import LocationInfo from "./component/LocationInfo";
import ShippingInfo from "./component/ShippingInfo";
import RecentOrders from "./component/RecentOrders";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { orders } = useSelector((state) => state.order);
  const orderLoading = useSelector((state) => state.order.loading);
  const { currentProfile } = useProfile();
  const { userInfo } = useSelector((state) => state.user);
  const currentUser = userInfo?.data;

  const user = currentProfile;
  const useOrders = orders?.data || [];
  const recentOrder = useOrders.slice(0, 3);

  useEffect(() => {
    if(!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (user) {
      dispatch(getUserOrders())
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dispatch, user]);

  const transformOrderForCard = (order) => {
    const firstItem = order.items[0];
    return {
      id: order.id,
      orderId: order.id,
      date: new Date(order.created_at).toLocaleDateString(),
      status: order.status,
      price: parseFloat(order.total_amount),
      productName: firstItem?.product?.title || "Unknown Product",
      productImage: firstItem?.product?.image || "/placeholder.svg",
      items: order.items,
      shipping_address: order.shipping_address,
      user_email: order.user_email,
      total_amount: order.total_amount,
      created_at: order.created_at,
    };
  };

  return (
    <main>
      <div className="flex flex-col lg:flex-row  gap-5 items-stretch  ">
        <ProfileInfo user={user} />
        <LocationInfo user={user} />
      </div>

      <ShippingInfo user={user} />

      <RecentOrders
        recentOrder={recentOrder}
        orderLoading={orderLoading}
        useOrders={useOrders}
        transformOrderForCard={transformOrderForCard}
      />
    </main>
  );
};

export default Profile;

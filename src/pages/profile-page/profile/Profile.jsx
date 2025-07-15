import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderCard from "../../../users-profile/pages/order/OrderCard";
import useProfile from "../../../hooks/useProfile";
import { getUserOrders } from "../../../redux/order/orderSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  const updatedUserData = useSelector((state) => state.user.currentUser?.user);
  // const orders = useSelector((state) => state.order.orders);
  const { orders } = useSelector((state) => state.order);
  const orderLoading = useSelector((state) => state.order.loading);
  const { currentProfile, isProfileLoading } = useProfile();

  const user = currentProfile;
  const useOrders = orders?.data || [];

  const recentOrder = useOrders.slice(0, 3);

  useEffect(() => {
    if (user) {
      dispatch(getUserOrders())
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dispatch, user]);

  // Transform API order data to match OrderCard expected format
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
    <main className="">
      <div className="flex flex-col md:flex-row gap-5 items-center pt-8">
        {/* Profile info */}
        <div className="h-[300px] bg-white w-full md:w-[280px] lg:w-[580px] flex flex-col items-center md:items-center gap-2 justify-center py-10 pl-8 shadow rounded-lg">
          <img
            src={
              updatedUserData?.pictureUrl ||
              currentUser?.pictureUrl ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="user profile"
            className="rounded-full w-[150px] h-[150px] object-cover"
          />
          <h2 className="font-bold">{user?.full_name || ""}</h2>
          <p className="text-gray-400">{user?.email || ""}</p>
          <Link
            to="/profile-page/settings"
            className="text-primary font-semibold"
          >
            Edit Profile
          </Link>
        </div>

        {/*current Address */}
        <div className=" text-lg h-[300px] bg-white w-full md:w-[250px] lg:w-[410px] flex flex-col items-start gap-2 py-4 pl-8 shadow rounded-lg">
          <h2 className="text-gray-900 text-lg">LOCATION</h2>
          <div></div>
          <div className="">
            <span className="text-neutral-400">Street Address: </span>
            <span className="">
              {user?.location?.street_address || "Not Available"}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Local Govt: </span>
            <span className="">
              {user?.location?.local_govt || "Not Available"}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">State: </span>
            <span className="">{user?.location?.state || "Not Available"}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Landmark: </span>
            <span className="">
              {user?.location?.landmark || "Not Available"}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Phone Number: </span>
            <span className="">{user?.phone_number || "Not Available"}</span>
          </div>
          <Link
            to="/profile-page/settings"
            className="text-primary font-semibold"
          >
            Edit Address
          </Link>
        </div>
      </div>

      {/* Current Shipping address */}
      <div className="text-sm mt-4 h-[300px] bg-white w-full md:w-[300px] lg:w-[580px] flex flex-col items-start gap-2 py-4 pl-8 shadow rounded-lg">
        <h2 className="text-gray-400">CURRENT SHIPPING ADDRESS</h2>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400">Fullname</span>
          <span className="">{user?.full_name || "Not Available"}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400">Street Address</span>
          <span className="">
            {user?.shipping_address?.street_address || "Not Available"}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400">Email</span>
          <span className="">
            {user?.shipping_address?.email || "Not Available"}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400">Phone Number</span>
          <span className="">
            {user?.shipping_address?.phone_number || "Not Available"}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400">State</span>
          <span className="">
            {user?.shipping_address?.state || "Not Available"}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400">Country</span>
          <span className="">
            {user?.shipping_address?.country || "Not Available"}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400">Landmark</span>
          <span className="">
            {user?.shipping_address?.landmark || "Not Available"}
          </span>
        </div>
      </div>
      {/* Order history */}
      <div className="w-full bg-white shadow rounded-lg my-10 overflow-x-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl ml-10 my-6">
            Recent Order History
          </h2>
          {/* only show if there are orders */}
          {useOrders && useOrders.length > 0 && (
            <Link
              to="/profile-page/order-history"
              className="text-primary text-center mr-5 smmd:mr-14"
            >
              View all
            </Link>
          )}
        </div>
        {recentOrder && recentOrder.length > 0 ? (
          <div className="p-4 space-y-4">
            {recentOrder.map((order) => (
              <OrderCard
                key={order.id}
                order={transformOrderForCard(order)}
                loading={orderLoading}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-10">
            <p className="text-gray-500">No orders found</p>
            <Link
              to="/products"
              className="bg-secondary text-white px-4 md:px-6 py-2 mt-4 rounded flex items-center text-base cursor-pointer hover:opacity-85 transition duration-200 whitespace-nowrap"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;

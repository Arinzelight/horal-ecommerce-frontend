import { useState, useMemo, useEffect } from "react";
import OrderTabs from "./OrderTab";
import OrderCard from "./OrderCard";
import { mockOrders } from "../../../data/mockOrder";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
import { getUserOrders } from "../../../redux/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import useProfile from "../../../hooks/useProfile";
const UserOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState("ongoing");
  const { currentProfile, isProfileLoading, profileError } = useProfile();

  const user = currentProfile;

  useEffect(() => {
    if (user) {
      dispatch(getUserOrders());
    }
  }, [dispatch, user]);

  const allOrders = orders?.data || [];

  const transformOrderForCard = (order) => {
    const firstItem = order.items[0];
    return {
      id: order.id,
      orderId: order.id,
      date: order.created_at,
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

  // Filter orders based on status
  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const status = order.status.toLowerCase();
      switch (activeTab) {
        case "ongoing":
          return ["paid", "pending", "processing", "in transit"].includes(
            status
          );
        case "delivered":
          return status === "delivered";
        case "cancelled":
          return status === "cancelled";
        default:
          return true;
      }
    });
  }, [allOrders, activeTab]);

  // Count orders by status
  const orderCounts = useMemo(() => {
    return {
      ongoing: allOrders.filter((order) =>
        ["pending", "processing", "in transit"].includes(
          order.status.toLowerCase()
        )
      ).length,
      delivered: allOrders.filter(
        (order) => order.status.toLowerCase() === "delivered"
      ).length,
      cancelled: allOrders.filter(
        (order) => order.status.toLowerCase() === "cancelled"
      ).length,
    };
  }, [allOrders]);

  return (
    <div className="md:border bg-white md:border-gray-50 md:not-only md:p-4 mb-10 rounded-md">
      <div className="">
        <SectionHeader title="My Orders" />

        {/* Order Tabs */}
        <OrderTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          orderCounts={orderCounts}
        />

        {/* Orders List */}
        <div className="mt-6 space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={transformOrderForCard(order)}
                activeTab={activeTab}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} orders found
              </h3>
              <p className="text-gray-500">
                You don't have any {activeTab} orders at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserOrders;

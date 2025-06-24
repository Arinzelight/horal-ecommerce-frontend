"use client";

import { useState, useMemo } from "react";
import OrderTabs from "./OrderTab";
import OrderCard from "./OrderCard";
import { mockOrders } from "../../../data/mockOrder";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";

const UserOrders = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  // Filter orders based on status
  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const status = order.status.toLowerCase();
      switch (activeTab) {
        case "ongoing":
          return ["pending", "processing", "in transit"].includes(status);
        case "delivered":
          return status === "delivered";
        case "cancelled":
          return status === "cancelled";
        default:
          return true;
      }
    });
  }, [activeTab]);

  // Count orders by status
  const orderCounts = useMemo(() => {
    return {
      ongoing: mockOrders.filter((order) =>
        ["pending", "processing", "in transit"].includes(
          order.status.toLowerCase()
        )
      ).length,
      delivered: mockOrders.filter(
        (order) => order.status.toLowerCase() === "delivered"
      ).length,
      cancelled: mockOrders.filter(
        (order) => order.status.toLowerCase() === "cancelled"
      ).length,
    };
  }, []);

  return (
    <div className="">
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
              <OrderCard key={order.id} order={order} activeTab={activeTab} />
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
}
export default UserOrders;

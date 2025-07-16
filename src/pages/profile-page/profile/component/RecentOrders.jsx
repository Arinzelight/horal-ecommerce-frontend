import React from "react";
import { Link } from "react-router-dom";
import OrderCard from "../../../../users-profile/pages/order/OrderCard"

const RecentOrders = ({
  recentOrder,
  orderLoading,
  useOrders,
  transformOrderForCard,
}) => {
  return (
    <div className="w-full bg-white shadow rounded-lg my-10 overflow-x-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl ml-10 my-6">
          Recent Order History
        </h2>
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
  );
};

export default RecentOrders;

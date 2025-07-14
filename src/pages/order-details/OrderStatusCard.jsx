import React from "react";
import { useSelector } from "react-redux";
import OrderStepper from "./OrderStepper";

// Friendly display names for backend statuses
const displayStatus = {
  paid: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out For Delivery",
  delivered: "Delivered",
};

const OrderStatusCard = () => {
  const { currentOrder } = useSelector((state) => state.order);

  const status = currentOrder?.status || "paid";
  const createdAt = currentOrder?.created_at || new Date();

  const readableStatus = displayStatus[status] || status;

  return (
    <div className="w-full p-4 bg-white rounded flex flex-col items-start gap-8 overflow-hidden">
      {/* Stepper component */}
      <OrderStepper status={status} createdAt={createdAt} />

      {/* Delivery Status Section */}
      <div className="w-full flex flex-col items-start gap-2">
        <div className="w-full p-2.5 border-b border-stone-300 flex justify-between items-center">
          <div className="text-neutral-900 text-lg font-bold">
            Delivery Status
          </div>
          <div className="text-secondary-500 text-lg font-bold capitalize">
            {readableStatus}
          </div>
        </div>

        {/* Order Message */}
        <div className="w-full p-2 text-neutral-600 text-sm">
          {status === "paid" && (
            <>
              <p>Your order has been received and is being processed.</p>
              <p>
                You will receive tracking details once your package is out for
                delivery.
              </p>
            </>
          )}

          {status === "shipped" && (
            <>
              <p>Your order has been shipped.</p>
              <p>You will receive tracking information soon.</p>
            </>
          )}

          {status === "out_for_delivery" && (
            <>
              <p>Your order is out for delivery.</p>
              <p>Be ready to receive your package today.</p>
            </>
          )}

          {status === "delivered" && (
            <>
              <p>Your order has been delivered.</p>
              <p>Thank you for shopping with us!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;

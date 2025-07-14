import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; // for formatting date

const OrderDetailsCard = () => {
  const currentOrder = useSelector((state) => state.order.currentOrder);

  if (!currentOrder) {
    return (
      <div className="w-full p-4 bg-white rounded text-center text-gray-600">
        No order found.
      </div>
    );
  }

  const { id, created_at, status, shipping_address, total_amount, user_email } =
    currentOrder;

  return (
    <div className="w-full p-4 bg-white rounded flex flex-col gap-4">
      {/* Header */}
      <div className="border-b border-stone-300 pb-2">
        <h2 className="text-lg font-bold text-neutral-900">Order Details</h2>
      </div>

      {/* Order Details List */}
      <div className="flex flex-col gap-3">
        <DetailItem label="Order ID" value={`${id}`} />
        <DetailItem
          label="Date"
          value={dayjs(created_at).format("DD MMMM YYYY")}
        />
        <DetailItem label="Email" value={user_email} />
        <DetailItem label="Payment Method" value="Horal Escrow (Debit Card)" />
        <DetailItem
          label="Delivery Method"
          value="Horal Logistics / Self Pickup"
        />
        <DetailItem label="Estimated Delivery" value="2–4 business days" />
        <DetailItem label="Order Status" value={status} />
        <DetailItem
          label="Total Amount"
          value={`₦${Number(total_amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
        />
        {shipping_address && (
          <DetailItem
            label="Shipping Address"
            value={`${shipping_address.street_address}, ${shipping_address.local_govt}, ${shipping_address.state}, ${shipping_address.country}`}
          />
        )}
      </div>
    </div>
  );
};

// Reusable detail row component
const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center px-2">
    <div className="text-sm font-bold text-zinc-500">{label}</div>
    <div className="text-sm font-bold text-neutral-600 text-right max-w-[60%]">
      {value}
    </div>
  </div>
);

export default OrderDetailsCard;

import React from "react";

const OrderDetailsCard = () => {
  return (
    <div className="w-full p-4  bg-white rounded flex flex-col gap-4">
      {/* Header */}
      <div className="border-b border-stone-300 pb-2">
        <h2 className="text-lg font-bold  text-neutral-900">Order Details</h2>
      </div>

      {/* Order Details List */}
      <div className="flex flex-col gap-3">
        <DetailItem label="Order ID" value="#HOR12345678" />
        <DetailItem label="Date" value="29 April 2025" />
        <DetailItem label="Payment Method" value="Horal Escrow (Debit Card)" />
        <DetailItem
          label="Delivery Method"
          value="Horal Logistics / Self Pickup"
        />
        <DetailItem label="Estimated Delivery" value="2–4 business days" />
      </div>
    </div>
  );
};

// Reusable detail row component
const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center px-2">
    <div className="text-sm font-bold text-zinc-500">{label}</div>
    <div className="text-sm font-bold text-neutral-600 text-right">{value}</div>
  </div>
);

export default OrderDetailsCard;

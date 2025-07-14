import React from "react";

const OrderItem = ({ title, quantity, price, image, variant }) => {
  return (
    <div className="flex gap-4 items-start">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-16 h-16 rounded object-cover border"
        />
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-neutral-800 text-sm">{title}</h3>

        <div className="text-xs text-gray-500 space-x-2">
          {variant?.color && <span>Color: {variant.color}</span>}
          {variant?.custom_size && <span>Size: {variant.custom_size}</span>}
        </div>

        <p className="text-xs text-gray-500 mt-1">Qty: {quantity}</p>
      </div>
      <div className="text-sm font-bold text-neutral-600">
        ₦{price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default OrderItem;

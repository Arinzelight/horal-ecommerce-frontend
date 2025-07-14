import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const ItemsOrdered = () => {
  const currentOrder = useSelector((state) => state.order.currentOrder);

  const orderedItems = currentOrder?.items || [];
  const subtotal = orderedItems.reduce(
    (acc, item) => acc + parseFloat(item.total_price),
    0
  );
  const shippingFee = 0; // Change if needed
  const totalPaid = subtotal + shippingFee;

  if (!orderedItems.length) {
    return (
      <div className="w-full p-4 bg-white rounded text-center text-gray-600">
        No items found in this order.
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded flex flex-col gap-4">
      <div className="border-b border-stone-300 pb-2">
        <h2 className="text-lg font-bold text-neutral-900 font-nunito">
          Items Ordered
        </h2>
      </div>

      {orderedItems.map((item, index) => (
        <OrderItem
          key={item.id || index}
          title={item.product?.title}
          quantity={item.quantity}
          price={parseFloat(item.total_price)}
          image={item.product?.image}
          variant={item.variant_detail}
        />
      ))}

      <div className="w-full border-t border-neutral-400 pt-2">
        <div className="flex justify-between text-base font-nunito text-zinc-500">
          <span>Subtotal</span>
          <span className="text-neutral-600">
            ₦{subtotal.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between text-base font-nunito text-zinc-500">
          <span>Shipping fee</span>
          <span className="text-neutral-600">
            ₦{shippingFee.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="w-full border-t border-neutral-400 pt-2">
        <div className="flex justify-between text-base font-bold font-nunito text-zinc-500">
          <span>Total Paid</span>
          <span className="text-neutral-600">
            ₦{totalPaid.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemsOrdered;

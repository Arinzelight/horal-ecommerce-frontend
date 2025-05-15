import React from "react";
import OrderItem from "./OrderItem";

const ItemsOrdered = () => {
  const orderedItems = [
    { title: "New Sky Blue Baby Winter Shoes", quantity: 2, price: 50000 },
    { title: "New Sky Blue Baby Winter Shoes", quantity: 2, price: 150000 },
    { title: "New Sky Blue Baby Winter Shoes", quantity: 2, price: 100000 },
  ];

  const subtotal = orderedItems.reduce((acc, item) => acc + item.price, 0);
  const shippingFee = 0;
  const totalPaid = subtotal + shippingFee;

  return (
    <div className="w-full p-4 bg-white rounded flex flex-col gap-4">
      <div className="border-b border-stone-300 pb-2">
        <h2 className="text-lg font-bold text-neutral-900 font-nunito">
          Items Ordered
        </h2>
      </div>

      {orderedItems.map((item, index) => (
        <OrderItem
          key={index}
          title={item.title}
          quantity={item.quantity}
          price={item.price}
        />
      ))}

      {/* Subtotal */}
      <div className="w-full border-t border-neutral-400 pt-2">
        <div className="flex justify-between text-base font-nunito text-zinc-500">
          <span>Subtotal</span>
          <span className="text-neutral-600">
            N {subtotal.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Shipping Fee */}
      <div className="w-full">
        <div className="flex justify-between text-base font-nunito text-zinc-500">
          <span>Shipping fee</span>
          <span className="text-neutral-600">
            N{" "}
            {shippingFee.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Total Paid */}
      <div className="w-full border-t border-neutral-400 pt-2">
        <div className="flex justify-between text-base font-bold font-nunito text-zinc-500">
          <span>Total Paid</span>
          <span className="text-neutral-600">
            N {totalPaid.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemsOrdered;

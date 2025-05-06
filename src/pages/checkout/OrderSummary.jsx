import React from "react";
import { BsPinAngleFill } from "react-icons/bs";
import IMG from "../../assets/images/img3.png";

const OrderSummary = () => {
  const items = [
    {
      id: 1,
      image: IMG,
      title: "New Sky Blue Baby Winter Shoes",
      price: "N 50,000.00",
      quantity: 2,
    },
    {
      id: 2,
      image: IMG,
      title: "New Sky Blue Baby Winter Shoes",
      price: "N 50,000.00",
      quantity: 2,
    },
  ];

  const summary = [
    { label: "Sub-total", value: "3000.00" },
    { label: "Delivery fee", value: "0.00" },
    { label: "Tax", value: "0.00" },
  ];

  const policies = [
    "Return items within 14 days of delivery",
    "Must be unused & in original condition",
    "Refunds processed within 5–7 days",
  ];

  return (
    <div className="flex flex-col gap-10  lg:w-[28%] w-full">
      <div className="bg-white px-4 py-2 rounded flex flex-col gap-4">
        <div className="border-b border-neutral-900 p-2.5">
          <h2 className="text-sm font-bold text-neutral-900">Order Summary</h2>
        </div>

        <div className="flex flex-col  gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex   gap-1">
              <img
                src={item.image}
                alt={item.title}
                className="sm:min-w-34 w-24 sm:h-30 h-24 rounded-tl rounded-bl"
              />
              <div className=" p-2 bg-Color rounded-tr rounded-br flex flex-col justify-between items-end">
                <div className=" space-y-3">
                  <p className="text-[10px] font-bold text-zinc-800">
                    {item.title}
                  </p>
                  <p className="text-xs mb-5 font-bold text-primary">
                    {item.price}
                  </p>
                  <p className="text-[10px] font-bold text-zinc-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-600 flex flex-col">
          {summary.map((line, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2.5 text-sm font-bold"
            >
              <span className="text-zinc-500">{line.label}</span>
              <span className="flex items-center gap-1 text-neutral-900">
                <span>₦</span>
                {line.value}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-500 p-2.5 flex justify-between items-center text-sm font-bold text-neutral-900">
          <span>Total Amount</span>
          <span className="flex items-center gap-1">
            <span>₦</span>
            3000.00
          </span>
        </div>
      </div>
      {/* Return Policy */}
      <div className="px-4 bg-white py-4  rounded flex flex-col items-start gap-6 overflow-hidden">
        <h2 className="text-sm font-bold text-neutral-900 border-b border-neutral-900 w-full pb-2.5">
          Returns & Refunds Policy
        </h2>

        <ul className=" flex flex-col gap-5">
          {policies.map((policy, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-xs text-neutral-900"
            >
              <BsPinAngleFill className="text-sky-500 w-5 h-5 transform rotate-280" />

              <span>{policy}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderSummary;

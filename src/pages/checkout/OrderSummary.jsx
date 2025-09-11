import React from "react";
import { BsPinAngleFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const formatMoney = (amount) => {
  return parseFloat(amount || 0).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const OrderSummary = () => {
  const { currentOrder } = useSelector((state) => state.order);
  const order = currentOrder;

  const summary = [
    {
      label: "Sub-total",
      value: formatMoney(order?.product_total),
    },
    {
      label: "Delivery fee",
      value: formatMoney(order?.shipping_total),
    },
  ];

  const policies = [
    "Return items within 7 days of delivery",
    "Must be unused & in original condition",
    "Refunds processed within 5–7 days",
  ];

  return (
    <div className="flex flex-col gap-10 lg:w-[28%] w-full">
      <div className="bg-white px-4 py-2 rounded flex flex-col gap-4">
        <div className="border-b border-neutral-900 p-2.5">
          <h2 className="text-sm font-bold text-neutral-900">Order Summary</h2>
        </div>

        <div className="flex flex-col gap-4">
          {order?.shipments?.map((shipment) =>
            shipment.items.map((item) => (
              <div key={item.item_id} className="flex gap-1">
                <img
                  src={item?.image}
                  alt={item.product?.title || "Product"}
                  className="sm:min-w-34 w-24 sm:h-30 h-24 rounded-tl rounded-bl object-cover"
                />
                <div className="p-2 bg-Color rounded-tr rounded-br flex flex-col justify-between items-end">
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-zinc-800">
                      {item.product?.title || item.product}
                    </p>
                    <p className="text-xs mb-5 font-bold text-primary">
                      ₦{formatMoney(item.unit_price)}
                    </p>
                    <p className="text-xs font-bold text-zinc-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
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
            {formatMoney(order?.total_amount)}
          </span>
        </div>
      </div>

      {/* Return Policy */}
      <div className="px-4 bg-white py-4 rounded flex flex-col items-start gap-6 overflow-hidden">
        <h2 className="text-sm font-bold text-neutral-900 border-b border-neutral-900 w-full pb-2.5">
          Returns & Refunds Policy
        </h2>

        <ul className="flex flex-col gap-5">
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

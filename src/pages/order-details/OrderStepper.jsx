import React from "react";
import dayjs from "dayjs";

// Backend status flow
const statusFlow = ["paid", "shipped", "out_for_delivery", "delivered"];

// Friendly labels for UI
const labelMap = {
  paid: "Order Received",
  shipped: "Shipped",
  out_for_delivery: "Out For Delivery",
  delivered: "Delivered",
};

const OrderStepper = ({ status, createdAt }) => {
  const currentStepIndex = statusFlow.indexOf(status);

  const steps = statusFlow.map((stepKey, index) => {
    const isCompleted = index <= currentStepIndex;

    return {
      label: labelMap[stepKey] || stepKey,
      completed: isCompleted,
      date:
        index === 0 && createdAt
          ? dayjs(createdAt).format("ddd, D MMM")
          : isCompleted
          ? "✓ Completed"
          : "Pending...",
    };
  });

  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="flex flex-row w-full justify-between items-center gap-0 relative">
        {/* Connector line */}
        <div className="block absolute sm:top-[35px] top-[25px] md:left-[5%] sm:left-[5.5%] left-[12%] sm:right-[3%] right-[12%] md:right-[3.8%] h-1 bg-gray-300 z-0" />

        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 z-10 text-center w-full md:w-auto"
          >
            {/* Step label */}
            <div
              className={`text-[8px] md:text-sm font-medium ${
                step.completed ? "text-green-500" : "text-gray-400"
              }`}
            >
              {step.label}
            </div>

            {/* Step dot */}
            <div
              className={`w-3 h-3 md:w-5 md:h-5 rounded-full ${
                step.completed ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>

            {/* Step date or placeholder */}
            <div className="text-[8px] md:text-xs text-neutral-500 italic">
              {step.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStepper;

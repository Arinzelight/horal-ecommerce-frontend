import React from "react";

const steps = [
  {
    label: "Order Confirmed",
    date: "Wed, 11th Jan",
    completed: true,
  },
  {
    label: "Shipped",
    date: "Wed, 14th Jan",
    completed: false,
  },
  {
    label: "Out For Delivery",
    date: "Wed, 15th Jan",
    completed: false,
  },
  {
    label: "Delivered",
    date: "Fri, 6th Feb",
    completed: false,
  },
];

const OrderStepper = () => {
  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* Stepper wrapper */}
      <div className="flex flex-row w-full justify-between items-center gap-0 relative">
        {/* Connector line for md+ */}
        <div className="block absolute sm:top-[10px] top-[4px] md:left-[5%]  sm:left-[5.5%] left-[12%] sm:right-[3%] right-[12%] md:right-[3.8%] h-1 bg-gray-300 z-0" />

        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 z-10 text-center w-full md:w-auto"
          >
            {/* Dot */}
            <div
              className={`w-3 h-3 md:w-5 md:h-5 rounded-full ${
                step.completed ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>

            {/* Label */}
            <div
              className={`text-[7px] md:text-sm font-medium ${
                step.completed ? "text-green-500" : "text-gray-400"
              }`}
            >
              {step.label}
            </div>

            {/* Date */}
            <div className="text-[6px] md:text-xs text-neutral-500">
              {step.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStepper;

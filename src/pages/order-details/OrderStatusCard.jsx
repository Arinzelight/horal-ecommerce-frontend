import React from "react";
import OrderStepper from "./OrderStepper";

const OrderStatusCard = () => {
  return (
    <div className="w-full p-4 bg-Color  bg-white rounded flex flex-col items-start gap-8 overflow-hidden">
      {/* Stepper component */}
      <OrderStepper />

      {/* Delivery Status Section */}
      <div className="w-full flex flex-col items-start gap-2">
        <div className="w-full p-2.5 border-b border-stone-300 flex justify-between items-center">
          <div className="text-neutral-900 text-lg font-bold">
            Delivery Status
          </div>
          <div className="text-secondary-500 text-lg font-bold">Pending</div>
        </div>

        {/* Order Message */}
        <div className="w-full p-2 text-neutral-600 text-sm">
          <p> Your order is being prepared for dispatch.</p>
          <p>
            {" "}
            You will receive tracking details once your package is out for
            delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;

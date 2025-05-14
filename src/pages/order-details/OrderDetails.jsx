import React from "react";
import CheckoutHeader from "../checkout/CheckoutHeader";
import PaymentSuccessBanner from "./PaymentSuccessBanner";
import OrderStatusCard from "./OrderStatusCard";
import OrderDetailsCard from "./OrderDetailsCard";
import ItemsOrdered from "./ItemsOrdered";
import PickupLocationCard from "./PickupLocationCard";

function OrderDetails() {
  return (
    <div className="py-10 flex flex-col gap-5">
      <div className="w-full">
        <CheckoutHeader />
      </div>
      {/* Payment success Banner  */}

      <PaymentSuccessBanner />

      {/* Order status card */}
      <OrderStatusCard />
      {/* Order details card */}
      <OrderDetailsCard />
      {/* Items ordered */}
      <ItemsOrdered />
      {/* Pick up location card */}
      <PickupLocationCard />
      {/*CTA  buttons */}
      <button className="w-full h-14  hover:opacity-95 hover:cursor-pointer text-white md:text-xl text-base font-semibold md:font-bold px-10 bg-secondary rounded-lg flex justify-center items-center gap-3 overflow-hidden">
        Go To My Order
      </button>
      <button className="w-full  text-neutral-900 hover:cursor-pointer text-base md:text-xl font-semibold md:font-bold h-14 px-10 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-3 overflow-hidden">
        Continue Shopping
      </button>
      {/* Footer */}
      <p className="w-full text-center text-neutral-600 text-xs font-normal">
        Your payment is protected by Horal Escrow and released only when you
        confirm safe delivery.
      </p>
    </div>
  );
}

export default OrderDetails;

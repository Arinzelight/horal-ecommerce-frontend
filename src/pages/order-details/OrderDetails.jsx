import React, { useEffect } from "react";
import { useParams,  Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../redux/order/orderSlice";
import CheckoutHeader from "../checkout/CheckoutHeader";
import PaymentSuccessBanner from "./PaymentSuccessBanner";
import OrderStatusCard from "./OrderStatusCard";
import OrderDetailsCard from "./OrderDetailsCard";
import ItemsOrdered from "./ItemsOrdered";
import PickupLocationCard from "./PickupLocationCard";

function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { loading, error, currentOrder } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [orderId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          Order Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          The order you're trying to view doesn't exist or has been removed.
        </p>
        <Link
          to="/profile-page/order-history"
          className="px-6 py-2 bg-secondary text-white rounded hover:opacity-90"
        >
          Go to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 flex flex-col gap-5">
      <div className="w-full">
        <CheckoutHeader />
      </div>

      <PaymentSuccessBanner />
      <OrderStatusCard />
      <OrderDetailsCard />
      <ItemsOrdered />
      <PickupLocationCard />

      <button className="w-full h-14 hover:opacity-95 hover:cursor-pointer text-white md:text-xl text-base font-semibold md:font-bold px-10 bg-secondary rounded-lg flex justify-center items-center gap-3 overflow-hidden">
        Go To My Order
      </button>
      <button className="w-full text-neutral-900 hover:cursor-pointer text-base md:text-xl font-semibold md:font-bold h-14 px-10 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-3 overflow-hidden">
        Continue Shopping
      </button>

      <p className="w-full text-center text-neutral-600 text-xs font-normal">
        Your payment is protected by Horal Escrow and released only when you
        confirm safe delivery.
      </p>
    </div>
  );
}

export default OrderDetails;

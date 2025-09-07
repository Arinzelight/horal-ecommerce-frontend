import React, { useEffect, useState } from "react";
import CheckoutHeader from "./CheckoutHeader";
import DeliveryAddressSection from "./DeliveryAddressSection";
import DeliveryOptionSection from "./DeliveryOptionSection";
import PaymentMethodSection from "./PaymentMethodSection";
import OrderSummary from "./OrderSummary";
import DeliveryAddressUpdate from "./DeliveryAddressUpdate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteOrderButton from "./DeleteOrderButton";

const Checkout = () => {
  const [editAddress, setEditAddress] = useState(false);
  const [addressWasManuallyUpdated, setAddressWasManuallyUpdated] =
    useState(false);
  const { currentOrder } = useSelector((state) => state.order);
  const navigate = useNavigate();

  // Redirect to cart if no items
  // useEffect(() => {
  //   if (!currentOrder?.items) {
  //     navigate("/cart");
  //   }
  // }, [currentOrder, navigate]);

  // Automatically open address form if address is not set
  useEffect(() => {
    if (!currentOrder?.address) {
      setEditAddress(true);
    }
  }, [currentOrder]);

  const handleEditAddress = () => {
    setEditAddress(true);
  };

  const handleAddressUpdate = () => {
    setAddressWasManuallyUpdated(true);
    setEditAddress(false);
  };

  const shouldShowAddressForm = !currentOrder?.address || editAddress;

  return (
    <div className="py-10 flex justify-center">
      <div className="w-full py-2.5">
        <CheckoutHeader />
        <div className="flex md:flex-row flex-col md:justify-between gap-2 justify-start items-start">
          <div className="flex flex-col lg:w-[65%] w-full gap-5">
            {shouldShowAddressForm ? (
              <DeliveryAddressUpdate onSave={handleAddressUpdate} />
            ) : (
              <DeliveryAddressSection handleEditAddress={handleEditAddress} />
            )}

            <DeliveryOptionSection />
            <PaymentMethodSection canProceed={!!currentOrder?.address} />
            {currentOrder?.id && (
              <div className="flex justify-end">
                <DeleteOrderButton orderId={currentOrder.id} />
              </div>
            )}
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

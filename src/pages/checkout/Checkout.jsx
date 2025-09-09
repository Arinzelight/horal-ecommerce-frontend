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

  // Helper: check if address fields are missing
  const isAddressIncomplete = () => {
    if (!currentOrder || !currentOrder.address) return true;
    const { street, local_govt, state, country, phone_number } =
      currentOrder.address;
    return !street || !local_govt || !state || !country || !phone_number;
  };

  // Automatically open address form if address fields are incomplete
  useEffect(() => {
    if (isAddressIncomplete()) {
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

  const shouldShowAddressForm = isAddressIncomplete() || editAddress;

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
            <PaymentMethodSection canProceed={!isAddressIncomplete()} />

            {/* {currentOrder?.order_id && (
              <div className="flex justify-end">
                <DeleteOrderButton orderId={currentOrder.order_id} />
              </div>
            )} */}
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

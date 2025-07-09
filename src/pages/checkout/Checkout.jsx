import React from "react";
import CheckoutHeader from "./CheckoutHeader";
import DeliveryAddressSection from "./DeliveryAddressSection";
import DeliveryOptionSection from "./DeliveryOptionSection";
import PaymentMethodSection from "./PaymentMethodSection";
import OrderSummary from "./OrderSummary";
import DeliveryAddressUpdate from "./DeliveryAddressUpdate";

const Checkout = () => {
  const [editAddress, setEditAddress] = React.useState(false);
  const [hasUpdatedAddress, setHasUpdatedAddress] = React.useState(false);

  const handleEditAddress = () => {
    setEditAddress(true);
  };

  const handleAddressUpdate = () => {
    setHasUpdatedAddress(true);
    setEditAddress(false);
  };

  return (
    <div className="py-10 flex justify-center">
      <div className="w-full py-2.5">
        <CheckoutHeader />
        <div className="flex md:flex-row flex-col md:justify-between gap-2 justify-start items-start">
          <div className="flex flex-col lg:w-[65%] w-full gap-5">
            {/* If address hasn't been updated, force user to update it */}
            {!hasUpdatedAddress || editAddress ? (
              <DeliveryAddressUpdate onSave={handleAddressUpdate} />
            ) : (
              <DeliveryAddressSection handleEditAddress={handleEditAddress} />
            )}

            <DeliveryOptionSection />
            <PaymentMethodSection canProceed={hasUpdatedAddress} />
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

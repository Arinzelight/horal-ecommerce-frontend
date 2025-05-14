import React from "react";
import CheckoutHeader from "./CheckoutHeader";
import DeliveryAddressSection from "./DeliveryAddressSection";
import DeliveryOptionSection from "./DeliveryOptionSection";
import PaymentMethodSection from "./PaymentMethodSection";
import OrderSummary from "./OrderSummary";
import DeliveryAddressUpdate from "./DeliveryAddressUpdate";

const Checkout = () => {
  const [editAddress, setEditAddress] = React.useState(false);

  const handleEditAddress = () => {
    if (!editAddress) {
      setEditAddress(true);
    }
  };
  return (
    <div className="py-10 flex justify-center">
      <div className="  w-full py-2.5">
        <CheckoutHeader />
        <div className="flex md:flex-row flex-col md:justify-between gap-2 justify-start items-start ">
          <div className="flex flex-col lg:w-[65%] w-full gap-5">
            {!editAddress ? (
              <DeliveryAddressSection handleEditAddress={handleEditAddress} />
            ) : (
              <DeliveryAddressUpdate />
            )}

            <DeliveryOptionSection />
            <PaymentMethodSection />
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

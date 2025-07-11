import React from "react";
import PaymentSuccessIcon from "../../assets/icons/payment-success-icon.svg";

const PaymentSuccessBanner = () => {
  return (
    <>
      <div className="w-full p-4 bg-white rounded flex flex-col items-center gap-4 overflow-hidden">
        <div className="w-32 h-32 relative overflow-hidden">
          <img src={PaymentSuccessIcon} alt="" />
        </div>

        <div className="w-full flex flex-col items-start gap-2">
          <div className="w-full px-2.5">
            <h2 className="text-3xl font-bold text-neutral-900 text-center">
              Payment Successful!
            </h2>
          </div>
          <div className="w-full px-2.5">
            <p className="text-lg text-stone-900 text-center">
              Thank you for shopping with Horal.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessBanner;

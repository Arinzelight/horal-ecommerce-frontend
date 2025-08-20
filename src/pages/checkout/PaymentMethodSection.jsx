import { useDispatch, useSelector } from "react-redux";
import { MdShoppingCartCheckout } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PaystackLogo from "../../assets/logos/Paystack-Logo.png";
import { initializePayment } from "../../redux/payment/paymentSlice";
import { toast } from "../../components/toast";
import { useState } from "react";

const PaymentMethodSection = ({ canProceed }) => {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => state.order);
  const { loading } = useSelector((state) => state.payment);
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!currentOrder?.id || !currentOrder?.user_email) {
      toast.error("Missing order ID or user email");
      return;
    }

    try {
      setProcessing(true);
      const result = await dispatch(
        initializePayment({
          order_id: currentOrder.id,
          email: currentOrder.user_email,
        })
      );

      if (initializePayment.fulfilled.match(result)) {
        const url = result.payload?.data?.authorization_url;

        if (url) {
          window.location.href = url;
        } else {
          toast.error("No authorization URL returned from Paystack.");
        }
      } else {
        toast.error(result.payload?.message || "Failed to initialize payment");
      }
    } catch (err) {
      toast.error("Unexpected error during payment");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="gap-4 flex flex-col bg-white px-3 py-3 rounded">
      <div className="flex items-center justify-between border-b border-stone-300 p-2.5 w-full">
        <div className="flex items-center gap-2 w-96">
          <div className="w-7 h-7 px-2.5 py-1.5 rounded-2xl outline outline-1 outline-offset-[-1px] outline-zinc-500 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-600">3</span>
          </div>
          <span className="text-base font-bold text-neutral-900">
            Pay with Horal Escrow
          </span>
        </div>
      </div>

      <div className="self-stretch text-neutral-600 text-sm font-normal">
        Your payment is held securely and released only when your delivery is
        confirmed successful.
      </div>

      <img className="w-32 h-12" src={PaystackLogo} alt="Paystack logo" />

      <button
        disabled={!canProceed || loading || processing}
        onClick={handlePayment}
        className={`h-8 px-3 my-2 rounded flex items-center justify-center gap-2 text-white text-sm font-semibold ${
          canProceed && !loading && !processing
            ? "bg-secondary hover:opacity-90 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {processing ? (
          <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Proceed to Payment
            <MdShoppingCartCheckout className="w-4 h-4" />
          </>
        )}
      </button>

      {!canProceed && (
        <div className="text-xs text-red-500">
          Please update your delivery address to enable payment.
        </div>
      )}

      <div className="self-stretch text-center text-neutral-600 text-xs font-normal">
        Your payment is protected by Horal Escrow and released only when you
        confirm safe delivery.
      </div>
    </div>
  );
};

export default PaymentMethodSection;

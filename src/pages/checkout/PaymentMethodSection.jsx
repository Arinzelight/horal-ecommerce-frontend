import { useDispatch, useSelector } from "react-redux";
import { MdShoppingCartCheckout } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTag } from "react-icons/fa6";
import PaystackLogo from "../../assets/logos/Paystack-Logo.png";
import { initializePayment } from "../../redux/payment/paymentSlice";
import { applyDiscount } from "../../redux/order/orderSlice";
import { toast } from "../../components/toast";
import { useState } from "react";

//  Money formatter helper
const formatMoney = (amount) => {
  if (isNaN(amount)) return "0.00";
  return parseFloat(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const PaymentMethodSection = ({ canProceed }) => {
  const dispatch = useDispatch();
  const { currentOrder, loading: orderLoading } = useSelector(
    (state) => state.order
  );
  const { loading: paymentLoading } = useSelector((state) => state.payment);
  const [processing, setProcessing] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleApplyDiscount = async () => {
    try {
      const result = await dispatch(applyDiscount());

      if (applyDiscount.fulfilled.match(result)) {
        toast.success("Discount applied successfully");
        setDiscountApplied(true);
      } else {
        toast.error(result.payload?.message || "Failed to apply discount");
      }
    } catch (err) {
      toast.error("Unexpected error applying discount");
    }
  };

  const handlePayment = async () => {
    if (!currentOrder?.order_id || !currentOrder?.user_email) {
      toast.error("Missing order ID or user email");
      return;
    }

    try {
      setProcessing(true);

      // Try to apply discount (if not already applied)
      if (!discountApplied) {
        const discountResult = await dispatch(applyDiscount());
        if (applyDiscount.fulfilled.match(discountResult)) {
          setDiscountApplied(true);
        } else {
          toast.error(
            discountResult.payload?.message ||
              "Discount not applied. Proceeding without it."
          );
        }
      }

      // Proceed with payment
      const result = await dispatch(
        initializePayment({
          order_id: currentOrder?.order_id,
          email: currentOrder?.user_email,
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

      {/* Show discount button only if not applied */}
      {!discountApplied ? (
        <button
          onClick={handleApplyDiscount}
          disabled={orderLoading}
          className={`h-8 px-3 rounded flex items-center justify-center gap-2 text-white text-sm font-semibold ${
            orderLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary cursor-pointer hover:opacity-80"
          }`}
        >
          {orderLoading ? (
            <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <FaTag className="w-4 h-4" />
              Apply Discount
            </>
          )}
        </button>
      ) : (
        <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
          <FaTag className="w-4 h-4" />
          Discount Applied
        </div>
      )}

      <button
        disabled={!canProceed || paymentLoading || processing}
        onClick={handlePayment}
        className={`h-8 px-3 my-2 rounded flex items-center justify-center gap-2 text-white text-sm font-semibold ${
          canProceed && !paymentLoading && !processing
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
        {/*  Example of showing formatted total amount */}
        Total Amount: ₦{formatMoney(currentOrder?.total_amount || 0)}
      </div>
    </div>
  );
};

export default PaymentMethodSection;

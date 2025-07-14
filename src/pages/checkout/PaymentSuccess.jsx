import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { confirmPayment } from "../../redux/payment/paymentSlice";
import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [status, setStatus] = useState("verifying"); // verifying | success | error

  useEffect(() => {
    const reference = params.get("reference");
    if (!reference) {
      toast.error("Missing reference ID from Paystack.");
      navigate("/cart");
      return;
    }

    const confirm = async () => {
      try {
        await dispatch(confirmPayment(reference)).unwrap();
        toast.success("Payment confirmed successfully!");
        setStatus("success");

        const orderId = localStorage.getItem("recent_order_id");
        localStorage.removeItem("recent_order_id");

        setTimeout(() => {
          navigate(`/order-details/${orderId}`);
        }, 2000);
      } catch (error) {
        toast.error("Payment confirmation failed.");
        setStatus("error");
        setTimeout(() => navigate("/cart"), 2000);
      }
    };

    confirm();
  }, [dispatch, params, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {status === "verifying" && (
          <>
            <ImSpinner2 className="text-blue-600 text-4xl animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verifying your payment...
            </h2>
            <p className="text-gray-500 text-sm">
              Please wait while we confirm your transaction.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-500 text-sm">
              Redirecting you to your order details...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-red-500 font-semibold text-lg mb-2">
              Payment Confirmation Failed.
            </p>
            <p className="text-gray-500 text-sm">
              Redirecting you back to cart...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

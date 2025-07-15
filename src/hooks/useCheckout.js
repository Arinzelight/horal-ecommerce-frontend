import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { checkoutOrder } from "../redux/order/orderSlice";
import { useCart } from "./useCart";
import { useState } from "react";

export const useCheckout = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { currentOrder } = useSelector((state) => state.order);
  const user = userInfo?.data;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemCount, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to proceed to checkout.");
      navigate("/signin");
      return;
    }

    if (itemCount === 0) return;

    setIsCheckingOut(true);

    try {
      const result = await dispatch(checkoutOrder());

      if (checkoutOrder.fulfilled.match(result)) {
        const message = result.payload?.message;

        if (
          message === "You already have a pending order" &&
          currentOrder?.status === "pending"
        ) {
          toast.success("Resuming your pending checkout...");
        } else {
          toast.success("Order placed successfully!");
          clearCart();
        }

        navigate("/checkout");
      } else {
        toast.error(result.payload?.message || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      toast.error("Something went wrong during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return { handleCheckout, isCheckingOut };
};

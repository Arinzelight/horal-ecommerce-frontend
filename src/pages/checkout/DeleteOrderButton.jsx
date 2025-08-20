import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/toast";
import { deleteOrder } from "../../redux/order/orderSlice";

const DeleteOrderButton = ({ orderId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!orderId) return;

    const confirm = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirm) return;

    try {
      await dispatch(deleteOrder(orderId)).unwrap();
      toast.success("Order cancelled successfully.");
      navigate("/cart");
    } catch (error) {
      toast.error(error?.message || "Failed to cancel order.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-2 bg-error cursor-pointer w-full flex justify-center items-center gap-2 text-sm text-white text-center px-4 py-2 rounded hover:bg-red-600 transition"
    >
      <FaTrash className="w-4 h-4" />
      Cancel Order
    </button>
  );
};

export default DeleteOrderButton;

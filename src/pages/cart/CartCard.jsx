import React, { useState, useEffect } from "react";
import { FaMinusCircle, FaPlusCircle, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItem,
} from "../../redux/cart/thunk/cartThunk";
import toast from "react-hot-toast";

const CartCard = ({ item, onQuantityChange }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update local quantity when item prop changes
  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const handleQuantityIncrease = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); // Optimistic update

    try {
      await dispatch(
        updateCartItem({
          item_id: item.id,
          quantity: newQuantity,
        })
      ).unwrap();

      if (onQuantityChange) {
        onQuantityChange(item.id, newQuantity);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      setQuantity(quantity); // Revert on error
      toast.error("Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuantityDecrease = async () => {
    if (isUpdating || quantity <= 1) return;

    setIsUpdating(true);
    const newQuantity = quantity - 1;
    setQuantity(newQuantity); // Optimistic update

    try {
      await dispatch(
        updateCartItem({
          item_id: item.id,
          quantity: newQuantity,
        })
      ).unwrap();

      if (onQuantityChange) {
        onQuantityChange(item.id, newQuantity);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      setQuantity(quantity); // Revert on error
      toast.error("Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async () => {
    if (isUpdating) return;

    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (!confirmRemove) return;

    setIsUpdating(true);

    try {
      await dispatch(
        removeFromCart({
          item_id: item.id,
          product_id: item.product_id,
          variant_id: item.variant_id,
        })
      ).unwrap();

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from cart");
    } finally {
      setIsUpdating(false);
    }
  };

  const placeholderImg =
    "https://ui-avatars.com/api/?name=Image&background=cccccc&color=ffffff&size=400";

  // Get the actual price from the item structure
  const itemPrice = item.product?.price || item.price || 0;
  const totalPrice = parseFloat(itemPrice) * quantity;

  return (
    <div className="relative">
      <div className="w-full flex flex-col md:flex-row md:h-[212px] lg:h-[235px]">
        {/* Image Section */}
        <div className="relative w-full md:w-[234px] flex-shrink-0 h-[200px] md:h-full">
          <img
            src={
              placeholderImg ||
              item.product?.images?.[0]?.url ||
              item.product?.image
            }
            alt={item.product?.title || item.name}
            className="w-full h-full object-cover"
          />

          {/* Close Button - Mobile */}
          <button
            onClick={handleRemoveItem}
            disabled={isUpdating}
            className="absolute top-2 right-2 md:right-4 bg-white p-1 rounded-full shadow-md text-primary cursor-pointer md:hidden"
          >
            <LiaTimesSolid size={16} />
          </button>

          {/* Verified Badge */}
          {item.product?.isVerified && (
            <div className="absolute bottom-2 right-2 md:right-4 bg-primary-900 text-white px-2 py-1 rounded-full flex items-center text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="mr-1"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12.438 1.248c4.27 0 7.75 3.48 7.75 7.75c0 2.48-1.18 4.69-3 6.11v5.4c0 1.03 0 1.78-.69 2.12c-.17.08-.33.12-.49.12c-.5 0-.99-.36-1.61-.83l-1.21-.91l-.091-.067c-.283-.211-.57-.424-.66-.433c-.09.01-.376.222-.659.433l-.09.067l-1.2.9l-.027.02c-.816.61-1.4 1.046-2.084.7c-.69-.34-.69-1.09-.69-2.12v-5.4c-1.82-1.42-3-3.63-3-6.11c0-4.27 3.48-7.75 7.75-7.75"
                />
              </svg>
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 bg-white md:px-4 pt-2 md:shadow-sm justify-between">
          <div className="flex-1 mx-2 md:mx-0 relative">
            {/* Price */}
            <div className="text-[17.63px] md:text-[20.63px] font-bold text-primary mb-1 h-[24px] md:h-[28px] flex items-center">
              ₦{parseFloat(itemPrice).toLocaleString("en-NG")}
            </div>

            {/* Title */}
            <div className="h-[40px] md:h-[44px] mb-1 flex items-start">
              {item.product?.title && (
                <h3 className="font-medium text-[15.43px] md:text-[18px] line-clamp-2 text-gray-900">
                  {item.product?.title}
                </h3>
              )}
            </div>

            {/* Rating */}
            <div className="h-[20px] md:h-[24px] pt-1 md:pt-3 flex items-start">
              {item.rating && (
                <div className="flex items-center text-secondary">
                  <FaStar className="fill-secondary text-secondary" size={12} />
                  <span className="text-xs ml-1 mt-1">{item.rating}</span>
                </div>
              )}
            </div>

            {/* Brand and State*/}
            <div className="h-[32px] md:h-[36px] my-2 flex items-start">
              <div className="flex items-center gap-4 text-xs text-primary-900">
                <span className="capitalize bg-primary-50 px-2 py-1 rounded">
                  {item.product?.condition?.replace("_", " ")}
                </span>
                <span className="bg-primary-50 px-2 py-1 rounded">
                  {item.product?.state || ""}
                </span>
              </div>
            </div>

            {/* View Product Link */}
            <div className="absolute bottom-0 md:relative md:bottom-auto mb-3 md:mb-0">
              <Link
                to={`/product/${item.product_id || item.id}`}
                className="text-secondary text-[14px] font-medium hover:underline"
              >
                View Product
              </Link>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-col items-center md:items-end justify-between md:w-24 md:mb-8 mt-26 mr-2 md:mt-0">
            {/* Remove Button - Desktop */}
            <button
              onClick={handleRemoveItem}
              disabled={isUpdating}
              className="hidden md:block text-primary cursor-pointer hover:bg-red-50 p-1 rounded transition-colors disabled:opacity-50"
              title="Remove item"
            >
              <LiaTimesSolid size={20} />
            </button>

            {/* Quantity Controls */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-sm font-medium mb-2">
                <span className="text-[16px] font-medium md:ml-2">
                  Quantity
                </span>
              </div>
              <div className="mb-2  md:md-0 flex items-center space-x-3 border-[1px] border-neutral-100 rounded-lg p-1">
                <button
                  onClick={handleQuantityDecrease}
                  disabled={quantity <= 1 || isUpdating}
                  className={`p-1 rounded transition-colors ${
                    quantity <= 1 || isUpdating
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-primary hover:bg-primary cursor-pointer"
                  }`}
                  aria-label="Decrease quantity"
                >
                  <FaMinusCircle size={18} />
                </button>

                <span className="text-base font-semibold w-8 text-center">
                  {isUpdating ? "..." : quantity}
                </span>

                <button
                  onClick={handleQuantityIncrease}
                  disabled={isUpdating}
                  className={`p-1 rounded transition-colors ${
                    isUpdating
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-primary hover:bg-blue-50"
                  }`}
                  aria-label="Increase quantity"
                >
                  <FaPlusCircle size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

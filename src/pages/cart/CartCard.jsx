import React, { useState, useEffect } from "react";
import { FaMinusCircle, FaPlusCircle, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { useCart } from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";

const CartCard = ({ item }) => {
  const { updateItemQuantity, removeItemFromCart } = useCart();

  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Update local quantity when item prop changes
  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const handleQuantityChange = async (newQuantity) => {
    if (isUpdatingQuantity || newQuantity < 1) return;

    setIsUpdatingQuantity(true);
    try {
      // Get current variant information from the cart item
      const currentColor = item.user_selected_variant?.color || item.color;
      const currentSize =
        item.user_selected_variant?.custom_size ||
        item.user_selected_variant?.standard_size ||
        item.standard_size;

      const updateOptions = {
        ...(currentColor && { color: currentColor }),
        ...(currentSize && { standard_size: currentSize }),
      };

      await updateItemQuantity(item.id, newQuantity, updateOptions);
      setQuantity(newQuantity);
    } catch (error) {
      toast.error("Failed to update quantity");
      // Reset to original quantity on error
      setQuantity(item.quantity);
    } finally {
      setIsUpdatingQuantity(false);
    }
  };

  const handleQuantityIncrease = async () => {
    await handleQuantityChange(quantity + 1);
  };

  const handleQuantityDecrease = async () => {
    await handleQuantityChange(quantity - 1);
  };

  const handleRemoveItem = async () => {
    if (isRemoving) return;

    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (!confirmRemove) return;

    setIsRemoving(true);
    try {
      await removeItemFromCart(item.id);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsRemoving(false);
    }
  };

  const placeholderImg =
    "https://ui-avatars.com/api/?name=Image&background=cccccc&color=ffffff&size=400";

  const itemPrice = item.product?.price || item.price || 0;
  const totalPrice = parseFloat(itemPrice) * quantity;

  // Get variant information from user_selected_variant or fallback to item properties
  const selectedColor = item.user_selected_variant?.color || item.color;
  const selectedSize =
    item.user_selected_variant?.custom_size ||
    item.user_selected_variant?.standard_size ||
    item.standard_size;

  return (
    <div className="relative">
      <div className="w-full flex flex-col md:flex-row md:h-[212px] lg:h-[235px]">
        {/* Image Section */}
        <div className="relative w-full md:w-[234px] flex-shrink-0 h-[200px] md:h-full">
          <img
            src={
              item.product?.images?.[0]?.url ||
              placeholderImg ||
              item.product?.image
            }
            alt={item.product?.title || item.name}
            className="w-full h-full object-cover"
          />

          {/* Remove Button - Mobile */}
          <button
            onClick={handleRemoveItem}
            disabled={isRemoving}
            className="absolute top-2 right-2 md:right-4 bg-white p-1 rounded-full shadow-md text-primary cursor-pointer md:hidden"
          >
            {isRemoving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            ) : (
              <FaTrash size={16} />
            )}
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
            <div className="md:mb-8 flex w-full ">
              {item.product?.title && (
                <h3 className="font-medium text-[15.43px] md:text-[18px] line-clamp-2 text-gray-900">
                  {item.product?.title}
                </h3>
              )}
            </div>

            {/* Rating */}
            {/* <div className="h-[20px] md:h-[24px] pt-1 md:pt-3 flex items-start">
              {item.rating && (
                <div className="flex items-center text-secondary">
                  <FaStar className="fill-secondary text-secondary" size={12} />
                  <span className="text-xs ml-1 mt-1">{item.rating}</span>
                </div>
              )}
            </div> */}

            {/* Selected Variant Information */}
            {(selectedColor || selectedSize) && (
              <div className="h-[28px] md:h-[32px] my-2 flex items-start">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  {selectedColor && (
                    <span className="bg-gray-50 font-bold px-2 py-1 rounded capitalize">
                      Color: {selectedColor}
                    </span>
                  )}
                  {selectedSize && (
                    <span className="bg-gray-50 font-bold px-2 py-1 rounded">
                      Size: {selectedSize}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* condition and State*/}
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
                to={`/product/${item.product?.slug}`}
                className="text-secondary text-[14px] font-medium hover:underline"
              >
                View Product
              </Link>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className=" flex flex-col items-center md:items-end justify-between md:w-24 md:mb-8 mt-26 mr-2 md:mt-0">
            {/* Remove Button - Desktop */}
            <button
              onClick={handleRemoveItem}
              disabled={isRemoving}
              className="hidden md:flex items-center justify-center text-primary cursor-pointer hover:bg-red-50 p-1 rounded transition-colors disabled:opacity-50"
              title="Remove item"
            >
              {isRemoving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              ) : (
                <FaTrash size={20} />
              )}
            </button>

            {/* Quantity Controls */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-sm font-medium mb-2">
                <span className="text-[16px] font-medium md:ml-2">
                  Quantity
                </span>
              </div>
              <div className="mb-2 md:mb-0 flex items-center space-x-3 border-[1px] border-neutral-100 rounded-lg p-1">
                <button
                  onClick={handleQuantityDecrease}
                  disabled={quantity <= 1 || isUpdatingQuantity}
                  className={`p-1 rounded transition-colors ${
                    quantity <= 1 || isUpdatingQuantity
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-primary hover:bg-primary cursor-pointer"
                  }`}
                  aria-label="Decrease quantity"
                >
                  {isUpdatingQuantity && quantity === item.quantity - 1 ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  ) : (
                    <FaMinusCircle size={18} />
                  )}
                </button>

                <span className="text-base font-semibold w-8 text-center">
                  {isUpdatingQuantity ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mx-auto"></div>
                  ) : (
                    quantity
                  )}
                </span>

                <button
                  onClick={handleQuantityIncrease}
                  disabled={isUpdatingQuantity}
                  className={`p-1 rounded transition-colors ${
                    isUpdatingQuantity
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-primary hover:bg-blue-50"
                  }`}
                  aria-label="Increase quantity"
                >
                  {isUpdatingQuantity && quantity === item.quantity + 1 ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  ) : (
                    <FaPlusCircle size={18} />
                  )}
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

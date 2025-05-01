import React, { useState } from "react";
import { SlBadge } from "react-icons/sl";
import { FaTimes, FaMinusCircle, FaPlusCircle, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import useMobile from "../../hooks/use-mobile";
import { LiaTimesSolid } from "react-icons/lia";

const CartCard = ({ item, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const isMobile = useMobile();

  const handleQuantityIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const totalPrice = item.price * quantity;

  if (isMobile) {
    return (
      <div className="shadow-xs relative">
        <div className="flex flex-col w-full">
          <div className="relative mb-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-full object-cover"
            />
            <button className="absolute top-2 right-4 bg-white p-1 rounded-full shadow-md text-primary hover:text-secondary">
              <LiaTimesSolid size={16} />
            </button>

            {item.isVerified && (
              <div className="absolute bottom-2 right-4 bg-primary-900 text-white px-2 py-1 rounded-full flex items-center text-xs">
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
                    d="M12.438 1.248c4.27 0 7.75 3.48 7.75 7.75c0 2.48-1.18 4.69-3 6.11v5.4c0 1.03 0 1.78-.69 2.12c-.17.08-.33.12-.49.12c-.5 0-.99-.36-1.61-.83l-1.21-.91l-.091-.067c-.283-.211-.57-.424-.66-.433c-.09.01-.376.222-.659.433l-.09.067l-1.2.9l-.027.02c-.816.61-1.4 1.046-2.084.7c-.69-.34-.69-1.09-.69-2.12v-5.4c-1.82-1.42-3-3.63-3-6.11c0-4.27 3.48-7.75 7.75-7.75m0 1.5c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25s6.25-2.8 6.25-6.25s-2.8-6.25-6.25-6.25m3.25 17.77v-4.49a7.7 7.7 0 0 1-6.5 0v4.99l.147-.109q.122-.089.242-.181l1.21-.91c.64-.48 1.07-.8 1.65-.8s1.01.32 1.65.8l1.2.9c.14.1.28.2.4.29zm-6.29-9.09l.25-1.68h.04l-1.15-1.2c-.3-.31-.4-.75-.26-1.16c.13-.4.47-.69.88-.76l1.57-.26l.73-1.5c.19-.39.58-.63 1-.63s.81.24 1 .63l.73 1.5l1.57.26c.41.07.75.36.88.76c.13.41.03.85-.26 1.16l-1.15 1.2l.25 1.68c.06.44-.12.86-.47 1.11c-.34.24-.79.27-1.16.07l-1.41-.75l-1.41.75c-.16.09-.34.13-.52.13c-.22 0-.45-.06-.64-.2c-.36-.25-.53-.68-.47-1.11m2.57-4.23c-.16.33-.47.56-.82.62l-1.09.18l.8.84c.24.25.35.61.3.96l-.17 1.13l.93-.49c.16-.09.34-.13.52-.13s.36.04.52.13l.93.49l-.17-1.13c-.05-.35.06-.71.3-.96l.8-.84l-1.09-.18a1.13 1.13 0 0 1-.82-.62l-.47-.97z"
                  />
                </svg>
                <span>Verified</span>
              </div>
            )}
          </div>
          <div className="mx-2">
            <div className="text-[17.63px] font-bold text-primary mb-1">
              ₦ {totalPrice.toLocaleString("en-NG")}
            </div>

            <div className="mb-2">
              <h3 className="font-medium text-[15.43px] mb-1 text-gray-900">
                {item.name}
              </h3>

              <div className="flex items-center text-secondary">
                <span className="text-xs">
                  <FaStar className="fill-secondary text-secondary" size={12} />
                </span>
                <span className="text-xs ml-1 mt-1">{item.rating}</span>
              </div>
              <div className="flex flex-row items-center gap-1 justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-primary-900 my-2">
                    <span className="bg-primary-50 p-1">
                      {item.brand || "Brand New"}
                    </span>

                    <span className="bg-primary-50 p-1">
                      {item.location || "Location"}
                    </span>
                  </div>
                  <div className="mb-3">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-secondary text-sm font-medium"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-center mr-12 gap-3 mt-2">
                  <div>
                    <span className="text-[16px] font-medium -ml-2">
                      Quantity
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleQuantityDecrease}
                      className={`p-1 hover:bg-primary-50 ${
                        quantity === 1 ? "text-gray-300" : "text-primary"
                      }`}
                      aria-label="Decrease quantity"
                      disabled={quantity === 1}
                    >
                      <FaMinusCircle size={20} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleQuantityIncrease}
                      className="p-1 hover:bg-gray-100 rounded text-primary"
                      aria-label="Increase quantity"
                    >
                      <FaPlusCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex h-[212px]">
        <div className="relative w-[234px] flex-shrink-0">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.isVerified && (
            <div className="absolute bottom-2 right-2 bg-primary-900 text-white px-2 py-1 rounded-full flex items-center text-xs">
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
                  d="M12.438 1.248c4.27 0 7.75 3.48 7.75 7.75c0 2.48-1.18 4.69-3 6.11v5.4c0 1.03 0 1.78-.69 2.12c-.17.08-.33.12-.49.12c-.5 0-.99-.36-1.61-.83l-1.21-.91l-.091-.067c-.283-.211-.57-.424-.66-.433c-.09.01-.376.222-.659.433l-.09.067l-1.2.9l-.027.02c-.816.61-1.4 1.046-2.084.7c-.69-.34-.69-1.09-.69-2.12v-5.4c-1.82-1.42-3-3.63-3-6.11c0-4.27 3.48-7.75 7.75-7.75m0 1.5c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25s6.25-2.8 6.25-6.25s-2.8-6.25-6.25-6.25m3.25 17.77v-4.49a7.7 7.7 0 0 1-6.5 0v4.99l.147-.109q.122-.089.242-.181l1.21-.91c.64-.48 1.07-.8 1.65-.8s1.01.32 1.65.8l1.2.9c.14.1.28.2.4.29zm-6.29-9.09l.25-1.68h.04l-1.15-1.2c-.3-.31-.4-.75-.26-1.16c.13-.4.47-.69.88-.76l1.57-.26l.73-1.5c.19-.39.58-.63 1-.63s.81.24 1 .63l.73 1.5l1.57.26c.41.07.75.36.88.76c.13.41.03.85-.26 1.16l-1.15 1.2l.25 1.68c.06.44-.12.86-.47 1.11c-.34.24-.79.27-1.16.07l-1.41-.75l-1.41.75c-.16.09-.34.13-.52.13c-.22 0-.45-.06-.64-.2c-.36-.25-.53-.68-.47-1.11m2.57-4.23c-.16.33-.47.56-.82.62l-1.09.18l.8.84c.24.25.35.61.3.96l-.17 1.13l.93-.49c.16-.09.34-.13.52-.13s.36.04.52.13l.93.49l-.17-1.13c-.05-.35.06-.71.3-.96l.8-.84l-1.09-.18a1.13 1.13 0 0 1-.82-.62l-.47-.97z"
                />
              </svg>
              <span>Verified</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 bg-white px-4 pt-2 shadow-sm justify-between">
          <div className="flex-1">
            <div className="text-[20.63px] font-bold text-primary mb-1">
              ₦ {totalPrice.toLocaleString("en-NG")}
            </div>
            <h3 className="font-medium line-clamp-2">{item.name}</h3>

            <div className="flex pt-3 items-center text-secondary">
              <span className="text-xs">
                <FaStar className="fill-secondary text-secondary" size={12} />
              </span>
              <span className="text-xs ml-1 mt-1">{item.rating}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-primary-900 my-2">
              <span className="bg-primary-50 p-1">
                {item.brand || "Brand New"}
              </span>

              <span className="bg-primary-50 p-1">
                {item.location || "Location"}
              </span>
            </div>

            <Link
              to={`/product/${item.id}`}
              className="text-secondary text-sm font-medium"
            >
              View Product
            </Link>
          </div>

          <div className="flex flex-col items-end justify-between w-24">
            <button className="text-primary">
              <LiaTimesSolid size={20} />
            </button>
            <div className="mb-8">
              <div className="text-sm font-medium  mb-2">
                <span className="text-[16px] font-medium ml-2">Quantity</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuantityDecrease}
                  className={`p-1 hover:bg-primary-50 ${
                    quantity === 1 ? "text-gray-300" : "text-primary"
                  }`}
                  aria-label="Decrease quantity"
                  disabled={quantity === 1}
                >
                  <FaMinusCircle size={20} />
                </button>
                <span className="text-base font-medium w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleQuantityIncrease}
                  className="p-1 hover:bg-primary-50 text-primary"
                  aria-label="Increase quantity"
                >
                  <FaPlusCircle size={20} />
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

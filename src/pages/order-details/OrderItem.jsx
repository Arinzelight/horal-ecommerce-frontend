import React from "react";
import IMG from "../../assets/images/img3.png";

const OrderItem = ({ title, quantity, price, imageUrl }) => {
  return (
    <>
      <div className=" w-full flex   items-start  gap-2  rounded-md">
        {/* Image */}
        <img
          src={IMG}
          alt="product"
          className="w-24 h-24 sm:w-36 sm:h-36 rounded-tl rounded-bl object-cover"
        />

        {/* Product Info */}
        <div className="w-full">
          <div className="  flex sm:flex-row flex-col">
            <h3 className="text-[10px] sm:text-base font-bold text-zinc-800 w-full ">
              New Sky Blue Baby Winter Shoes
            </h3>
            <p className="text-xs sm:text-lg font-extrabold text-neutral-600">
              N50,000.00
            </p>
          </div>
          <p className="text-[10px] sm:text-lg font-bold text-neutral-400">
            Quantity: 2
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderItem;

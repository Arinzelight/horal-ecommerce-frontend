import React from "react";
import { FaTag } from "react-icons/fa";

const MovingBanner = () => {
  return (
    <div className="bg-[#FF6B00] text-white h-[33px] rounded-sm  overflow-hidden mt-4 mb-6  ">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <FaTag className="mx-2 text-white" size={16} />
        <span className="mx-4">
          Black Friday Deals - Up to 70% off on all items!
        </span>
        <FaTag className="mx-2" size={40} />
        <span className="mx-4">Free shipping on orders above ₦10,000!</span>
        <FaTag className="mx-2" size={20} />
        <span className="mx-4">
          Use code WELCOME20 for 20% off your first order!
        </span>
        <FaTag className="mx-2" size={20} />
        <span className="mx-4">Flash Sales every day at 2PM!</span>
      </div>
    </div>
  );
};

export default MovingBanner;

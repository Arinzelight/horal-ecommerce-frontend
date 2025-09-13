import React from "react";
import Megaphone from "../../assets/images/home-banners/megaphone.png";

const MovingBanner = () => {
  const messages = [
    "Black Friday Deals - Up to 70% off on all items!",
    "Free shipping on orders above ₦10,000!",
    "Use code WELCOME20 for 20% off your first order!",
    "Flash Sales every day at 2PM!",
  ];

  return (
    <div className="bg-[#FF6B00] text-white py-1 rounded-sm overflow-hidden mt-4 mb-6">
      <div className="animate-marquee whitespace-nowrap flex items-center ">
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            <img
              src={Megaphone}
              alt="megaphone"
              className="mx-2 w-5 h-5 object-contain"
            />
            <span className="mx-4">{msg}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MovingBanner;

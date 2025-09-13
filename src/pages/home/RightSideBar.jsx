import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import AirPod from "../../assets/images/home-banners/airpod.png";
import Phone from "../../assets/images/home-banners/phone.png";
import { Link } from "react-router-dom";

const RightSideBar = () => {
  return (
    <aside className="flex flex-col gap-4 h-full">
      {/* ===== Top Banner ===== */}
      <div className="relative bg-banner-dark rounded-md p-5 h-[270px] flex items-center justify-between overflow-hidden">
        {/* Top-right ₦3000 OFF button */}
        <button className="absolute top-4 right-4 bg-banner-yellow px-3 py-2 font-bold text-gray-900 rounded shadow-sm">
          ₦3000 OFF
        </button>

        {/* Left text */}
        <div className="text-white z-10">
          <p className="uppercase text-banner-yellow text-xs tracking-wide">
            Discount Coupon
          </p>
          <h2 className="xl:text-3xl text-xl font-bold max-w-[60%] mt-3">
            On all Purchases
          </h2>
          <Link to="/category/gadget">
            <button className="mt-3 cursor-pointer px-4 py-3 bg-banner-orange text-white text-sm rounded-sm shadow-xs hover:opacity-90 flex items-center gap-2">
              SHOP NOW SAVE BIG <FaArrowRight />
            </button>
          </Link>
        </div>

        {/* Phone image at bottom-right */}
        <img
          src={Phone}
          alt="Phone"
          className="absolute bottom-0 right-0 w-42 sm:w-50 object-contain"
        />

        {/* T&C text */}
        <p className="absolute bottom-2 left-3 text-xs text-white/70">
          T&amp;C APPLY
        </p>
      </div>

      {/* ===== Bottom Banner ===== */}
      <div className="flex gap-3 bg-banner-gray rounded-md p-5 flex-1 items-center justify-between overflow-hidden">
        {/* AirPod image bottom-left */}
        <img
          src={AirPod}
          alt="AirPod"
          className="w-32 sm:w-36 object-contain"
        />

        {/* Right text */}
        <div className="z-10 ml-auto">
          <h3 className="lg:text-lg text-base font-semibold text-gray-900">
            Xiaomi FlipBuds Pro
          </h3>
          <p className="text-base font-bold text-primary mt-1">₦158,000.00</p>
          <Link to="/category/gadget">
            <button className="mt-3 px-2 cursor-pointer py-2 bg-banner-orange text-white font-semibold text-xs rounded hover:opacity-90 transition flex items-center gap-1">
              Shop Now <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import SignupBannerImage from "../../assets/images/auth-images/signup-banner.png";

const SignupBanner = () => {
  return (
    <div className="hidden lg:block w-[516px] h-[990px]  relative bg-primary rounded-2xl overflow-hidden">
      <img
        className="absolute w-[1332px] h-[749px]  top-[263px] insert-0  z-0"
        src={SignupBannerImage}
        alt="Login Banner"
      />
      <div className="absolute top-14 left-7 z-10 flex items-center gap-4">
        <FaArrowLeftLong className="text-white" />
        <Link to="/" className="text-white text-lg font-bold">
          Back to Home
        </Link>
      </div>
      <div className="absolute top-44 left-7 z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-white text-4xl font-bold leading-tight mb-2">
          Enjoy Fast & Secured Payments
        </h2>
        <p className="text-white text-lg">
          Shop for your best products and make seem-less and fast payments
        </p>
      </div>
    </div>
  );
};

export default SignupBanner;

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import LoginBannerImage from "../../assets/images/auth-images/login-banner.png";

const LoginBanner = () => {
  return (
    <div className="hidden md:block w-[516px] h-[990px] relative bg-sky-500 rounded-2xl overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={LoginBannerImage}
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
          Shop with Confidence
        </h2>
        <p className="text-white text-lg">
          Shop for your favorite product with confidence
        </p>
      </div>
    </div>
  );
};

export default LoginBanner;

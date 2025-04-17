import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import SignupBannerImage from "../../assets/images/auth-images/verify-email-banner.png";

const VerifyEmailBanner = () => {
  return (
    <div className="hidden lg:block w-[516px] h-[990px] relative bg-primary rounded-2xl overflow-hidden">
      <img
        className="absolute w-[748px] h-[1122px]  top-[-90px] insert-0  z-0"
        src={SignupBannerImage}
        alt="Login Banner"
      />
      <div className="absolute top-14 left-7 z-10 flex items-center gap-4">
        <FaArrowLeftLong className="text-white" />
        <Link to="/" className="text-white text-lg font-semibold">
          Back to Home
        </Link>
      </div>
      <div className="absolute top-44 left-7 z-10 flex flex-col items-center text-center px-4">
        <p class="w-[453px] text-center justify-start text-white text-5xl font-bold  leading-[54.68px]">
          Perfect Gifts, For Everyone
        </p>
        <p class="w-[453px] text-center justify-start text-white text-xl font-normal ">
          Discover unique gifts for every occasion
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailBanner;

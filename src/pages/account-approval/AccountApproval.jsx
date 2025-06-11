import React from "react";
import { Link } from "react-router-dom";
import SignupStepper from "../signup/SignupStepper";
import { FaArrowLeftLong } from "react-icons/fa6";
import HoralLogo from "../../assets/images/horal-logo-1.png";
import Bags from "../../assets/images/auth-images/bags.png";
import Shirts from "../../assets/images/auth-images/shirts.png";
import Shoe from "../../assets/images/auth-images/shoe.png";
import AuthBanner from "../../components/auth/AuthBanner";

const AccountApproval = () => {
  const [currentStep, setCurrentStep] = React.useState(3);
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10  items-start min-h-screen  p-4 lg:pt-4 pt-10">
      {/* Side Banner  */}
      <AuthBanner />

      {/* Main Content */}
      <div className="w-full max-w-[597.5px] mx-auto   rounded-lg md:pt-8 pt-0 ">
        <Link to="/" className="block mb-6">
          <img src={HoralLogo} alt="Horal Logo" className="h-10" />
        </Link>
        <SignupStepper currentStep={currentStep} />
        <div className="my-13">
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">
            Your Account Has Been Approved!!!{" "}
          </h1>
          <p className="text-base text-zinc-700 text-center mb-6">
            Welcome to Horal
          </p>
        </div>

        <div className="self-stretch inline-flex justify-center   items-start gap-[2px]">
          {/* Left box */}
          <div className="w-72 inline-flex flex-col justify-start items-start gap-2">
            <img
              className="self-stretch sm:h-80 h-48  relative rounded-2xl  outline-[3.13px] sm:outline-[5px] outline-white"
              src={Bags}
              alt="Main"
            />
            <div class="self-stretch   relative bg-primary-50 rounded-2xl  sm:outline-[5px] outline-[3.13px] outline-white overflow-hidden">
              {/* <div class="w-6 h-6 relative"></div> */}
              <div class="text-center sm:py-3 py-2 flex justify-center text-zinc-800 sm:text-xs text-[7.51px] font-semibold ">
                You can now shop with ease & confidence
              </div>
            </div>
          </div>

          {/* Right box */}
          <div className=" relative">
            <img
              class="sm:w-72 w-46 h-30 sm:h-46 rounded-2xl  outline-[5px] outline-white"
              src={Shirts}
            />
            <img
              class="sm:w-72 w-46 h-30 sm:h-46  absolute sm:top-[185px] top-[110px] "
              src={Shoe}
            />
          </div>
        </div>
        {/* Redirect button */}
        <Link to="/">
          <button className="w-full cursor-pointer mt-16 h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition">
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AccountApproval;

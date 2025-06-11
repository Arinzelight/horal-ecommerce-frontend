import React from "react";
import { IoInformationCircle } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import HoralLogo from "../../assets/images/horal-logo-1.png";
import { Link } from "react-router-dom";
import AuthBanner from "../../components/auth/AuthBanner";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10  items-start min-h-screen  p-4 lg:pt-4 pt-10">
      <AuthBanner />
      <div className="w-full max-w-[597.5px] mx-auto  rounded-lg md:pt-8 pt-0 ">
        <Link to="/" className="block mb-6">
          <img src={HoralLogo} alt="Horal Logo" className="h-10" />
        </Link>
        <div className="my-10">
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">
            Forgot Password
          </h1>
          <p className="text-base text-zinc-700 text-center mb-6">
            Input your email address
          </p>
        </div>

        {/* Email Input */}
        <form className="mb-5">
          <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
            Email Address
            <span className="text-error">*</span>
            <IoInformationCircle className="text-gray-400 text-xl" />
          </label>

          <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <FaRegEnvelope className="text-primary text-xl" />
            </div>
            <input
              type="email"
              placeholder="e.g. adebisistanley@gmail.com"
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
          <button className="w-full cursor-pointer  h-14 my-10 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition">
            Send OTP{" "}
          </button>

          {/* Sign in Prompt */}
          <p className="text-center sm:text-base text-sm text-neutral-800 font-normal ">
            Remembered your password?{" "}
            <Link
              to="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

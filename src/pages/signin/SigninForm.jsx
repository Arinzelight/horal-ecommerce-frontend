import React from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa6";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import HoralLogo from "../../assets/images/horal-logo-1.png";

const SigninForm = () => {
  return (
    <div className="w-full max-w-[597.5px] mx-auto  bg-white  rounded-lg md:pt-8 pt-0 ">
      <Link to="/" className="block mb-6">
        <img src={HoralLogo} alt="Horal Logo" className="h-10" />
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">
        Welcome Back!
      </h1>
      <p className="text-base text-zinc-700 text-center mb-6">
        Log in to access your account, manage orders, and shop with confidence.
      </p>

      {/* Email Input */}
      <div className="mb-5">
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
      </div>

      {/* Password Input */}
      <div className="mb-5">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          Password
          <IoInformationCircle className="text-gray-400 text-xl" />
        </label>

        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <HiOutlineLockClosed className="text-primary text-xl" />
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex justify-between items-center mb-6">
        <label className="flex items-center gap-2 text-sm text-neutral-900">
          <input type="checkbox" />
          Remember me
        </label>

        <span className="text-sm text-primary cursor-pointer">
          Forgot password?
        </span>
      </div>

      {/* Login Button */}
      <button className="w-full cursor-pointer mb-6 h-14 bg-secondary rounded-lg text-white text-xl font-semibold hover:opacity-85 transition">
        Log In
      </button>

      {/* Google Login */}
      <button
        type="button"
        className="w-full mb-10 cursor-pointer max-w-[595px] h-14 px-6 md:px-28 bg-neutral-50 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-neutral-200 flex justify-center items-center gap-4 hover:bg-neutral-100 transition-colors duration-200"
      >
        <FcGoogle className=" text-2xl" />
        <span className="text-zinc-800 text-base md:text-lg font-bold">
          Continue with Google
        </span>
      </button>

      {/* Sign Up Prompt */}
      <p className="text-center text-base text-neutral-800 font-normal">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SigninForm;

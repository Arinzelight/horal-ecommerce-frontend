import React, { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";
import HoralLogo from "../../assets/images/horal-logo-1.png";
import { Link } from "react-router-dom";
import PasswordChecklist from "../signup/PasswordChecklist";
import AuthBanner from "../../components/AuthBanner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10  items-start min-h-screen  p-4 lg:pt-4 pt-10">
      <AuthBanner />

      <form className="w-full max-w-[597.5px] mx-auto bg-white  rounded-lg md:pt-8 pt-0 ">
        <Link to="/" className="block mb-6">
          <img src={HoralLogo} alt="Horal Logo" className="h-10" />
        </Link>
        <div className="my-10">
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">
            Set a New Password{" "}
          </h1>
          <p className="text-base text-zinc-700 text-center mb-6">
            Create a strong password to keep your account secure.
          </p>
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
            New Password
            <IoInformationCircle className="text-gray-400 text-xl" />
          </label>

          <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <HiOutlineLockClosed className="text-primary text-xl" />
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        {/* confirm new password */}
        <div className="mb-5">
          <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
            Confirm New Password
            <IoInformationCircle className="text-gray-400 text-xl" />
          </label>

          <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <HiOutlineLockClosed className="text-primary text-xl" />
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={ConfirmPassword}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        {/* Password Checklist */}
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          password={password}
          onChange={(isValid) => console.log("Password valid:", isValid)}
          messages={{
            minLength: "At least 8 characters",
            specialChar: "At least one special character",
            number: "At least one number",
            capital: "At least one capital letter",
            match: "Passwords match",
          }}
          className="text-sm mb-6 text-gray-700"
        />

        {/* Terms and conditions */}
        <label className="flex items-center gap-2 my-10 sm:text-sm text-[10px] text-neutral-900">
          <input type="checkbox" />I agree to Horal’s{" "}
          <Link className="text-primary">Terms & Conditions</Link> and{" "}
          <Link className="text-primary"> Privacy Policy</Link>
        </label>

        {/* signup Button */}
        <button className="w-full cursor-pointer mb-6 h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

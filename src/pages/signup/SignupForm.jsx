import React from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa6";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import HoralLogo from "../../assets/images/horal-logo-1.png";
import { FiPhone } from "react-icons/fi";
import SignupStepper from "./SignupStepper";
import PasswordChecklist from "./PasswordChecklist";

const SignupForm = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [password, setPassword] = React.useState("");

  return (
    <form className="w-full max-w-[597.5px] mx-auto bg-white  rounded-lg md:pt-8 pt-0 ">
      <Link to="/" className="block mb-6">
        <img src={HoralLogo} alt="Horal Logo" className="h-10" />
      </Link>
      <SignupStepper currentStep={currentStep} />
      <div className="my-10">
        <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">
          Welcome to Horal{" "}
        </h1>
        <p className="text-base text-zinc-700 text-center mb-6">
          Horal is a trusted e-commerce platform that give you the ease to shop
          for any product you desire and get it in no time!!{" "}
        </p>
      </div>

      <div className="flex sm:flex-row  sm:gap-5 gap-0 flex-col justify-between items-center">
        {/* First Name* Input */}
        <div className="mb-5 w-full">
          <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
            First Name <span className="text-error">*</span>
            <IoInformationCircle className="text-gray-400 text-xl" />
          </label>

          <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <FaRegEnvelope className="text-primary text-xl" />
            </div>
            <input
              type="text"
              placeholder="Adebisi"
              className="flex-1 h-14  px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        {/* Last Name* Input */}
        <div className="mb-5 w-full">
          <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
            Last Name <span className="text-error">*</span>
            <IoInformationCircle className="text-gray-400 text-xl" />
          </label>

          <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <FaRegEnvelope className="text-primary text-xl" />
            </div>
            <input
              type="email"
              placeholder="Stanley"
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>
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

      {/* Phone Number Input */}
      <div className="mb-5">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          Phone Number
          <span className="text-error">*</span>
          <IoInformationCircle className="text-gray-400 text-xl" />
        </label>

        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <FiPhone className="text-primary text-xl" />
          </div>
          <input
            type="phone"
            placeholder="e.g.  07033417291"
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
      <label className="flex items-center gap-2 my-10 text-sm text-neutral-900">
        <input type="checkbox" />I agree to Horal’s{" "}
        <Link className="text-primary">Terms & Conditions</Link> and{" "}
        <Link className="text-primary"> Privacy Policy</Link>
      </label>

      {/* signup Button */}
      <button className="w-full cursor-pointer mb-6 h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition">
        Continue to Register
      </button>

      {/* Google Login */}
      <button
        type="button"
        className="w-full mb-10 cursor-pointer max-w-[595px] h-14 px-6 md:px-28 bg-neutral-50 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-neutral-200 flex justify-center items-center gap-4 hover:bg-neutral-100 transition-colors duration-200"
      >
        <FcGoogle className=" text-2xl" />
        <span className="text-zinc-800 text-base md:text-lg font-bold">
          Register with Google
        </span>
      </button>

      {/* Sign in Prompt */}
      <p className="text-center text-base text-neutral-800 font-normal">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary hover:underline font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;

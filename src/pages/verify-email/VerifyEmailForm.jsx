import React, { useRef, useState, useEffect } from "react";
import HoralLogo from "../../assets/images/horal-logo-1.png";
import { Link } from "react-router-dom";
import SignupStepper from "../signup/SignupStepper";

const VerifyEmailForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="w-full max-w-[597.5px] mx-auto bg-white rounded-lg md:pt-8 pt-0">
      <Link to="/" className="block mb-6">
        <img src={HoralLogo} alt="Horal Logo" className="h-10" />
      </Link>
      <SignupStepper currentStep={currentStep} />

      <div className="w-full flex flex-col justify-start items-center gap-2 my-10">
        <div className="text-center text-neutral-900 text-2xl font-bold font-nunito">
          Verify your email
        </div>
        <div className="text-center text-base font-nunito text-zinc-800">
          We sent a code to{" "}
          <span className="text-sky-500 font-bold">
            adebisistanley@gmail.com
          </span>
        </div>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center items-center gap-5 mt-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`sm:w-20 sm:h-20 w-16 h-16 text-center text-5xl focus:outline-primary font-semibold font-nunito text-neutral-900 bg-neutral-50 rounded-lg outline outline-[3px] outline-offset-[-3px] ${
              digit ? "outline-primary" : "outline-neutral-200"
            }`}
          />
        ))}
      </div>
      <div className="self-stretch text-center justify-start mt-5">
        <span className="text-zinc-800 text-base font-normal ">
          Didn't get a code?{" "}
        </span>
        <span className="text-sky-500 text-base font-bold  underline">
          Click to resend
        </span>
      </div>
      {/* signup Button */}
      <button className="w-full cursor-pointer mt-10 h-14 bg-secondary rounded-lg text-white text-xl font-semibold hover:opacity-85 transition">
        Continue to Register
      </button>
    </div>
  );
};

export default VerifyEmailForm;

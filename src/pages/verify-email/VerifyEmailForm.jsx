import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import HoralLogo from "../../assets/images/horal-logo-1.png";
import SignupStepper from "../signup/SignupStepper";
import { toast } from "react-hot-toast";
import { verifyEmail } from "../../redux/auth/authThunks/verifyEmail";

const VerifyEmailForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const email = useSelector(
    (state) => state.registration?.emailForVerification
  );

  useEffect(() => {
    inputsRef.current[0]?.focus();
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

  const handleSubmit = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4 || !email) {
      toast.error("Please enter all 4 digits and ensure email is provided.");
      return;
    }

    try {
      const result = await dispatch(
        verifyEmail({ email, otp: fullOtp })
      ).unwrap();
      toast.success("Email verified successfully!");
      navigate("/account-approval");
    } catch (err) {
      toast.error(err || "Verification failed");
    }
  };

  return (
    <div className="w-full max-w-[597.5px] mx-auto  rounded-lg md:pt-8 pt-0">
      <Link to="/" className="block mb-6">
        <img src={HoralLogo} alt="Horal Logo" className="h-10" />
      </Link>
      <SignupStepper currentStep={2} />

      <div className="w-full flex flex-col justify-start items-center gap-2 my-10">
        <div className="text-center text-neutral-900 text-2xl font-bold font-nunito">
          Verify your email
        </div>
        <div className="text-center sm:text-base text-xs font-nunito text-zinc-800">
          We sent a code to{" "}
          <span className="text-primary font-bold">{email}</span>
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
            className={`sm:w-20 sm:h-20 w-16 h-16 text-center sm:text-4xl text-3xl focus:outline-primary font-semibold font-nunito text-neutral-900 bg-neutral-50 rounded-lg outline outline-[3px] outline-offset-[-3px] ${
              digit ? "outline-primary" : "outline-neutral-200"
            }`}
          />
        ))}
      </div>
      <div className="self-stretch text-center justify-start mt-5 sm:text-base text-xs">
        <span className="text-zinc-800 font-normal">Didn't get a code? </span>
        <span className="text-primary font-bold underline cursor-pointer">
          Click to resend
        </span>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full cursor-pointer mt-10 h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition"
      >
        Continue to Register
      </button>
    </div>
  );
};

export default VerifyEmailForm;

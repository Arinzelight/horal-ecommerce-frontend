import React, { useRef, useState, useEffect } from "react";
import HoralLogo from "../../assets/images/horal-logo-1.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthBanner from "../../components/auth/AuthBanner";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../redux/auth/authSlice/userSlice";
import { toast } from "../../components/toast";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location.state, userId from localStorage (fallback)
  const email = location.state?.email;
  const userId = location.state?.userId || localStorage.getItem("resetUserId");

  const { loading, error } = useSelector((state) => state.user);

  // Guard: redirect if email or userId is missing
  useEffect(() => {
    if (!email || !userId) {
      toast.error("Missing reset details. Please start over.");
      navigate("/forgot-password");
    }
  }, [email, userId, navigate]);

  // Focus first input on mount
  useEffect(() => {
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace
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

  // Submit OTP
  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }

    try {
      await dispatch(verifyOtp({ email, otp: code, user_id: userId })).unwrap();
      // Cleanup localStorage after success
      localStorage.removeItem("resetUserId");
      toast.success("OTP verified successfully!");
      navigate("/reset-password", { state: { email, userId } });
    } catch (err) {
      toast.error(err || "OTP verification failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 items-start min-h-screen p-4 lg:pt-4 pt-10">
      <AuthBanner />

      <div className="w-full max-w-[597.5px] mx-auto rounded-lg md:pt-8 pt-0">
        <Link to="/" className="block mb-6">
          <img src={HoralLogo} alt="Horal Logo" className="h-10" />
        </Link>

        <div className="w-full flex flex-col justify-start items-center gap-2 my-10">
          <div className="text-center text-neutral-900 text-2xl font-bold font-nunito">
            OTP Verification
          </div>
          <div className="text-center sm:text-base text-xs font-nunito text-zinc-800">
            Enter the OTP sent to{" "}
            <span className="text-primary font-bold">{email}</span> to proceed
          </div>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center items-center gap-1 mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`sm:w-15 sm:h-15 w-13 h-13 text-center text-2xl  focus:outline-primary font-semibold font-nunito text-neutral-900 bg-neutral-50 rounded-lg outline outline-[3px] outline-offset-[-3px] ${
                digit ? "outline-primary" : "outline-neutral-200"
              }`}
            />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {Array.isArray(error?.non_field_errors)
              ? error.non_field_errors[0]
              : error}
          </p>
        )}

        <div className="self-stretch text-center justify-start mt-5 sm:text-base text-xs">
          <span className="text-zinc-800 font-normal">
            Didn’t receive the OTP?{" "}
          </span>
          <span
            className="text-primary font-bold underline cursor-pointer"
            onClick={() => {
              toast.info("Resend OTP feature coming soon.");
            }}
          >
            Click to resend
          </span>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full cursor-pointer mt-10 h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;

import React, { useState, useEffect } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HoralLogo from "../../assets/images/horal-logo-1.png";
import AuthBanner from "../../components/auth/AuthBanner";
import PasswordChecklist from "../signup/PasswordChecklist";
import { toast } from "../../components/toast";
import { confirmPasswordReset } from "../../redux/auth/authSlice/userSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.user);

  // Get userId from location state or localStorage
  useEffect(() => {
    const idFromState = location.state?.userId;
    const idFromStorage = localStorage.getItem("resetUserId");
    setUserId(idFromState || idFromStorage);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) return toast.error("You must agree to the terms");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    if (!userId)
      return toast.error("User ID not found. Please restart the reset flow.");

    try {
      await dispatch(
        confirmPasswordReset({
          user_id: userId,
          new_password: password,
          confirm_password: confirmPassword,
        })
      ).unwrap();

      toast.success("Password reset successful. Please login.");
      localStorage.removeItem("resetUserId");
      navigate("/password-reset-success");
    } catch (err) {
      toast.error(err || "Password reset failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 items-start min-h-screen p-4 lg:pt-4 pt-10">
      <AuthBanner />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[597.5px] mx-auto bg-white rounded-lg md:pt-8 pt-0"
      >
        <Link to="/" className="block mb-6">
          <img src={HoralLogo} alt="Horal Logo" className="h-10" />
        </Link>

        <div className="my-10 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Set a New Password
          </h1>
          <p className="text-base text-zinc-700">
            Create a strong password to keep your account secure.
          </p>
        </div>

        {/* New Password */}
        <div className="mb-5">
          <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
            New Password{" "}
            <IoInformationCircle className="text-gray-400 text-xl" />
          </label>
          <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <HiOutlineLockClosed className="text-primary text-xl" />
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
            Confirm New Password{" "}
            <IoInformationCircle className="text-gray-400 text-xl" />
          </label>
          <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <HiOutlineLockClosed className="text-primary text-xl" />
            </div>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Password Checklist */}
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          password={password}
          valueAgain={confirmPassword}
          messages={{
            minLength: "At least 8 characters",
            specialChar: "At least one special character",
            number: "At least one number",
            capital: "At least one capital letter",
            match: "Passwords match",
          }}
          className="text-sm mb-6 text-gray-700"
        />

        {/* Terms */}
        <label className="flex items-center gap-2 my-10 sm:text-sm text-[10px] text-neutral-900">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          I agree to Horal’s{" "}
          <Link to="/terms-and-conditions" className="text-primary">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-primary">
            Privacy Policy
          </Link>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !agreed}
          className="w-full h-14 mb-6 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

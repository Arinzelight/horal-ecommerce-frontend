import React from "react";
import { Link } from "react-router-dom";
// import SignupBanner from "../signup/SignupBanner";
import HoralLogo from "../../assets/images/horal-logo-1.png";
import Padlock from "../../assets/images/auth-images/padlock.gif";
import AuthBanner from "../../components/auth/AuthBanner";

const PasswordResetSuccess = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10  items-start min-h-screen  p-4 lg:pt-4 pt-10">
      <AuthBanner />

      <div className="w-full max-w-[597.5px] mx-auto bg-white  rounded-lg md:pt-8 pt-0 ">
        <Link to="/" className="block mb-6">
          <img src={HoralLogo} alt="Horal Logo" className="h-10" />
        </Link>
        <div className="my-10 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">
            Password Reset Successful!{" "}
          </h1>
          <p className="text-base text-zinc-700 text-center mb-6">
            Your password has been updated. Sign in now to continue shopping{" "}
          </p>
          <div>
            <img class="w-72 h-72" src={Padlock} />{" "}
          </div>
        </div>
        <Link
          to="/signin"
          className="w-full cursor-pointer h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold flex items-center justify-center hover:opacity-85 transition"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;

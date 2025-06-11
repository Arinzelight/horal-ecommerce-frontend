import React from "react";
import SignupForm from "./SignupForm";
import AuthBanner from "../../components/auth/AuthBanner";

const Signup = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10  items-start min-h-screen  p-4 lg:pt-4 pt-10">
      <AuthBanner />
      <SignupForm />
    </div>
  );
};

export default Signup;

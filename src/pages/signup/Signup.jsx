import React from "react";
import SignupBanner from "./SignupBanner";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-10  items-start min-h-screen  p-4 md:pt-4 pt-10">
      <SignupBanner />
      <SignupForm />
    </div>
  );
};

export default Signup;

import React from "react";
import LoginBanner from "./SigninBanner";
import LoginForm from "./SigninForm";

const Signin = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-10  items-start min-h-screen  p-4 md:pt-4 pt-10">
      <LoginBanner />
      <LoginForm />
    </div>
  );
};

export default Signin;

import React from "react";
import LoginForm from "./SigninForm";
import AuthBanner from "../../components/auth/AuthBanner";

const Signin = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-10  items-start min-h-screen !px  p-4 md:pt-4 pt-10">
      <AuthBanner />
      <LoginForm />
    </div>
  );
};

export default Signin;

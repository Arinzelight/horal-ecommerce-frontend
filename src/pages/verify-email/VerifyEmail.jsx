import React from "react";
import VerifyEmailForm from "./VerifyEmailForm";
import AuthBanner from "../../components/auth/AuthBanner";

const VerifyEmail = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10  items-start min-h-screen  p-4 lg:pt-4 pt-10">
      <AuthBanner />
      <VerifyEmailForm />
    </div>
  );
};

export default VerifyEmail;

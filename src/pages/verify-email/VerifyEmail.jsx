import React from "react";
import VerifyEmailBanner from "./VerifyEmailBanner";
import VerifyEmailForm from "./VerifyEmailForm";

const VerifyEmail = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10  items-start min-h-screen  p-4 lg:pt-4 pt-10">
      <VerifyEmailBanner />
      <VerifyEmailForm />
    </div>
  );
};

export default VerifyEmail;

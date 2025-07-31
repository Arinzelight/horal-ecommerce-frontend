import React from "react";
import { Link } from "react-router-dom";

const SuccessfulKYC = () => {
  return (
    <div className="flex flex-col items-center min-h-[100vh] py-20 px-4 w-full">
      <div className="w-full  flex flex-col justify-start items-start gap-10 px-4">
        <div className="w-full flex flex-col justify-start items-center gap-4 text-center">
          <h2 className="text-stone-900 text-xl sm:text-3xl font-bold font-nunito">
            Verification Completed
          </h2>
          <p className="text-stone-900 text-sm sm:text-lg font-nunito">
            Thank you for submitting your KYC documents! Our team will review
            your details within <span className="font-bold">48 hours</span>. You
            will receive the status of your verification via email and on your
            dashboard.
          </p>
        </div>

        <Link
          to="/sellers-dashboard"
          className="w-full h-14 bg-orange-500 rounded-lg flex justify-center items-center cursor-pointer hover:opacity-90 transition"
        >
          <span className="text-white text-base sm:text-xl font-semibold sm:font-bold ">
            Go to Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulKYC;

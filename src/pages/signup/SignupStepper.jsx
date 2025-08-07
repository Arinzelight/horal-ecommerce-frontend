import React from "react";
import { FaCheck } from "react-icons/fa";

const steps = ["Sign Up", "Email Verification", "Account Approval"];

const SignupStepper = ({ currentStep = 1 }) => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:flex justify-between relative px-4 mt-6">
        {steps.map((label, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Line between steps */}
              {idx < steps.length - 1 && (
                <div className="absolute top-3 left-1/2 w-full h-1 z-0">
                  <div
                    className={`h-1 ${
                      idx < currentStep - 1 ? "bg-sky-500" : "bg-neutral-200"
                    }`}
                  ></div>
                </div>
              )}

              {/* Step Circle */}
              <div
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-2 border-neutral-200 bg-white"
                }`}
              >
                {isCompleted ? <FaCheck className="w-3 h-3 " /> : idx + 1}
              </div>

              {/* Step Label */}
              <div
                className={`mt-2 text-xs font-nunito ${
                  isCompleted || isActive ? "text-primary" : "text-neutral-400"
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="flex sm:hidden justify-between items-center relative px-2 mt-6">
        {steps.map((label, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Line between steps */}
              {idx < steps.length - 1 && (
                <div className="absolute top-2.5 left-1/2 w-full h-1 z-0">
                  <div
                    className={`h-1 ${
                      idx < currentStep - 1 ? "bg-sky-500" : "bg-neutral-200"
                    }`}
                  ></div>
                </div>
              )}

              {/* Step Circle */}
              <div
                className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  isCompleted
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border border-neutral-200 bg-white"
                }`}
              >
                {isCompleted ? <FaCheck className="w-3 h-3" /> : idx + 1}
              </div>

              {/* Step Label */}
              <div
                className={`mt-1 text-[10px] text-center leading-none ${
                  isCompleted || isActive ? "text-primary" : "text-neutral-400"
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SignupStepper;

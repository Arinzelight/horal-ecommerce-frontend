import React from "react";

const SignupStepper = ({ currentStep }) => {
  const steps = [
    { label: "Sign Up", left: "27.14px", circleLeft: "40px", step: 0 },
    {
      label: "Email Verification",
      left: "242px",
      circleLeft: "287px",
      step: 1,
    },
    {
      label: "Account Approval",
      left: "477.17px",
      circleLeft: "532px",
      step: 2,
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="relative min-w-[600px] md:min-w-full h-24 md:h-24 mx-auto scale-90 md:scale-100 origin-left">
        <div className="relative w-full h-11">
          {/* Connecting lines - scaled proportionally */}
          <div className="absolute left-[306.48px] top-[30.6px] w-32 h-2">
            <div className="absolute left-[3.53px] top-[-0.44px] w-56 h-2 bg-neutral-200"></div>
          </div>
          <div className="absolute left-[154.84px] top-[30.6px] w-32 h-2">
            <div className="absolute left-[-91.84px] top-[-0.44px] w-56 h-2 bg-neutral-200"></div>
          </div>

          {/* Step Circles */}
          {steps.map((step) => (
            <div
              key={step.step}
              className={`absolute left-[${step.circleLeft}] top-[22.16px] w-6 h-6`}
            >
              <div
                className={`absolute w-6 h-6 rounded-full border-2 ${
                  currentStep === step.step
                    ? "border-sky-500"
                    : "border-neutral-200"
                }`}
              />
            </div>
          ))}

          {/* Labels */}
          {steps.map((step) => (
            <div
              key={`label-${step.step}`}
              className={`absolute left-[${
                step.left
              }] top-0 text-sm text-center font-normal leading-tight font-inter ${
                currentStep === step.step ? "text-sky-500" : "text-neutral-200"
              }`}
            >
              {step.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignupStepper;

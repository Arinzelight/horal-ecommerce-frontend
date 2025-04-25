import React from "react";

const SignupStepper = () => {
  return (
    <>
      {/* Desktop View - visible on medium and larger screens */}
      <div className="hidden sm:block self-stretch h-11 relative">
        {/* Gray line to the right */}
        <div className="w-32 h-2 absolute left-[306.47px] top-[30.6px]">
          <div className="w-56 h-2 absolute left-[3.53px] top-[-0.44px] bg-neutral-200"></div>
        </div>

        {/* Blue line to the left */}
        <div className="w-32 h-2 absolute left-[154.84px] top-[30.6px]">
          <div className="w-56 h-2 absolute left-[-91.84px] top-[-0.44px] bg-sky-500"></div>
        </div>

        {/* Third circle */}
        <div className="w-6 h-5 absolute left-[532px] top-[23.4px]">
          <div className="w-6 h-6 absolute left-0 top-0 rounded-3xl border-2 border-neutral-200"></div>
        </div>

        {/* Second circle */}
        <div className="w-6 h-5 absolute left-[287px] top-[23.4px]">
          <div className="w-6 h-6 absolute left-0 top-[-0.24px]">
            <div className="w-6 h-6 absolute left-0 top-[-0.24px] rounded-3xl border-2 border-sky-500"></div>
          </div>
        </div>

        {/* First circle */}
        <div className="w-6 h-6 absolute left-[40px] top-[21.16px]">
          <div className="w-6 h-6 absolute left-[-1px] top-0">
            <div className="w-6 h-6 absolute left-0 top-0 bg-primary rounded-full"></div>
            <svg
              className="w-3 h-3 absolute left-[6px] top-[8px]"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5L4 8.5L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-[479.17px] top-0 sm:text-sm text-xs text-neutral-200 font-normal leading-tight">
          Account Approval
        </div>
        <div className="absolute left-[242px] top-0 sm:text-sm text-xs text-primary font-normal text-center leading-tight">
          Email Verification
        </div>
        <div className="absolute left-[25.14px] top-0 sm:text-sm text-xs text-primary font-normal text-center leading-tight">
          Sign Up
        </div>
      </div>

      {/* Mobile View - visible on small screens only */}
      <div className="block sm:hidden  h-9 relative">
        {/* Gray line */}
        <div className="absolute left-[190px] top-[24px] w-32 h-1.5">
          <div className="absolute left-[-2px] top-0 w-32 h-1.5 bg-neutral-200"></div>
        </div>

        {/* Blue line */}
        <div className="absolute left-[93.21px] top-[24.48px] w-20 h-1.5">
          <div className="absolute left-[-51.21px] top-[-0.45px] w-32 h-1.5 bg-primary"></div>
        </div>

        {/* Third step */}
        <div className="absolute left-[320px] top-[18px] w-5 h-5">
          <div className="absolute w-5 h-5 rounded-full border-[1.6px] border-neutral-200"></div>
        </div>

        {/* Second step */}
        <div className="absolute left-[170px] top-[18px] w-5 h-5">
          <div className="absolute w-5 h-5 rounded-full border-[1.6px] border-primary"></div>
        </div>

        {/* First step */}
        <div className="absolute left-[23px] top-[18px] w-5 h-5">
          <div className="absolute left-[1px] top-[0.16px] w-5 h-5">
            <div className="absolute w-5 h-5 bg-blue-600 rounded-full">
              <svg
                className="w-3 h-3 text-white absolute top-1 left-[6px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l3 3L17 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-[275.05px] top-0 text-[10px] text-neutral-400 leading-none">
          Account Approval
        </div>
        <div className="absolute left-[136.21px] top-0 text-[10px] text-primary text-center leading-none">
          Email Verification
        </div>
        <div className="absolute left-[13.29px] top-0 text-[10px] text-primary text-center leading-none">
          Sign Up
        </div>
      </div>
    </>
  );
};

export default SignupStepper;

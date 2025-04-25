import React from "react";

const KYCStepper = (activeStep) => {
  return (
    <div className="relative h-12 w-full">
      {/* Progress bars */}
      <div className="absolute left-[497.12px] top-[34px] w-52 h-2">
        <div className="absolute left-[-1.12px] top-0 h-2 w-96 bg-neutral-200" />
      </div>
      <div className="absolute left-[251.16px] top-[34px] w-52 h-2">
        <div className="absolute left-[-155.16px] top-0 h-2 w-96 bg-neutral-200" />
      </div>

      {/* Circles */}
      <div className="absolute left-[873px] top-[26px] w-6 h-6">
        <div
          className={`absolute left-[0.09px] top-0 h-6 w-6 rounded-full border-2 ${
            activeStep >= 3 ? "border-sky-500" : "border-neutral-200"
          }`}
        />
      </div>
      <div className="absolute left-[473px] top-[26px] w-6 h-6">
        <div
          className={`absolute top-0 left-0 h-6 w-6 rounded-full border-2 ${
            activeStep >= 2 ? "border-sky-500" : "border-neutral-200"
          }`}
        />
      </div>
      <div className="absolute left-[73px] top-[26px] w-6 h-6">
        <div
          className={`absolute top-0 left-0 h-6 w-6 rounded-full border-2 ${
            activeStep >= 1 ? "border-sky-500" : "border-neutral-200"
          }`}
        />
      </div>

      {/* Labels */}
      <div className="absolute left-[843.75px] top-0 text-sm text-neutral-200">
        Social Media Links
      </div>
      <div className="absolute left-[382px] top-0 text-sm text-neutral-200 text-center">
        Upload Proof of Address
      </div>
      <div className="absolute left-[3.46px] top-0 text-sm text-sky-500">
        Upload a valid ID
      </div>
    </div>
  );
};

export default KYCStepper;

import React from "react";
import { PiHandWavingDuotone } from "react-icons/pi";

const GreetingMessage = ({
  greeting = "Good morning Godly,",
  subtitle = "Here’s what’s happening with your store today",
}) => {
  return (
    <div className="mb-6">
      <div className="text-xl flex gap-2 font-bold text-neutral-900 font-nunito">
        <p> {greeting}</p>
        <span className="text-2xl">
          <PiHandWavingDuotone color="#2196f3" />
        </span>
      </div>
      <p className="text-lg text-neutral-900 font-nunito">{subtitle}</p>
    </div>
  );
};

export default GreetingMessage;

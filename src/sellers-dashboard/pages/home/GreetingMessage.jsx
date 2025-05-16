import React from "react";

const GreetingMessage = ({
  greeting = "Good morning Godly,",
  subtitle = "Here’s what’s happening with your store today",
}) => {
  return (
    <div className="mb-6">
      <p className="text-xl font-bold text-neutral-900 font-nunito">
        {greeting} <span className="text-2xl">👋</span>
      </p>
      <p className="text-lg text-neutral-900 font-nunito">{subtitle}</p>
    </div>
  );
};

export default GreetingMessage;

import { useState } from "react";

const DeliveryOptionSection = () => {
  const [selectedOption, setSelectedOption] = useState("HoralLogistics");
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePickupClick = (e) => {
    e.preventDefault();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className="gap-4 flex flex-col bg-white px-3 py-3 rounded relative">
      <div className="flex items-center justify-between border-b border-stone-300 p-2.5 w-full">
        <div className="flex items-center gap-2 w-96">
          <div className="w-7 h-7 px-2.5 py-1.5 rounded-2xl outline outline-1 outline-offset-[-1px] outline-zinc-500 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-600">2</span>
          </div>
          <span className="text-base font-bold text-neutral-900">
            Delivery Option
          </span>
        </div>
      </div>

      <div className="text-neutral-600 text-sm font-normal">
        Choose How You Want to Receive Your Order
      </div>

      {/* First Radio Option (disabled + tooltip) */}
      <div
        className="flex justify-between items-start relative group"
        onClick={handlePickupClick}
      >
        <label
          htmlFor="pickup"
          className="flex items-center gap-2 cursor-not-allowed opacity-50"
        >
          <input
            type="radio"
            name="deliveryOption"
            id="pickup"
            className="sm:w-6 sm:h-6 w-4 h-4 cursor-not-allowed"
            disabled
          />
          <span className="text-sm font-medium text-neutral-700">
            Pick Up Yourself
          </span>
        </label>

        <span className="text-secondary-500 text-xs font-normal">Free</span>

        {/* Tooltip: show on hover (desktop) or state (mobile tap) */}
        <div
          className={`absolute left-0 -top-8 hidden group-hover:flex items-center ${
            showTooltip ? "flex" : ""
          }`}
        >
          <div className="bg-neutral-900 text-white text-xs px-3 py-1 rounded shadow-md">
            🚧 Coming Soon
          </div>
        </div>
      </div>

      {/* Info below first option */}
      <div className="text-neutral-600 text-xs font-normal">
        You’ll receive a pickup location and time after order confirmation.
      </div>

      {/* Second Radio Option (default checked) */}
      <div className="flex justify-between items-start">
        <label
          htmlFor="HoralLogistics"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="deliveryOption"
            id="HoralLogistics"
            className="sm:w-6 sm:h-6 w-4 h-4"
            checked={selectedOption === "HoralLogistics"}
            onChange={() => setSelectedOption("HoralLogistics")}
          />
          <span className="text-xs font-bold text-neutral-600">
            Horal Logistics
          </span>
        </label>
        <span className="text-secondary-500 text-xs font-normal">
          Additional Cost Applies
        </span>
      </div>

      {/* Info below second option */}
      <div className="text-neutral-600 text-xs font-normal">
        Delivery fees vary based on your location. Track your package in
        real-time.
      </div>
    </div>
  );
};

export default DeliveryOptionSection;

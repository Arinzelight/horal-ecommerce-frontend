const DeliveryOptionSection = () => (
  <div className="gap-4 flex flex-col bg-white px-3 py-3 rounded">
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

    {/* First Radio Option */}
    <div className="flex justify-between items-start">
      <label
        htmlFor="pickup"
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          name="deliveryOption"
          id="pickup"
          className="peer hidden"
        />
        <div className="w-6 h-6 relative rounded-3xl border-2 border-zinc-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white hidden peer-checked:block"></div>
        </div>
        <span className="text-xs font-bold text-neutral-600">
          Pick Up Yourself
        </span>
      </label>
      <span className="text-secondary-500 text-xs font-normal">Free</span>
    </div>

    {/* Additional content between radio options */}
    <div className="text-neutral-600 text-xs font-normal">
      You’ll receive a pickup location and time after order confirmation.
    </div>

    {/* Second Radio Option */}
    <div className="flex justify-between items-start">
      <label
        htmlFor="HoralLogistics"
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          name="deliveryOption"
          id="HoralLogistics"
          className="peer hidden"
        />
        <div className="w-6 h-6 relative rounded-3xl border-2 border-zinc-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white hidden peer-checked:block"></div>
        </div>
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

export default DeliveryOptionSection;

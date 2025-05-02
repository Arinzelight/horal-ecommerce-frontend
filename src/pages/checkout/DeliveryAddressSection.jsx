const DeliveryAddressSection = ({ handleEditAddress }) => (
  <div className="gap-4 w-full flex flex-col bg-white px-3 py-3 rounded">
    <div className="flex items-center justify-between border-b border-stone-300 p-2.5 w-full">
      <div className="flex items-center gap-2 w-96">
        <div className="w-7 h-7 px-2.5 py-1.5 rounded-2xl outline outline-1 outline-offset-[-1px] outline-zinc-500 flex items-center justify-center">
          <span className="text-xs font-bold text-neutral-600">1</span>
        </div>
        <span className="text-base font-bold text-neutral-900">
          Delivery Address
        </span>
      </div>
      <button
        onClick={handleEditAddress}
        className="text-xs font-bold text-primary cursor-pointer hover:opacity-90 hover:font-extrabold transition-all duration-200 ease-in-out"
      >
        Edit
      </button>
    </div>

    <div className="text-sm font-bold text-zinc-800">Home Address</div>
    <div className="text-xs font-normal text-neutral-600">
      7 Bode Thomas Street, Surulere, Lagos
    </div>

    <div className="text-sm font-bold text-zinc-800">Contact</div>
    <div className="text-neutral-600 text-xs font-normal">
      +234 803 456 7890
    </div>
  </div>
);

export default DeliveryAddressSection;

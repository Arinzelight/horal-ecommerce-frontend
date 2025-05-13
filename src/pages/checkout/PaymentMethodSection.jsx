import { MdShoppingCartCheckout } from "react-icons/md";

const PaymentMethodSection = () => (
  <div className="gap-4 flex flex-col bg-white px-3 py-3 rounded">
    <div className="flex items-center justify-between border-b border-stone-300 p-2.5 w-full">
      <div className="flex items-center gap-2 w-96">
        <div className="w-7 h-7 px-2.5 py-1.5 rounded-2xl outline outline-1 outline-offset-[-1px] outline-zinc-500 flex items-center justify-center">
          <span className="text-xs font-bold text-neutral-600">3</span>
        </div>
        <span className="text-base font-bold text-neutral-900">
          Pay with Horal Escrow
        </span>
      </div>
    </div>
    <div className="self-stretch justify-start text-neutral-600 text-sm font-normal ">
      {" "}
      Your payment is held securely and released only when your delivery is
      confirmed successful.
    </div>

    {[
      { id: "card", label: "Debit cards" },
      { id: "transfer", label: "Bank Transfer" },
    ].map((option) => (
      <label
        key={option.id}
        htmlFor={option.id}
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          name="paymentmethod"
          id={option.id}
          className="hidden peer"
        />
        <div className="w-6 h-6 relative rounded-3xl border-2 border-zinc-500  peer-checked:border-primary  flex items-center justify-center">
          {/* Display a custom circle when checked */}
          <div className="w-3 h-3 rounded-full bg-white hidden peer-checked:block"></div>
        </div>
        <span className="text-xs font-bold text-neutral-600">
          {option.label}
        </span>
      </label>
    ))}

    <button className="h-8 px-3 bg-secondary hover:opacity-90 cursor-pointer my-2 rounded flex items-center justify-center gap-2 text-white text-sm font-semibold">
      Proceed to Payment
      <MdShoppingCartCheckout className="w-4 h-4" />
    </button>
    <div className="self-stretch text-center justify-start text-neutral-600 text-xs font-normal ">
      Your payment is protected by Horal Escrow and released only when you
      confirm safe delivery.
    </div>
  </div>
);

export default PaymentMethodSection;

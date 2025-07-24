import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function QuantityControls({
  quantity,
  onIncrement,
  onDecrement,
  currentVariant,
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="md:text-lg lg:text-lg xl:text-xl font-bold mb-2">
        Quantity
      </div>
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          disabled={quantity <= 1}
          className={`w-6 h-6 text-xl flex items-center justify-center rounded-full ${
            quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Decrease quantity"
        >
          <FaMinusCircle className="text-xl text-primary" />
        </button>
        <span className="w-8 text-center text-xl font-semibold mx-1">
          {quantity}
        </span>
        <button
          onClick={onIncrement}
          disabled={
            currentVariant &&
            currentVariant.stock_quantity > 0 &&
            quantity >= currentVariant.stock_quantity
          }
          className="w-6 h-6 text-xl flex items-center justify-center rounded-full"
          aria-label="Increase quantity"
        >
          <FaPlusCircle className="text-xl text-primary" />
        </button>
      </div>
    </div>
  );
}

const OrderSummary = ({ order }) => {

  const subtotal = parseFloat(order?.total_amount) || 0;
  const shippingFee = 0; // 0 for now, implement later
  const total = subtotal + shippingFee;

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="flex flex-col gap-2 max-w-xs ml-auto">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">₦{subtotal?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping fee</span>
          <span className="text-gray-900">₦{shippingFee.toLocaleString() }</span>
        </div>
        <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">₦{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

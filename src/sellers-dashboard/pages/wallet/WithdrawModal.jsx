import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export function WithdrawModal({
  open,
  onClose,
  onConfirm,
  withdrawalData, 
  isLoading = false, 
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦");
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open || !withdrawalData) return null;

  // Extract data from API response
  const { total_amount, commission, amount_naira, bank_data } = withdrawalData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 " onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-lg">↓</span>
            <h2 className="text-lg font-semibold text-gray-900">
              Withdraw Funds
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
            disabled={isLoading}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Available Amount */}
          <div className="bg-primary-50 p-4 rounded-sm">
            <p className="text-sm text-gray-600 mb-1">Total amount:</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(total_amount)}
            </p>
          </div>

          {/* Commission Info */}
          <div className="space-y-2 p-3 bg-neutral-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Commission fee:</span>
              <span className="font-medium">₦{commission.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>You Will Receive:</span>
              <span className="text-blue-600">
                {formatCurrency(amount_naira)}
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200"></div>

          {/* Bank Details */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Funds will be sent to:</p>
            <div className="bg-neutral-100 p-3 rounded-lg space-y-2">
              <p className="font-medium">{bank_data.bank_name}</p>
              <p className="text-sm text-gray-600">
                Account Name: {bank_data.account_name}
              </p>
              <p className="text-sm text-gray-600">
                Account Number: {bank_data.account_number}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Withdrawals are processed within 1-2 business days.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 pt-4">
            <button
              onClick={onClose}
              className="w-[142px] h-[33px] py-2 px-4 border border-gray-300 text-[12px] text-gray-700 rounded-[4px] hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`w-[142px] h-[33px] py-2 px-4 text-[12px] rounded-[4px] transition-colors ${
                isLoading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm & Withdraw"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

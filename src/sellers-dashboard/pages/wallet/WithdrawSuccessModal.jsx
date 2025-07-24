import { useEffect } from "react"
import { IoMdCheckmark } from "react-icons/io"

export function WithdrawSuccessModal({ open, onClose, amount, bankInfo }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦")
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-8 text-center space-y-6">
          {/* Success Icon with Animation */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-green-500 rounded-full w-20 h-20 flex items-center justify-center">
              <IoMdCheckmark className="h-10 w-10 text-white" />
            </div>
            {/* Floating particles */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-green-300 rounded-full animate-bounce"></div>
            <div className="absolute -top-1 -right-3 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-2 -right-1 w-2 h-2 bg-orange-300 rounded-full animate-bounce delay-200"></div>
            <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-purple-300 rounded-full animate-bounce delay-300"></div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Withdrawal Successful!</h2>
            <p className="text-gray-600">
              Your withdrawal request for <span className="font-semibold">{formatCurrency(amount)}</span> has been
              submitted.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-medium">Funds will be sent to:</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">{bankInfo.bankName}</p>
              <p className="text-gray-600">Account Number: {bankInfo.accountNumber}</p>
              <p className="text-gray-600">Account Name: {bankInfo.accountName}</p>
            </div>
          </div>

          <p className="text-sm text-gray-500">Funds are typically processed within 1-2 business days.</p>

          <button
            onClick={onClose}
            className="w-full h-[33px]  px-4 bg-secondary text-white rounded-[4px]  hover:opacity-80 transition-colors font-medium"
          >
            Return to Wallet
          </button>
        </div>
      </div>
    </div>
  )
}

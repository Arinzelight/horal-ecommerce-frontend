import { useEffect } from "react"

export function TransactionDetailModal({ open, onClose, transaction }) {
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

  if (!open || !transaction?.details) return null

  const { details } = transaction

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="p-6 text-center space-y-2 border-b border-gray-200">
          <p className="text-sm text-gray-600">Payment Received</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(details.grossAmount)}</p>
          <p className="text-sm text-gray-500">{details.time}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Details</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order:</span>
              <span className="font-medium">{details.orderId}</span>
            </div>

            {/* <div className="flex justify-between">
              <span className="text-gray-600">Buyer:</span>
              <span className="font-medium">{details.buyer}</span>
            </div> */}

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">{details.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Commission Deducted (5%):</span>
              <span className="font-medium text-red-600">₦{details.commission.toFixed(2)}</span>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 my-3"></div>

            <div className="flex justify-between font-semibold">
              <span>Net Amount Received:</span>
              <span className="text-green-600">₦{details.netAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium text-xs">{details.transactionId}</span>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

import { FaEye, FaEyeSlash } from "react-icons/fa6";

export const WalletInfo = ({
  balance,
  showBalance,
  setShowBalance,
  setShowWithdrawModal,
}) => {

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      })
        .format(amount)
        .replace("NGN", "₦");
    };

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <div className="h-[65px] bg-primary-700 text-white rounded-lg shadow-sm">
        <div className="h-full p-6 flex flex-row items-center justify-between">
          <div className="flex items-center justify-between -ml-4">
            <button
              className="text-white hover:bg-blue-700 p-2 rounded-md transition-colors"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <FaEye className="h-4 w-4" />
              ) : (
                <FaEyeSlash className="h-4 w-4" />
              )}
            </button>
            <span className="text-blue-100 text-[14px]">Total Balance</span>
          </div>
          <div className="text-[24px] font-bold">
            {showBalance ? formatCurrency(balance) : "₦ ******"}
          </div>
        </div>
      </div>

      {/* Withdrawal Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Amount available for withdrawal
            </p>
            <div className="text-[32px] font-bold text-primary">
              {formatCurrency(balance)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Funds from successfully delivered and confirmed orders
            </p>
          </div>

          <button
            className={`w-full h-[33px] py-1 px-4 rounded-[4px] font-medium transition-colors ${
              balance > 0
                ? "bg-secondary hover:bg-secondary text-white"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
            disabled={balance === 0}
            onClick={() => setShowWithdrawModal(true)}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

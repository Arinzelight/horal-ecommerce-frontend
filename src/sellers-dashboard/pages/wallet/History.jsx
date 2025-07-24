import { FaArrowLeft, FaArrowRight, FaClock } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";


export const TransactionHistory = ({
  transactions,
  setSelectedTransaction,
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
    
  const getTransactionIcon = (type) => {
    switch (type) {
      case "payment":
        return <FaArrowLeft className="h-4 w-4 text-green-600" />;
      case "withdrawal":
        return <FaArrowRight className="h-4 w-4 text-red-600" />;
      case "pending":
        return <FaClock className="h-4 w-4 text-orange-600" />;
      default:
        return <IoMdCheckmark className="h-4 w-4" />;
    }
  };

  const getAmountColor = (type) => {
    switch (type) {
      case "payment":
        return "text-green-600";
      case "withdrawal":
        return "text-red-600";
      case "pending":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.date]) {
      acc[transaction.date] = [];
    }
    acc[transaction.date].push(transaction);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Transaction History
        </h3>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date}>
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <h4 className="font-medium text-sm text-gray-900">{date}</h4>
            </div>
            {transactions.map((transaction, index) => (
              <div key={transaction.id}>
                <div
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() =>
                    transaction.details && setSelectedTransaction(transaction)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${getAmountColor(
                        transaction.type
                      )}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </div>
                  </div>
                </div>
                {index < transactions.length - 1 && (
                  <div className="border-b border-gray-100 mx-6"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

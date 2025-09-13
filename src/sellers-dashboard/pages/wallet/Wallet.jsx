import { useState, useEffect } from "react";
import { WithdrawModal } from "./WithdrawModal";
import { WithdrawSuccessModal } from "./WithdrawSuccessModal";
import { TransactionDetailModal } from "./TransactionDetailModal";
import { AddBankAccountForm } from "./AddBank";
import SectionHeader from "../../components/SectionHeader";
import { WalletInfo } from "./WalletInfo";
import { TransactionHistory } from "./History";
import { CardInfo } from "./CardInfo";
import useWallet from "../../../hooks/wallet-hook";
import InitialLoader from "../../../components/InitialLoader";

const Wallet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [hasBankAccount, setHasBankAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [withdrawalData, setWithdrawalData] = useState(null);
  const [isInitiatingWithdrawal, setIsInitiatingWithdrawal] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawalResult, setWithdrawalResult] = useState(null);

  const { fetchTransactions, initiateWithdrawal, withdrawFunds } = useWallet();

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchTransactions();
      
      if (data && data.bank_name) {
        setWalletData(data);
        setHasBankAccount(true);
      } else {
        setHasBankAccount(false);
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      
      // Check if error indicates no bank details
      if (error?.response?.data?.detail === "No SellersBankDetails matches the given query.") {
        setHasBankAccount(false);
      } else {
        setError("Failed to load wallet data. Please try again.");
        setHasBankAccount(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBankAccountAdded = () => {
    // Reload wallet data after bank account is added
    loadWalletData();
  };

  const handleWithdrawClick = async () => {
    setIsInitiatingWithdrawal(true);
    console.log("Initiating withdrawal...", withdrawalData);
    setError(null);

    try {
      const data = await initiateWithdrawal();
      if (data) {
        setWithdrawalData(data);
        setShowWithdrawModal(true);
      }
    } catch (error) {
      console.error("Error initiating withdrawal:", error);
      setError("Failed to initiate withdrawal. Please try again.");
    } finally {
      setIsInitiatingWithdrawal(false);
    }
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    setError(null);

    try {
      const result = await withdrawFunds();
      if (result) {
        setWithdrawalResult(result);
        setShowWithdrawModal(false);
        setShowSuccessModal(true);

        // Refresh wallet data to get updated balance
        await loadWalletData();
      }
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      setError("Failed to process withdrawal. Please try again.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  // Transform backend transaction data to match frontend format
  const transformTransactions = (transactionHistory) => {
    const transformed = [];

    transactionHistory.forEach(group => {
      group.transactions.forEach(transaction => {
        const transformedTransaction = {
          id: transaction.id,
          type:
            transaction.transaction_status === "pending"
              ? "pending"
              : transaction.transaction_type === "order"
              ? "payment"
              : "withdrawal",
          description: transaction.message,
          amount: parseFloat(transaction.amount),
          time: new Date(transaction.created_at).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          date: group.data,
          status: transaction.transaction_status,
          details:
            transaction.transaction_type === "order"
              ? {
                  orderId: transaction.id,
                  time: new Date(transaction.created_at).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  ),
                  buyer: "Customer",
                  paymentMethod: "Card Payment",
                  grossAmount: parseFloat(transaction.amount),
                  commission: parseFloat(transaction.amount) * 0.05,
                  netAmount: parseFloat(transaction.amount) * 0.95,
                  transactionId: transaction.reference_id,
                }
              : null,
        };
        transformed.push(transformedTransaction);
      });
    });

    return transformed;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <InitialLoader />
          <p className="text-gray-600">Loading wallet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadWalletData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show bank account form if user doesn't have bank details
  if (hasBankAccount === false) {
    return (
      <div className="">
        <SectionHeader title="Wallet" />
        <AddBankAccountForm onSuccess={handleBankAccountAdded} />
      </div>
    );
  }

  // Show main wallet UI if user has bank details
  if (walletData && hasBankAccount) {
    const bankInfo = {
      bank_name: walletData.bank_name,
      account_name: walletData.account_name,
      account_number: walletData.account_number,
    };

    const transformedTransactions = transformTransactions(walletData.transaction_history);
    const availableBalance = walletData.withdraw;
    return (
      <div className="px-2 md:px-6 mt-4">
        <SectionHeader title="Wallet" />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <WalletInfo
              balance={availableBalance}
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              setShowWithdrawModal={handleWithdrawClick}
              isLoading={isInitiatingWithdrawal}
            />
            <CardInfo bankInfo={bankInfo} />
          </div>

          {/* Right Column */}
          <div>
            <TransactionHistory
              transactions={transformedTransactions}
              setSelectedTransaction={setSelectedTransaction}
            />
          </div>
        </div>

        {/* Modals */}
        {withdrawalData && (
          <WithdrawModal
            open={showWithdrawModal}
            onClose={() => setShowWithdrawModal(false)}
            onConfirm={handleWithdraw}
            withdrawalData={withdrawalData} 
            isLoading={isWithdrawing} 
          />
        )}

        {withdrawalResult && (
          <WithdrawSuccessModal
            open={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            withdrawalResult={withdrawalResult} // Pass the withdrawal result
          />
        )}

        <TransactionDetailModal
          open={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
        />
      </div>
    );
  }

  return null;
};

export default Wallet;
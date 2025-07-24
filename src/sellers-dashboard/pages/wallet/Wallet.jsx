import { useState } from "react"
import { WithdrawModal } from "./WithdrawModal"
import { WithdrawSuccessModal } from "./WithdrawSuccessModal"
import { TransactionDetailModal } from "./TransactionDetailModal"
import SectionHeader from "../../components/SectionHeader"
import { WalletInfo } from "./WalletInfo"
import { TransactionHistory } from "./History"
import { CardInfo } from "./CardInfo"
// Mock data
const mockTransactions = [
  {
    id: "1",
    type: "payment",
    description: "You received a payment for the #Ord...",
    amount: 50000,
    time: "10:30 AM",
    date: "Today",
    status: "completed",
    details: {
      orderId: "HORAL-ORD-98765",
      buyer: "Blessing Okoro",
      paymentMethod: "Card Payment",
      grossAmount: 255000,
      commission: 2500,
      netAmount: 47500,
      transactionId: "TXN-ABC123DEF456",
    },
  },
  {
    id: "2",
    type: "withdrawal",
    description: "Your withdrawal was successful.",
    amount: -50000,
    time: "10:30 AM",
    date: "Today",
    status: "completed",
  },
  {
    id: "3",
    type: "pending",
    description: "You have a pending withdrawal",
    amount: -30000,
    time: "10:30 AM",
    date: "Today",
    status: "pending",
  },
  {
    id: "4",
    type: "payment",
    description: "You received a payment for the #Ord...",
    amount: 50000,
    time: "10:30 AM",
    date: "Yesterday",
    status: "completed",
  },
  {
    id: "5",
    type: "withdrawal",
    description: "Your withdrawal was successful.",
    amount: -50000,
    time: "10:30 AM",
    date: "Yesterday",
    status: "completed",
  },
  {
    id: "6",
    type: "pending",
    description: "You have a pending withdrawal",
    amount: -50000,
    time: "10:30 AM",
    date: "Yesterday",
    status: "pending",
  },
]

const mockBankInfo = {
  bankName: "Access Bank",
  accountName: "Daniel Adewale",
  accountNumber: "0110946830",
}

const Wallet = ({ balance = 255000 }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleWithdraw = () => {
    setShowWithdrawModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="">
      <SectionHeader title="Wallet" />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <WalletInfo
            balance={balance}
            showBalance={showBalance}
            setShowBalance={setShowBalance}
            setShowWithdrawModal={setShowWithdrawModal}
          />
          <CardInfo bankInfo={mockBankInfo} />
        </div>

        {/* Right Column */}
        <div>
          <TransactionHistory
            transactions={mockTransactions}
            setSelectedTransaction={setSelectedTransaction}
          />
        </div>
      </div>

      {/* Modals */}
      <WithdrawModal
        open={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onConfirm={handleWithdraw}
        balance={balance}
        bankInfo={mockBankInfo}
      />

      <WithdrawSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        amount={242500}
        bankInfo={mockBankInfo}
      />

      <TransactionDetailModal
        open={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Wallet;

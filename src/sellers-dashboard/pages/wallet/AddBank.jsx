import { FaTimes } from "react-icons/fa";
import { useAddBankAccountForm } from "./add-bank/useAddBank";
import { BankDropdown } from "./add-bank/BankDropdown";
import { AccountVerificationStatus } from "./add-bank/account-verification";

export const AddBankAccountForm = ({ onSuccess, onCancel }) => {
  const {
    banks,
    selectedBank,
    accountNumber,
    accountName,
    isVerifying,
    isVerified,
    errors,
    isSubmitting,
    showBankDropdown,
    setShowBankDropdown,
    handleBankSelect,
    handleAccountNumberChange,
    handleSubmit,
    handleCancel,
    selectedBankName,
  } = useAddBankAccountForm(onSuccess, onCancel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleCancel}
      ></div>

      <div className="relative bg-white rounded-sm shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            + Add Bank Account for Payouts
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
            disabled={isSubmitting}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-6">
            We'll use this account to send your payments. Please ensure your
            details are correct. Ensure the bank name matches the name used for KYC verification.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <BankDropdown
              banks={banks}
              selectedBankName={selectedBankName}
              showDropdown={showBankDropdown}
              setShowDropdown={setShowBankDropdown}
              handleBankSelect={handleBankSelect}
              disabled={isSubmitting}
              error={errors.bank}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => handleAccountNumberChange(e.target.value)}
              placeholder="Enter your account number"
              disabled={isSubmitting}
              className={`w-full p-3 bg-neutral-200 rounded-lg ${
                errors.accountNumber ? "border border-red-500" : ""
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.accountNumber && (
              <p className="text-sm text-red-500">{errors.accountNumber}</p>
            )}
            {accountNumber.length > 0 && accountNumber.length !== 10 && (
              <p className="text-sm text-red-500">
                Please enter a valid 10-digit account number.
              </p>
            )}
          </div>

          <AccountVerificationStatus
            isVerifying={isVerifying}
            isVerified={isVerified}
            accountName={accountName}
          />

          <div className="flex gap-3 pt-4">
            {/* <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button> */}
            <button
              onClick={handleSubmit}
              disabled={!isVerified || isSubmitting}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                isVerified && !isSubmitting
                  ? "bg-secondary hover:bg-orange-600 text-white"
                  : "bg-neutral-400 text-white cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

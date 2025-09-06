import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWallet from "../../../../hooks/wallet-hook";
import { toast } from "../../../../components/toast";

export const useAddBankAccountForm = (onSuccess, onCancel) => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);

  const { fetchBanks, verifySellerBank } = useWallet();

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const bankList = await fetchBanks();
        setBanks(bankList);
      } catch (error) {
        console.error("Error loading banks:", error);
      }
    };
    loadBanks();
  }, [fetchBanks]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const handleCancel = () => {
    onCancel ? onCancel() : navigate("/sellers-dashboard");
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank.name);
    setShowBankDropdown(false);
    setErrors({ ...errors, bank: "" });
    setIsVerified(false);
    setAccountName("");
  };

  const handleAccountNumberChange = (value) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 10);
    setAccountNumber(numericValue);
    setErrors({ ...errors, accountNumber: "" });
    setIsVerified(false);
    setAccountName("");
  };

  const verifyBankAccount = async () => {
    if (!selectedBank || !accountNumber) {
      setErrors({
        ...errors,
        bank: !selectedBank ? "Bank name is required." : "",
        accountNumber: !accountNumber
          ? "Please enter a valid 10-digit account number."
          : "",
      });
      return;
    }

    if (accountNumber.length !== 10) {
      setErrors({
        ...errors,
        accountNumber: "Please enter a valid 10-digit account number.",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const verifiedAccountName = await verifySellerBank({
        bankData: {
          bank_name: selectedBank,
          account_number: accountNumber,
        },
      });

      if (verifiedAccountName) {
        setAccountName(verifiedAccountName);
        setIsVerified(true);
        setErrors({});
      }
    } catch (error) {
      toast.error(error.message || "Verification failed.");
      console.error("Verification error:", error);
      setErrors({
        ...errors,
        accountNumber: "Unable to verify account. Please ensure the bank details name match the name used for KYC verification.",
      });
      setIsVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (selectedBank && accountNumber.length === 10) {
      const timer = setTimeout(verifyBankAccount, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedBank, accountNumber]);

  const handleSubmit = async () => {
    if (!isVerified) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSuccess();
    } catch (error) {
      console.error("Error saving bank details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    selectedBankName:
      banks.find((bank) => bank.name === selectedBank)?.name ||
      "Select your bank",
  };
};

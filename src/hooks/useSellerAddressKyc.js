import { useState } from "react";
import api from "../utils/api";

export const useSellerAddressKyc = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitKyc = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/seller/kyc/address/", formData);

      if (response.data?.status === "success") {
        setSuccess(true);
      } else {
        setError("Submission failed. Please check your input.");
      }

      return response.data;
    } catch (err) {
      console.error("KYC submission error:", err);
      setError("Something went wrong. Try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitKyc, loading, error, success };
};

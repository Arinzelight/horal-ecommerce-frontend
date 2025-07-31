import { useState } from "react";
import api from "../utils/api";

export const useSellerKyc = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Submit address KYC
  const submitAddressKyc = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/seller/kyc/address/", formData);

      if (response.data?.status === "success") {
        setSuccess(true);
      } else {
        setError("Address KYC submission failed. Please check your input.");
      }

      return response.data;
    } catch (err) {
      console.error("Address KYC error:", err);
      setError("Something went wrong with address submission.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Submit social links KYC
  const submitSocialsKyc = async (socialLinks) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/seller/kyc/socials/", socialLinks);

      if (response.data?.status === "success") {
        setSuccess(true);
      } else {
        setError("Social links submission failed. Please check your input.");
      }

      return response.data;
    } catch (err) {
      console.error("Social KYC error:", err);
      setError("Something went wrong with social link submission.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitAddressKyc,
    submitSocialsKyc,
    loading,
    error,
    success,
  };
};

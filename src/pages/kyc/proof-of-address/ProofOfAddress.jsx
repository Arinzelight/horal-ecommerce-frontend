import React from "react";
import { useNavigate } from "react-router-dom";
import KYCStepper from "../upload-id/KYCStepper";
import { useSellerKyc } from "../../../hooks/useSellerKyc";
import ProofOfAddressForm from "./ProofOfAddressForm";

const ProofOfAddress = () => {
  const navigate = useNavigate();
  const { submitAddressKyc, loading, error, success } = useSellerKyc();

  const handleFormSubmit = async (formData) => {
    const result = await submitAddressKyc(formData);
    if (result?.status === "success") {
      navigate("/social-links-upload");
    }
  };

  return (
    <div className="w-full py-10 flex items-center pb-15 justify-center px-4">
      <div className="w-full flex flex-col items-center gap-5">
        <KYCStepper activeStep={0} />
        <div className="w-full flex flex-col gap-12">
          <div className="flex flex-col gap-1 text-start sm:text-left">
            <h2 className="text-xl sm:text-3xl font-bold text-black">
              Address Information
            </h2>
            <p className="text-sm sm:text-xl text-zinc-800">
              Provide your accurate Address Information to build trust with
              customers
            </p>
          </div>
          <ProofOfAddressForm
            onSubmit={handleFormSubmit}
            loading={loading}
            error={error}
            success={success}
          />
        </div>
      </div>
    </div>
  );
};

export default ProofOfAddress;

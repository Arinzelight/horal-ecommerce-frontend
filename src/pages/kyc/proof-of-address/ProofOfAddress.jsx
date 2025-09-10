import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KYCStepper from "../upload-id/KYCStepper";
import { useSellerKyc } from "../../../hooks/useSellerKyc";
import ProofOfAddressForm from "./ProofOfAddressForm";
import { IoWarningOutline } from "react-icons/io5";

const ProofOfAddress = () => {
  const navigate = useNavigate();
  const { submitAddressKyc, loading, error, success } = useSellerKyc();

  // 🔹 Notice modal state
  const [isNameNoticeOpen, setIsNameNoticeOpen] = useState(false);

  useEffect(() => {
    // Show notice immediately when page loads
    setIsNameNoticeOpen(true);
  }, []);

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

      {/* Notice Modal */}
      {isNameNoticeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2">
          <div className="bg-white rounded-xl shadow-lg md:max-w-md w-full max-w-[95%] p-6 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <IoWarningOutline className="text-yellow-500 w-7 h-7 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Important Notice
                </h3>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed break-words">
                  Please ensure that the
                  <span className="font-semibold"> first name </span>
                  and
                  <span className="font-semibold"> last name </span>
                  you provide here matches the one registered with your bank and
                  verification documents. This is necessary for smooth bank
                  verification and to avoid delays in processing.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsNameNoticeOpen(false)}
              className="mt-4 bg-primary text-white px-2 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProofOfAddress;

import { useState } from "react";
import { MdAccessTimeFilled } from "react-icons/md";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsAndConditionsModal from "./TermsAndConditionsModal";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function KYCVerification() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative w-full my-15 px-3 flex flex-col items-center gap-14">
        <div className="w-full max-w-[970px] p-6 bg-white rounded-lg border-dashed border-2 border-primary flex flex-col gap-10">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <h2 className="text-black sm:text-3xl text-xl font-bold">
                KYC Verification
              </h2>
              <p className="text-justify text-zinc-800 sm:text-lg text-base">
                Go through a guided process to verify your identity and
                establish trust with buyers. Completing this process ensures
                compliance with Horal’s regulations and enhances credibility.
              </p>

              <div className="flex items-center gap-2.5">
                <IoInformationCircle className="text-secondary-500  sm:w-5 sm:h-5 w-7 h-7" />
                <p className="flex flex-wrap items-center  text-neutral-900">
                  <span>View Our</span>
                  <button
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-primary font-bold cursor-pointer hover:underline hover:text-primary/80"
                  >
                    Privacy Policy
                  </button>
                  <span>and our</span>
                  <button
                    onClick={() => setIsTermsModalOpen(true)}
                    className="text-primary font-bold cursor-pointer hover:underline hover:text-primary/80"
                  >
                    Terms & Conditions
                  </button>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <MdAccessTimeFilled className="text-black sm:w-5 sm:h-5 w-7 h-7" />
                <p className="text-neutral-900 sm:text-base text-sm">
                  This process will take approximately 5-10 minutes to complete.
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  "Upload a valid government-issued ID",
                  "Upload proof of address",
                  "Provide a link to an active social media handle",
                ].map((text, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <span className="text-neutral-900 sm:text-base text-xs">
                      Step
                    </span>
                    <div className="sm:w-8 sm:h-7.5 w-6 h-6 bg-secondary-500 rounded-[50%] flex items-center justify-center">
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                    <p className="text-neutral-900 sm:w-full w-50 sm:text-base text-xs">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-zinc-800 text-xl font-bold">
                Prepare the following documents
              </h3>
              <div className="flex flex-col gap-2.5">
                {[
                  "Valid ID: National ID (NIN), CAC (Optional)",
                  "Proof of Address: Utility Bill, Bank Statement, or any valid address-linked document",
                  "Active Social Media Handle",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="sm:w-8 sm:h-8 w-6 h-6 bg-secondary-500 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-xs">{idx + 1}</span>
                    </div>
                    <p className="text-neutral-900 sm:w-full w-50 sm:text-base text-xs">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/upload-id"
            className="cursor-pointer text-center hover:opacity-90 py-4 bg-secondary rounded-lg text-white sm:text-xl text-sm font-bold"
          >
            Start Verification
          </Link>
        </div>
      </div>

      {/* Modal */}
      {(isPrivacyModalOpen || isTermsModalOpen) && (
        <div className="fixed inset-0 bg-black/30 z-10"></div>
      )}

      {isPrivacyModalOpen && (
        <PrivacyPolicyModal onClose={() => setIsPrivacyModalOpen(false)} />
      )}

      {isTermsModalOpen && (
        <TermsAndConditionsModal onClose={() => setIsTermsModalOpen(false)} />
      )}
    </div>
  );
}

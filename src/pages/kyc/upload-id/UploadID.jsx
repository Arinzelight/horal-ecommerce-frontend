import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import KYCStepper from "./KYCStepper";
import toast from "react-hot-toast";

const KYCVerification = ({ user = {} }) => {
  const navigate = useNavigate();
  const [ninVerified, setNinVerified] = useState(false);
  const [cacVerified, setCacVerified] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.dojah.io/websdk.js";
    script.defer = true;
    document.body.appendChild(script);

    const handleMessage = async (event) => {
      if (event.origin.includes("dojah")) {
        const data = event.data;
        const verificationType = data.meta?.verification_type;
        console.log("Dojah verification result:", data);

        try {
          await axios.post("http://localhost:8000/api/kyc/verify/", {
            user_id: user.id || "anonymous",
            verification_type: verificationType,
            verification_data: data,
          });

          if (data.event === "successful") {
            if (verificationType === "cac") {
              setCacVerified(true);
              toast.success("CAC Verified ");
            }

            if (verificationType === "nin_selfie") {
              setNinVerified(true);
              toast.success("NIN + Selfie Verified ");
            }
          }
        } catch (error) {
          console.error("Verification post failed:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      document.body.removeChild(script);
      window.removeEventListener("message", handleMessage);
    };
  }, [user]);

  const userData = {
    first_name: user?.firstName || "John",
    last_name: user?.lastName || "Doe",
    dob: user?.dob || "1990-01-01",
    phone: user?.phone || "08012345678",
  };

  const metaData = {
    user_id: user?.id || "anonymous",
  };

  return (
    <div className="p-6 text-center py-20 min-h-screen mx-auto">
      <KYCStepper activeStep={2} />
      <h2 className="text-2xl font-bold mb-6">Complete Your KYC</h2>

      {/* CAC Verification */}
      {!cacVerified && (
        <div
          className="mb-8"
          dangerouslySetInnerHTML={{
            __html: `
              <dojah-button
                widgetId="687f636d751ae8cd83d69714"
                text="Verify CAC (Optional)"
                textColor="#ffffff"
                backgroundColor="#006400"
                userData='${JSON.stringify(userData)}'
                metaData='${JSON.stringify({
                  ...metaData,
                  verification_type: "cac",
                })}'
              ></dojah-button>
            `,
          }}
        />
      )}

      {/* NIN + Selfie Verification */}
      {!ninVerified && (
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: `
              <dojah-button
                widgetId="687f5d8f31c86a66b12e7478"
                text="Verify NIN + Selfie"
                textColor="#ffffff"
                backgroundColor="#ff6b00"
                userData='${JSON.stringify(userData)}'
                metaData='${JSON.stringify({
                  ...metaData,
                  verification_type: "nin_selfie",
                })}'
              ></dojah-button>
            `,
          }}
        />
      )}

      {/* Success & Continue */}
      {cacVerified && ninVerified && (
        <>
          <p className="mt-6 text-green-600 font-semibold">
            Both CAC and NIN verifications completed.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Continue to Dashboard
          </button>
        </>
      )}
    </div>
  );
};

export default KYCVerification;

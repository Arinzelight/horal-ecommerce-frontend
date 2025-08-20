import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KYCStepper from "./KYCStepper";
import { toast } from "../../../components/toast";

const KYCVerification = ({ user = {} }) => {
  const navigate = useNavigate();
  const [ninVerified, setNinVerified] = useState(false);
  const [cacVerified, setCacVerified] = useState(false);
  const [activeVerificationType, setActiveVerificationType] = useState(null);

  useEffect(() => {
    const scriptId = "dojah-web-sdk";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://widget.dojah.io/websdk.js";
      script.id = scriptId;
      script.defer = true;
      document.body.appendChild(script);
    }

    const handleMessage = (event) => {
      if (!event.origin.includes("dojah")) return;

      const data = event.data;
      const isSuccessful =
        data?.type === "connect.account.success" ||
        data?.event === "successful";

      if (isSuccessful) {
        if (activeVerificationType === "cac") {
          setCacVerified(true);
          toast.success("CAC Verified");
        }

        if (activeVerificationType === "nin_selfie") {
          setNinVerified(true);
          toast.success("NIN + Selfie Verified");
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [activeVerificationType]);

  useEffect(() => {
    if (cacVerified && ninVerified) {
      setTimeout(() => {
        navigate("/successful-kyc");
      }, 1000);
    }
  }, [cacVerified, ninVerified, navigate]);

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
      <div className="mb-8">
        {!cacVerified && (
          <div
            onClick={() => setActiveVerificationType("cac")}
            dangerouslySetInnerHTML={{
              __html: `
                <dojah-button
                  widgetId="68808c35c001ae864ad6b032" 
                  text="Verify CAC (Optional)"
                  textColor="#ffffff"
                  backgroundColor="#2196f3"
                  userData='${JSON.stringify(userData)}'
                  metaData='${JSON.stringify({
                    ...metaData,
                    verification_type: "cac",
                  })}'
                  style="height: 50px; font-size: 18px;"
                ></dojah-button>
              `,
            }}
          />
        )}
        {cacVerified && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            ✔ CAC Verified
          </p>
        )}
      </div>

      {/* NIN + Selfie Verification */}
      <div className="mt-4">
        {!ninVerified && (
          <div
            onClick={() => setActiveVerificationType("nin_selfie")}
            dangerouslySetInnerHTML={{
              __html: `
                <dojah-button
                  widgetId="68808da0c001ae864ad7ca25"
                  text="Verify NIN + Selfie"
                  textColor="#ffffff"
                  backgroundColor="#ff6b00"
                  userData='${JSON.stringify(userData)}'
                  metaData='${JSON.stringify({
                    ...metaData,
                    verification_type: "nin_selfie",
                  })}'
                  style="height: 50px; font-size: 18px;"
                ></dojah-button>
              `,
            }}
          />
        )}
        {ninVerified && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            ✔ NIN + Selfie Verified
          </p>
        )}
      </div>

      {/* Continue Button */}
      {cacVerified && ninVerified && (
        <>
          <p className="mt-6 text-green-600 font-semibold">
            Both CAC and NIN verifications completed.
          </p>
          <button
            onClick={() => navigate("/successful-kyc")}
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

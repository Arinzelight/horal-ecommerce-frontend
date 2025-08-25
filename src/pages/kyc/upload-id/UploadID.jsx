import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KYCStepper from "./KYCStepper";
import { toast } from "../../../components/toast";
import { useSelector } from "react-redux";

const KYCVerification = () => {
  const navigate = useNavigate();
  const [ninVerified, setNinVerified] = useState(false);
  const [cacVerified, setCacVerified] = useState(false);
  const [activeVerification, setActiveVerification] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const user = userInfo?.data;

  useEffect(() => {
    const scriptId = "dojah-web-sdk";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://widget.dojah.io/websdk.js";
      script.id = scriptId;
      script.defer = true;
      document.body.appendChild(script);
    }

    const handleMessage = (event) => {
      if (!event.origin.includes("dojah")) return;

      console.log("Dojah event:", event.data);
      const data = event.data;

      const isSuccessful =
        data?.type === "connect.account.success" ||
        data?.event === "successful";

      if (isSuccessful) {
        // Use the activeVerification we tracked
        if (activeVerification === "cac") {
          setCacVerified(true);
          toast.success("CAC Verified");
        }

        if (activeVerification === "nin_selfie") {
          setNinVerified(true);
          toast.success("NIN + Selfie Verified");
        }

        // Reset after success
        setActiveVerification(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [activeVerification]);

  useEffect(() => {
    if (cacVerified && ninVerified) {
      setTimeout(() => navigate("/successful-kyc"), 1000);
    }
  }, [cacVerified, ninVerified, navigate]);

  const userData = {
    first_name: user?.firstName,
    last_name: user?.lastName,
    dob: user?.dob,
    phone: user?.phone,
    email: user?.email,
    user_id: user?.id || "anonymous",
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
        {!cacVerified ? (
          <div
            onClick={() => setActiveVerification("cac")}
            dangerouslySetInnerHTML={{
              __html: `
                <dojah-button
                  widgetId="68887743dbf924d7ed860fbb" 
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
        ) : (
          <p className="mt-2 text-sm text-green-600 font-medium">
            ✔ CAC Verified
          </p>
        )}
      </div>

      {/* NIN + Selfie Verification */}
      <div className="mt-4">
        {!ninVerified ? (
          <div
            onClick={() => setActiveVerification("nin_selfie")}
            dangerouslySetInnerHTML={{
              __html: `
                <dojah-button
                  widgetId="6888767ecc3a4ec28b1640ac"
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
        ) : (
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");

      if (accessToken) {
        // Send token to backend to verify/login
        axios
          .post(
            "https://horal-backend.up.railway.app/api/v1/user/google-login/",
            { token_id: accessToken }
          )
          .then((res) => {
            console.log("Google login success:", res.data);
            // TODO: Save auth data (token, user info) as needed
            navigate("/"); // redirect after success
          })
          .catch((err) => {
            console.error(
              "Google login failed:",
              err.response?.data || err.message
            );
            setError("Google login failed. Please try again.");
          });
      }
    } else if (hash.includes("error")) {
      setError("Google login was cancelled or failed.");
    } else {
      setError("No access token found in URL.");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {error ? (
        <div className="text-red-600 font-semibold text-center">{error}</div>
      ) : (
        <div className="text-neutral-700 font-semibold text-center">
          Signing you in with Google...
        </div>
      )}
    </div>
  );
};

export default OAuthCallback;

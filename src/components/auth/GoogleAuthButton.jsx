import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../../redux/auth/userSlice";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const { userInfo } = useSelector((state) => state.user);

  const handleGoogleSuccess = (credentialResponse) => {
    const token_id = credentialResponse.credential;
    dispatch(loginWithGoogle(token_id));
  };

  // Redirect after successful login
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="w-full flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.error("Google login failed")}
          shape="rectangular"
          text="continue_with"
          width="100%"
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;

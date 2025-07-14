import { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function PasswordUpdate() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const updatedUserData = useSelector((state) => state.user.currentUser?.user);

  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);

  // Form data state
  const [passwordFormData, setPasswordFormData] = useState({
    email: currentUser?.email || updatedUserData?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Update email when currentUser or updatedUserData changes
  useEffect(() => {
    const email = currentUser?.email || updatedUserData?.email;
    setPasswordFormData((prevState) => ({
      ...prevState,
      email: email || "",
    }));
  }, [currentUser, updatedUserData]);

  const togglePasswordVisibility = (
    inputRef,
    setShowPassword,
    showPassword
  ) => {
    setShowPassword(!showPassword);
    if (inputRef.current) {
      inputRef.current.type = showPassword ? "password" : "text";
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordFormData({
      ...passwordFormData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    // Validate password fields
    if (!passwordFormData.currentPassword || !passwordFormData.newPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // await dispatch(sendOtp(passwordFormData.email)).unwrap();
      // setOtpModalVisible(true);
      toast.success("OTP sent to your email.");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpVerification = async (otp) => {
    try {
      // Verify OTP first
      // await dispatch(
      //   verifyOtp({
      //     email: passwordFormData.email,
      //     otp,
      //   })
      // ).unwrap();

      // dispatch(markAsVerified());

      // If OTP verification succeeds, update password
      const userId = currentUser?.id || updatedUserData?.id;
      if (!userId) throw new Error("User ID is undefined");

      const updateRes = await api.put(`user/update/password/${userId}`, {
        email: passwordFormData.email,
        password: passwordFormData.currentPassword,
        newPassword: passwordFormData.newPassword,
      });

      if (updateRes.status === 200 || updateRes.status === 201) {
        toast.success("Password updated successfully.");
        // setOtpModalVisible(false);
        // Clear form after successful update
        setPasswordFormData({
          ...passwordFormData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw new Error("Password update failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed.");
    }
  };

  const handleResendOtp = async () => {
    try {
      // await dispatch(sendOtp(passwordFormData.email)).unwrap();
      toast.success("OTP resent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP.");
    }
  };

  return (
    <>
      <div className="border border-gray-300 rounded-md md:w-[870px] w-full mr-8">
        <h1 className="border-b border-gray-300 px-5 py-4 font-semibold text-[1rem]">
          Change Password
        </h1>
        <div className="flex sm:flex-row flex-col sm:justify-start p-5 gap-[5rem]">
          <form
            onSubmit={handlePasswordSubmit}
            className="w-full flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                placeholder="Current password"
                autoComplete="off"
                ref={currentPasswordRef}
                value={passwordFormData.currentPassword}
                onChange={handlePasswordChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {showCurrentPassword ? (
                <AiOutlineEye
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                  onClick={() =>
                    togglePasswordVisibility(
                      currentPasswordRef,
                      setShowCurrentPassword,
                      showCurrentPassword
                    )
                  }
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                  onClick={() =>
                    togglePasswordVisibility(
                      currentPasswordRef,
                      setShowCurrentPassword,
                      showCurrentPassword
                    )
                  }
                />
              )}
            </div>

            <div className="flex sm:flex-row flex-col justify-between gap-4">
              <div className="w-full relative flex flex-col gap-1">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="New password"
                  autoComplete="off"
                  ref={newPasswordRef}
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {showNewPassword ? (
                  <AiOutlineEye
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={() =>
                      togglePasswordVisibility(
                        newPasswordRef,
                        setShowNewPassword,
                        showNewPassword
                      )
                    }
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={() =>
                      togglePasswordVisibility(
                        newPasswordRef,
                        setShowNewPassword,
                        showNewPassword
                      )
                    }
                  />
                )}
              </div>

              <div className="w-full relative flex flex-col gap-1">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  autoComplete="off"
                  ref={confirmPasswordRef}
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {showConfirmPassword ? (
                  <AiOutlineEye
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={() =>
                      togglePasswordVisibility(
                        confirmPasswordRef,
                        setShowConfirmPassword,
                        showConfirmPassword
                      )
                    }
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={() =>
                      togglePasswordVisibility(
                        confirmPasswordRef,
                        setShowConfirmPassword,
                        showConfirmPassword
                      )
                    }
                  />
                )}
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-primary rounded-md hover:opacity-90 text-white py-2 px-5 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    Sending OTP... <ClipLoader color="#fff" size={18} />
                  </span>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* 
      <OTPModal
        show={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        onVerify={handleOtpVerification}
        email={passwordFormData.email}
        onResendOtp={handleResendOtp}
        loading={otpLoading}
        error={otpError}
      /> */}
    </>
  );
}

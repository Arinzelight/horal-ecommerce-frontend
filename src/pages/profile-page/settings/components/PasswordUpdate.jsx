import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import FormInput from "../../../../users-profile/pages/profile/FormInput";

export default function PasswordUpdate() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const updatedUserData = useSelector((state) => state.user.currentUser?.user);

  // Form data state
  const [passwordFormData, setPasswordFormData] = useState({
    email: currentUser?.email || updatedUserData?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const currentPasswordRef = useRef(null);
  // const newPasswordRef = useRef(null);
  // const confirmPasswordRef = useRef(null);

  // Update email when currentUser or updatedUserData changes
  useEffect(() => {
    const email = currentUser?.email || updatedUserData?.email;
    setPasswordFormData((prevState) => ({
      ...prevState,
      email: email || "",
    }));
  }, [currentUser, updatedUserData]);

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
      <div className="border border-gray-200 bg-white rounded-lg w-full ">
        <h1 className="border-b border-gray-200 px-5 py-4 font-semibold text-[1rem]">
          Change Password
        </h1>
        <div className="flex sm:flex-row flex-col sm:justify-start p-5 gap-[5rem]">
          <form
            onSubmit={handlePasswordSubmit}
            className="w-full flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1 relative">
              <FormInput
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordFormData.currentPassword}
                // value={formData.currentPassword}
                onChange={
                  (e) => handlePasswordChange("currentPassword", e.target.value)
                  // handleInputChange("currentPassword", e.target.value)
                }
                placeholder="e.g. ........"
                icon="password"
                required
                showToggle
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordFormData.newPassword}
                // value={formData.newPassword}
                onChange={
                  (e) => handlePasswordChange("newPassword", e.target.value)
                  // handleInputChange("newPassword", e.target.value)
                }
                placeholder="e.g. ........"
                icon="password"
                required
                showToggle
              />

              <FormInput
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordFormData.confirmPassword}
                // value={formData.confirmPassword}
                onChange={
                  (e) => handlePasswordChange("confirmPassword", e.target.value)
                  // handleInputChange("confirmPassword", e.target.value)
                }
                placeholder="e.g. ........"
                icon="password"
                required
                showToggle
              />
            </div>
            <div className="text-neutral-900">
              <h4 className="text-sm text-zinc-600">
                Your new password must be at least 8 characters long and include
                a mix of letters, numbers, and symbols.
              </h4>
              <h4 className="text-sm text-zinc-600">
                Make sure your new password is different from your current
                password.
              </h4>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="w-full cursor-pointer mb-6 py-2 bg-secondary rounded-lg text-white  text-md font-semibold hover:opacity-85 transition"
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

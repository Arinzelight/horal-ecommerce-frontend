import React, { useState } from "react";
import FormInput from "../profile/FormInput";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword === formData.confirmPassword
    ) {
      console.log("Password reset successful");
      navigate("profile");
    } else {
      console.error("Passwords do not match or are empty");
    }
  };

  return (
    <div className="mx-6">
        <SectionHeader
          title="Change Password"
        />
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col justify-start mt-4  max-w-2xl"
      >
        <div className="">
          <h1 className="text-2xl font-bold text-neutral-900  mb-2">
            Set a New Password
          </h1>
          <p className="text-base text-zinc-700  mb-6">
            Create a strong password to keep your account secure.
          </p>
        </div>

        <FormInput
          label="Current Password"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={(e) => handleInputChange("currentPassword", e.target.value)}
          placeholder="e.g. ........"
          icon="password"
          required
          showToggle
        />

        <FormInput
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={(e) => handleInputChange("newPassword", e.target.value)}
          placeholder="e.g. ........"
          icon="password"
          required
          showToggle
        />

        <FormInput
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          placeholder="e.g. ........"
          icon="password"
          required
          showToggle
        />
        <div className="text-neutral-900 mb-6">
          <h4 className="text-sm text-zinc-600">
            Your new password must be at least 8 characters long and include a
            mix of letters, numbers, and symbols.
          </h4>
          <h4 className="text-sm text-zinc-600">
            Make sure your new password is different from your current password.
          </h4>
        </div>

        <button className="w-full cursor-pointer mb-6 h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

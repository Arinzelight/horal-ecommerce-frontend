import React, { useState, useRef, useEffect } from "react";
import { FaRegUser, FaRegEnvelope } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";
import { IoArrowBack, IoCallOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useSeller from "../../../../../hooks/useSeller";
import { useMediaApi } from "../../../../../hooks/useMediaApi";
import formatDate from "../../../../../utils/formatDate";
import { toast } from "../../../../../components/toast";

const ProfileUpdate = () => {
  const { profile, updateProfile, loading } = useSeller();
  const {
    uploadMedia,
    loading: uploadingMedia,
    error: uploadError,
  } = useMediaApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    localGovernment: "",
    state: "",
    landmark: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const fileInputRef = useRef(null);

  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile?.kyc_data?.address?.first_name || "",
        lastName: profile?.kyc_data?.address?.last_name || "",
        email: profile?.email || "",
        phone: profile?.phone_number || "",
        streetAddress: profile?.kyc_data?.address?.street || "",
        localGovernment: profile?.kyc_data?.address?.lga || "",
        state: profile?.kyc_data?.address?.state || "",
        landmark: profile?.kyc_data?.address?.landmark || "",
      });

      // Set profile image if available
      if (profile?.profileImage) {
        setProfileImage(profile.profileImage);
        setUploadedImageUrl(profile.profileImage);
      }
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    if (!uploadingMedia) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Reset any previous errors
      setImageUploadError(null);

      // Create preview URL immediately for better UX
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);

      // Upload the file using the media API
      const uploadResult = await uploadMedia(file, { isPrivate: false });

      // Replace preview URL with actual server URL
      setProfileImage(uploadResult.url);
      setUploadedImageUrl(uploadResult.url);

      // Clean up the preview URL
      URL.revokeObjectURL(previewUrl);

      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);

      // Revert to original image on error
      const originalImage =
        profile?.profileImage ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      setProfileImage(originalImage);
      setImageUploadError("Failed to upload image. Please try again.");
      toast.error("Failed to upload image. Please try again.");

      // Clean up preview URL if it was created
      if (profileImage && profileImage.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        kyc_data: {
          address: {
            street: formData.streetAddress,
            localGovernment: formData.localGovernment,
            state: formData.state,
            landmark: formData.landmark,
          },
        },
      };

      // Include uploaded image URL if it exists and is different from original
      if (uploadedImageUrl && uploadedImageUrl !== profile?.profileImage) {
        updateData.profileImage = uploadedImageUrl;
      }

      // Call the update function
      await updateProfile(updateData);
      toast.success("Profile updated successfully!");
      navigate("/sellers-dashboard/account-settings");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="mt-18 flex lg:flex-row flex-col justify-between lg:items-start items-center w-full gap-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 bg-neutral-200 px-3 py-1 rounded self-start"
      >
        <IoArrowBack className="mr-1" />
        Go Back
      </button>

      {/* Avatar Section */}
      <div className="sm:min-w-96 w-full p-4 bg-white rounded-lg shadow-md flex flex-col items-center gap-4">
        <div className="relative w-36 h-36">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-full w-36 h-36 object-cover"
          />

          {/* Loading overlay */}
          {uploadingMedia && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <ClipLoader color="#fff" size={24} />
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            disabled={uploadingMedia}
          />

          {/* Edit Icon */}
          <div
            onClick={handleImageClick}
            className={`absolute bottom-2 right-2 bg-sky-500 p-2 rounded-full outline outline-3 outline-white cursor-pointer ${
              uploadingMedia
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sky-600"
            }`}
            title={uploadingMedia ? "Uploading..." : "Change photo"}
          >
            <BsCamera className="text-white text-xl" />
          </div>
        </div>

        <p className="text-xs text-center text-gray-700">
          Allow buyers to view your visual identity to build trust.
        </p>

        {/* Error Messages */}
        {imageUploadError && (
          <p className="text-red-600 text-xs text-center max-w-[300px]">
            {imageUploadError}
          </p>
        )}
        {uploadError && (
          <p className="text-red-600 text-xs text-center max-w-[300px]">
            Upload failed:{" "}
            {typeof uploadError === "string" ? uploadError : "Please try again"}
          </p>
        )}

        <div className="text-xs font-bold text-zinc-800 text-center">
          {formatDate(profile?.shop?.created_at)}
        </div>
      </div>

      {/* Form Section */}
      <form className="flex flex-col gap-10 w-full" onSubmit={handleUpdate}>
        {/* Account details */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-lg rounded-tl rounded-tr h-12 py-2.5 sm:px-6 px-3 bg-primary-50 font-bold text-neutral-900 mb-6">
              My Account Details
            </h2>
            <div className="sm:px-6 px-3">
              {/* Input Fields */}
              {[
                { label: "First Name", icon: <FaRegUser />, name: "firstName" },
                { label: "Last Name", icon: <FaRegUser />, name: "lastName" },
                {
                  label: "Email",
                  icon: <FaRegEnvelope />,
                  name: "email",
                  type: "email",
                },
                {
                  label: "Phone",
                  icon: <IoCallOutline />,
                  name: "phone",
                  type: "tel",
                },
              ].map(({ label, icon, name, type = "text" }) => (
                <div key={name} className="mb-4">
                  <label className="block text-sm font-medium text-neutral-900 mb-1">
                    {label}
                  </label>
                  <div className="flex items-center border border-neutral-200 bg-neutral-50">
                    <div className="w-14 text-primary h-14 flex justify-center items-center border-r border-gray-200">
                      {icon}
                    </div>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="flex-1 h-14 px-4 bg-transparent text-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-lg rounded-tl rounded-tr h-12 py-2.5 sm:px-6 px-3 bg-primary-50 font-bold text-neutral-900 mb-6">
              Location
            </h2>
            <div className="sm:px-6 px-3">
              {/* Input Fields */}
              {[
                { label: "Street Address", name: "streetAddress" },
                { label: "Local Government", name: "localGovernment" },
                { label: "State", name: "state" },
                { label: "Landmark", name: "landmark" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} className="mb-4">
                  <label className="block text-sm font-medium text-neutral-900 mb-1">
                    {label}
                  </label>
                  <div className="flex items-center border border-neutral-200 bg-neutral-50">
                    <div className="w-14 text-primary h-14 flex justify-center items-center border-r border-gray-200">
                      <HiOutlineLocationMarker />
                    </div>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="flex-1 h-14 px-4 bg-transparent text-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={loading || uploadingMedia}
            className="w-40 h-8 px-2 bg-secondary cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-xs font-bold gap-2 flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                Updating... <ClipLoader color="#fff" size={12} />
              </span>
            ) : uploadingMedia ? (
              <span className="flex items-center gap-2">
                Uploading... <ClipLoader color="#fff" size={12} />
              </span>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;

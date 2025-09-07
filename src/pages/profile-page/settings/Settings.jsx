import { useEffect, useRef, useState } from "react";
import { toast } from "../../../components/toast";
import { ClipLoader } from "react-spinners";
import AddressUpdate from "./components/AddressUpdate";
import PasswordUpdate from "./components/PasswordUpdate";
import FormInput from "../../../components/FormInput";
import useProfile from "../../../hooks/useProfile";
import useLocation from "../../../hooks/useLocation";
import { useMediaApi } from "../../../hooks/useMediaApi";
import { useNavigate } from "react-router-dom";
import InitialLoader from "../../../components/InitialLoader";

const Settings = () => {
  const navigate = useNavigate();
  const { currentProfile, isProfileLoading, profileError, updateProfile } =
    useProfile();
  const { locationError } = useLocation();
  const {
    uploadMedia,
    loading: uploadingMedia,
    error: uploadError,
  } = useMediaApi();

  const user = currentProfile;

  // Form state management
  const [formData, setFormData] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
  });

  // Image handling states
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(user?.image || null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  // Submission states
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  const filePickerRef = useRef();

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
      setImageFileUrl(user.image || null);
    }
  }, [user]);

  // Image change handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Reset any previous errors
      setImageFileUploadError(null);

      // Create preview URL immediately for better UX
      const previewUrl = URL.createObjectURL(file);
      setImageFileUrl(previewUrl);
      setImageFile(file);

      // Upload the file using the media API
      const uploadResult = await uploadMedia(file, { isPrivate: false });

      // Replace preview URL with actual server URL
      setImageFileUrl(uploadResult.url);

      // Clean up the preview URL
      URL.revokeObjectURL(previewUrl);

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);

      // Revert to original image on error
      setImageFileUrl(user?.image || null);
      setImageFileUploadError("Failed to upload image. Please try again.");
      toast.error("Failed to upload image. Please try again.");

      // Clean up preview URL if it was created
      if (imageFileUrl && imageFileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageFileUrl);
      }
    } finally {
      setImageFile(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProfile(true);
    setUpdateSuccess("");
    setUpdateError("");

    try {
      // Prepare profile data
      const profileUpdateData = {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone_number,
        // Include the uploaded image URL if it exists and is different from the original
        ...(imageFileUrl &&
          imageFileUrl !== user?.image && { image: imageFileUrl }),
      };

      await updateProfile(profileUpdateData);

      toast.success("Profile updated successfully!");
      setUpdateSuccess("Profile updated successfully!");

      // Navigate back to profile after a short delay
      setTimeout(() => {
        navigate("/profile-page/profile");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      setUpdateError("Failed to update profile. Please try again.");
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  // Loading state
  // if (isProfileLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <InitialLoader />
  //     </div>
  //   );
  // }

  // Error state
  if (profileError || locationError) {
    return (
      <div className="text-red-500 text-center p-4 flex flex-col items-center">
        An Error Occurred please try again later.
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Redirect if no user
  // if (!user) {
  //   navigate("/signin");
  //   return null;
  // }

  return (
    <div className="flex flex-col items-center justify-center mb-10 gap-4 text-sm">
      <div className="border border-gray-200 bg-white rounded-lg w-full">
        <h1 className="border-b border-gray-200 px-5 py-4 font-semibold text-[1rem]">
          Account Settings
        </h1>

        {/* Success/Error Messages */}
        {updateSuccess && (
          <div className="mx-5 mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {updateSuccess}
          </div>
        )}
        {updateError && (
          <div className="mx-5 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {updateError}
          </div>
        )}

        {/* Account settings form */}
        <form className="p-5" onSubmit={handleSubmit}>
          <div className="flex sm:flex-row flex-col-reverse sm:justify-start sm:items-center gap-[5rem]">
            <div className="sm:w-[60%] flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-2">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="e.g. Stanley"
                  icon="user"
                  required
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="e.g. adebisistanley@gmail.com"
                  icon="email"
                  required
                  disabled={true}
                />
                <FormInput
                  label="Phone"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) =>
                    handleInputChange("phone_number", e.target.value)
                  }
                  placeholder="+234 902 367 8277"
                  icon="phone"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-[180px] w-[180px]">
                <img
                  className="w-full h-full object-cover rounded-[50%]"
                  src={
                    imageFileUrl ||
                    user?.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="profile pic"
                />
                {uploadingMedia && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[50%]">
                    <ClipLoader color="#fff" size={30} />
                  </div>
                )}
              </div>
              <input
                type="file"
                id="pictureUrl"
                ref={filePickerRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => filePickerRef.current.click()}
                className="text-primary text-xs font-semibold py-2 px-5 border-2 border-primary hover:bg-primary hover:text-white rounded-[1.2rem] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={uploadingMedia}
              >
                {uploadingMedia ? "Uploading..." : "Choose Image"}
              </button>
              {imageFileUploadError && (
                <p className="text-red-600 text-xs mt-2 text-center max-w-[180px]">
                  {imageFileUploadError}
                </p>
              )}
              {uploadError && (
                <p className="text-red-600 text-xs mt-2 text-center max-w-[180px]">
                  Upload failed:{" "}
                  {typeof uploadError === "string"
                    ? uploadError
                    : "Please try again"}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-secondary rounded-lg hover:opacity-90 text-xs py-2 px-5 mt-4 text-white disabled:opacity-50"
              disabled={isSubmittingProfile || uploadingMedia}
            >
              {isSubmittingProfile ? (
                <span className="flex items-center justify-center gap-2">
                  Updating... <ClipLoader color="#fff" top={1} size={15} />
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Address Update component */}
      <AddressUpdate />

      {/* Password Update component */}
      <PasswordUpdate />
    </div>
  );
};

export default Settings;

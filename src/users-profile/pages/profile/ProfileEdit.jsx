import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
import useProfile from "../../../hooks/useProfile";
import useLocation from "../../../hooks/useLocation";
import InitialLoader from "../../../components/InitialLoader";

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentProfile, isProfileLoading, profileError, updateProfile } =
    useProfile();
  const { patchLocation, locationError } =
    useLocation();

  const user = currentProfile;
  

  const [formData, setFormData] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    image: user?.image || "",
    street_address: user?.location?.street_address || "",
    local_govt: user?.location?.local_govt || "",
    state: user?.location?.state || "",
    landmark: user?.location?.landmark || "",
    country: user?.location?.country || "",
  });

  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingLocation, setIsSubmittingLocation] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProfile(true);
    setIsSubmittingLocation(true);
    setUpdateSuccess("");
    setUpdateError("");

    try {
      // Prepare profile data 
      const profileUpdateData = {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone_number,
      };

      // Prepare location data (only if location exists and has an ID)
      const locationUpdateData = user?.location?.id
        ? {
            id: user.location.id,
            street_address: formData.street_address,
            local_govt: formData.local_govt,
            state: formData.state,
            landmark: formData.landmark,
            country: formData.country,
          }
        : null;

      
      await updateProfile(profileUpdateData);
      setIsSubmittingProfile(false);

      // Update location if location data exists
      if (locationUpdateData) {
        await patchLocation(locationUpdateData);
      }
      setIsSubmittingLocation(false);

      setUpdateSuccess("Profile updated successfully!");

      // Navigate back to profile after a short delay
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      
      setUpdateError("Failed to update profile. Please try again.");
    } finally {
      setIsSubmittingProfile(false);
      setIsSubmittingLocation(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg"><InitialLoader/></div>
      </div>
    );
  }

  if (profileError || locationError) {
    return (
      <div className="text-red-500 text-center p-4 flex flex-col items-center">
        An Error Occurred please try again later.
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            // Retry logic can be implemented here
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    navigate("/signin");
    return null;
  }

  const isSubmitting = isSubmittingProfile || isSubmittingLocation;

  return (
    <div className="">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <SectionHeader title="Edit Profile" />

          {/* Success/Error Messages */}
          {updateSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {updateSuccess}
            </div>
          )}
          {updateError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {updateError}
            </div>
          )}

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center my-8">
            <div className="relative">
              <img
                src={
                  user.image ||
       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                 
                }
                alt={user.full_name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-3">
              {user.full_name}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* My Account Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 bg-primary-50 px-4 py-2 rounded-sm">
                My Account Details
                {isSubmittingProfile && (
                  <span className="ml-2 text-sm text-blue-600">
                    Updating...
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* My Address */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 bg-primary-50 px-4 py-2 rounded-sm">
                My Address
                {isSubmittingLocation && (
                  <span className="ml-2 text-sm text-blue-600">
                    Updating...
                  </span>
                )}
              </h3>
              <div className="space-y-4">
                <FormInput
                  label="Street Address"
                  name="street_address"
                  type="text"
                  value={formData.street_address}
                  onChange={(e) =>
                    handleInputChange("street_address", e.target.value)
                  }
                  placeholder="53 Nkwo-Ngwo Road, Nkwo, Enugu"
                  icon="address"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Local Government"
                    name="local_govt"
                    type="text"
                    value={formData.local_govt}
                    onChange={(e) =>
                      handleInputChange("local_govt", e.target.value)
                    }
                    placeholder="Nkwo"
                    icon="city"
                    required
                  />

                  <FormInput
                    label="State"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Enugu"
                    icon="home"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Landmark"
                    name="landmark"
                    type="text"
                    value={formData.landmark}
                    onChange={(e) =>
                      handleInputChange("landmark", e.target.value)
                    }
                    placeholder="Near the market square"
                    icon="address"
                  />

                  <FormInput
                    label="Country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    placeholder="Nigeria"
                    icon="home"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="md:h-[33px] px-6 py-3 md:py-0 border border-gray-300 text-gray-700 rounded-[4px] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="md:h-[33px] px-6 py-3 md:py-0 bg-secondary text-white rounded-[4px] hover:opacity-80 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import FormInput from "../../../../components/FormInput";
import useProfile from "../../../../hooks/useProfile";
import useLocation from "../../../../hooks/useLocation";
import { useNavigate } from "react-router-dom";
import InitialLoader from "../../../../components/InitialLoader";

export default function AddressUpdate() {
  const navigate = useNavigate();
  const { currentProfile, isProfileLoading, profileError } = useProfile();
  const { patchLocation, locationError, createLocation } = useLocation();

  const user = currentProfile;

  // Form state
  const [formData, setFormData] = useState({
    street_address: "",
    local_govt: "",
    state: "",
    landmark: "",
    country: "",
  });

  // Submission state
  const [isSubmittingLocation, setIsSubmittingLocation] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  // Sync form data with user.location once available
  useEffect(() => {
    if (user?.location) {
      setFormData({
        street_address: user.location.street_address ?? "",
        local_govt: user.location.local_govt ?? "",
        state: user.location.state ?? "",
        landmark: user.location.landmark ?? "",
        country: user.location.country ?? "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmittingLocation(true);
    setUpdateSuccess("");
    setUpdateError("");

    try {
      const locationData = { ...formData };

      let result;

      if (!user?.location?.id) {
        result = await createLocation(locationData);
        toast.success("Address created successfully!");
        setUpdateSuccess("Address created successfully!");
      } else {
        const patchData = {
          id: user.location.id,
          ...locationData,
        };
        result = await patchLocation(patchData);
        toast.success("Address updated successfully!");
        setUpdateSuccess("Address updated successfully!");
      }

      //  refresh profile or navigate
      setTimeout(() => {
        navigate("/profile-page/profile");
      }, 1500);
    } catch (error) {
      console.error(" Submission failed:", error);
      toast.error("Failed to save address. Please try again.");
      setUpdateError("Failed to save address. Please try again.");
    } finally {
      setIsSubmittingLocation(false);
    }
  };

  // Error state
  if (profileError || locationError) {
    return (
      <div className="shadow rounded-lg w-full bg-white">
        <h1 className="border-b border-gray-200 px-5 py-4 font-semibold text-[1rem]">
          Billing Address
        </h1>
        <div className="p-5 text-red-500 text-center">
          An error occurred. Please try again later.
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded block mx-auto"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 bg-white rounded-lg w-full">
      <h1 className="border-b border-gray-200 px-5 py-4 font-semibold text-[1rem]">
        Billing Address
      </h1>

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

      <div className="p-5">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
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
              onChange={(e) => handleInputChange("local_govt", e.target.value)}
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
              onChange={(e) => handleInputChange("landmark", e.target.value)}
              placeholder="Near the market square"
              icon="address"
            />

            <FormInput
              label="Country"
              name="country"
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              placeholder="Nigeria"
              icon="home"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-secondary rounded-lg hover:opacity-90 text-xs py-2 px-5 mt-4 text-white disabled:opacity-50"
              disabled={isSubmittingLocation}
            >
              {isSubmittingLocation ? (
                <span className="flex items-center gap-2">
                  Updating... <ClipLoader color="#fff" size={15} />
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

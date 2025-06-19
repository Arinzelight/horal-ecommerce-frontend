import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUserProfile } from "../../../data/mockUser";
import FormInput from "./FormInput";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: mockUserProfile.firstName,
    lastName: mockUserProfile.lastName,
    email: mockUserProfile.email,
    phone: mockUserProfile.phone,
    streetAddress: mockUserProfile.address.street,
    localGovernment: mockUserProfile.address.localGovernment,
    state: mockUserProfile.address.state,
    landmark: mockUserProfile.address.landmark,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Updated profile:", formData);
    // Navigate back to profile
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <SectionHeader title="Edit Profile" />

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center my-8">
            <div className="relative">
              <img
                src={
                  mockUserProfile.profilePicture ||
                  "/placeholder.svg?height=100&width=100"
                }
                alt={mockUserProfile.fullName}
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
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
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
              {mockUserProfile.fullName}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* My Account Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 bg-primary-50 px-4 py-2 rounded-sm">
                My Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="e.g. Stanley"
                  icon="user"
                  required
                />

                <FormInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="e.g. Adebisi"
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
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
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
              </h3>
              <div className="space-y-4">
                <FormInput
                  label="Street Address"
                  name="streetAddress"
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) =>
                    handleInputChange("streetAddress", e.target.value)
                  }
                  placeholder="53 Nkwo-Ngwo Road, Nkwo, Enugu"
                  icon="address"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Local Government"
                    name="localGovernment"
                    type="text"
                    value={formData.localGovernment}
                    onChange={(e) =>
                      handleInputChange("localGovernment", e.target.value)
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
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="md:h-[33px] px-6 py-3 md:py-0 border border-gray-300 text-gray-700 rounded-[4px] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="md:h-[33px] px-6 py-3 md:py-0 bg-secondary text-white rounded-[4px] hover:opacity-80 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

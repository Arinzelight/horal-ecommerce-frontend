import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { mockUserProfile } from "../../../data/mockUser";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile] = useState(mockUserProfile);

  const handleEditProfile = () => {
    navigate("edit");
  };

  return (
    <div className="py-6">
      <div className="">
        {/* Header */}
        <SectionHeader title="My Profile" />
        <div className=" p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* User image */}
            <div className="bg-white flex flex-col w-[330px] h-[208px] shadow-sm p-4  items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <img
                  src={
                    userProfile.profilePicture ||
                    "/placeholder.svg?height=80&width=80"
                  }
                  alt={userProfile.fullName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-[24px]  font-bold text-gray-900">
                  {userProfile.fullName}
                </h1>
                <p className="text-gray-600 text-[12px] text-center ">
                  Joined {userProfile.joinDate}
                </p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={handleEditProfile}
              className="-mt-32 hidden md:block px-6 py-2 bg-secondary text-white rounded-sm hover:opacity-80 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex flex-col">
          <ProfileInfo
            title="My Account"
            data={[
              { label: "Email", value: userProfile.email },
              { label: "Email Status", value: userProfile.emailStatus },
              { label: "Phone", value: userProfile.phone },
            ]}
          />

          <ProfileInfo
            title="My Address"
            data={[
              { label: "Street Address", value: userProfile.address.street },
              {
                label: "Local Government",
                value: userProfile.address.localGovernment,
              },
              { label: "State", value: userProfile.address.state },
              { label: "Landmark", value: userProfile.address.landmark },
            ]}
          />
        </div>

        {/* Mobile Edit Button */}
        <div className="md:hidden mt-6">
          <button
            onClick={handleEditProfile}
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;

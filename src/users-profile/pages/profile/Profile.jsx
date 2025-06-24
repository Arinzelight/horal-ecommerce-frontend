import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { mockUserProfile } from "../../../data/mockUser";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
import MyProfile from "../../../sellers-dashboard/pages/settings/account-settings/profile/MyProfile";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile] = useState(mockUserProfile);

  const handleEditProfile = () => {
    navigate("edit");
  };

  const profileData = {
    fullName: userProfile.fullName,
    email: userProfile.email,
    phone: userProfile.phone,
    joinDate: userProfile.joinDate,
    address: {
      street: userProfile.address.street,
      localGovernment: userProfile.address.localGovernment,
      state: userProfile.address.state,
      landmark: userProfile.address.landmark,
    },
    profilePicture:
      userProfile.profilePicture ||
      "https://randomuser.me/api/portraits/women/85.jpg",
  };

  return (
    <div className="py-6">
      <div className="">
        {/* Header */}
        <SectionHeader title="My Profile" />

        {/* Profile Information */}
        <div className="mt-8">
          <MyProfile
            isSeller={false}
            profileData={profileData}
            onEdit={handleEditProfile}
          />
        </div>
      </div>
    </div>
  );
}
export default UserProfile;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
// import { mockUserProfile } from "../../../data/mockUser";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
import MyProfile from "../../../sellers-dashboard/pages/settings/account-settings/profile/MyProfile";
import { useSelector } from "react-redux";
import useProfile from "../../../hooks/useProfile";

const UserProfile = () => {
  const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.user);
  const {
    currentProfile,
    isProfileLoading,
    profileError,
  } = useProfile();

  const user = currentProfile;
  console.log("User Profile Data:", user);

  const handleEditProfile = () => {
    navigate("edit");
  };

  const profileData = {
    fullName: user?.full_name,
    email: user?.email,
    phone: user?.phone_number || "NA",
    joinDate: user?.joinDate || "NA",
    location: {
      street_address: user?.location?.street_address || "NA", 
      local_govt: user?.location?.local_govt || "NA", 
      state: user?.location?.state || "NA",
      landmark: user?.location?.landmark || "NA",
      country: user?.location?.country || "NA",
    },
    profilePicture:
      user?.image || "https://randomuser.me/api/portraits/women/85.jpg",
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

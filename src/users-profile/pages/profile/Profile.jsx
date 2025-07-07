import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
// import { mockUserProfile } from "../../../data/mockUser";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
import MyProfile from "../../../sellers-dashboard/pages/settings/account-settings/profile/MyProfile";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const user = userInfo?.data;
  console.log("User Profile Data:", user);

  const handleEditProfile = () => {
    navigate("edit");
  };

  const profileData = {
    fullName: user.full_name,
    email: user.email,
    phone: user.phone_number || "NA",
    joinDate: user.joinDate || "NA",
    address: {
      street: user.address?.street || "NA",
      localGovernment: user.address?.localGovernment || "NA",
      state: user.address?.state || "NA",
      landmark: user.address?.landmark || "NA",
    },
    profilePicture:
      user.profilePicture ||
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

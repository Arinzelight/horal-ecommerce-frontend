import React, { useState } from "react";
import SectionHeader from "../../../components/SectionHeader";
import PasswordUpdate from "./PasswordUpdate";
import MyProfile from "./profile/MyProfile";
import KYC from "./kyc/KYC";
import { mockUserProfile } from "../../../../data/mockUser";
import ProfileUpdate from "./profile/ProfileUpdate";

const Account = () => {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [isEditing, setIsEditing] = useState(false);
const [userProfile] = useState(mockUserProfile);

  const handleEditClick = () => {
    setIsEditing(true);
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

  const tabClass = (tabName, activeColor) =>
    `pb-2 px-4 font-medium w-full cursor-pointer transition duration-150 ${
      activeTab === tabName
        ? `${activeColor} border-b-2 ${activeColor}`
        : "text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-md">
      <SectionHeader title="Account" />

      {/* Tabs */}
      <div className="flex justify-between w-full items-center my-6">
        <button
          className={tabClass("My Profile", "text-secondary border-secondary")}
          onClick={() => setActiveTab("My Profile")}
        >
          My Profile
        </button>
        <button
          className={tabClass("Password", "text-orange-500 border-orange-500")}
          onClick={() => setActiveTab("Password")}
        >
          Password
        </button>
        <button
          className={tabClass("KYC", "text-orange-500 border-orange-500")}
          onClick={() => setActiveTab("KYC")}
        >
          KYC
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "My Profile" &&
        (isEditing ? (
          <ProfileUpdate />
        ) : (
          <MyProfile isSeller={true} profileData={profileData} onEdit={handleEditClick} />
        ))}
      {activeTab === "Password" && <PasswordUpdate />}
      {activeTab === "KYC" && <KYC />}
    </div>
  );
};

export default Account;

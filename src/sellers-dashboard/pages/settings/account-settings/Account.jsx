import React, { useState } from "react";
import SectionHeader from "../../../components/SectionHeader";
import PasswordUpdate from "./PasswordUpdate";
import MyProfile from "./profile/MyProfile";
import KYC from "./kyc/KYC";

const Account = () => {
  const [activeTab, setActiveTab] = useState("My Profile");

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
      {activeTab === "My Profile" && <MyProfile />}
      {activeTab === "Password" && <PasswordUpdate />}
      {activeTab === "KYC" && <KYC />}
    </div>
  );
};

export default Account;

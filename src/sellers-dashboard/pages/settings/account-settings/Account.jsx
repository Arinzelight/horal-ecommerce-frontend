import React, { useState } from "react";
import SectionHeader from "../../../components/SectionHeader";
import MyProfile from "./MyProfile";
import PasswordUpdate from "./PasswordUpdate";

const Account = () => {
  const [activeTab, setActiveTab] = useState("My Profile");

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-md">
      <SectionHeader title="Account" />

      {/* Tabs */}
      <div className="flex justify-between w-full items-center my-10">
        <button
          className={`pb-2 px-4 font-medium w-full cursor-pointer ${
            activeTab === "My Profile"
              ? "text-secondary border-b-2 border-secondary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("My Profile")}
        >
          My profile
        </button>
        <button
          className={`pb-2 px-4 font-medium w-full cursor-pointer ${
            activeTab === "Password"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("Password")}
        >
          Password
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "My Profile" && <MyProfile />}
      {/* You can add a similar block for "Password" if needed */}
      {activeTab === "Password" && <PasswordUpdate />}
    </div>
  );
};

export default Account;

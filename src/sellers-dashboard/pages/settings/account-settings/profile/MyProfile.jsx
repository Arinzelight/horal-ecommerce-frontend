import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import CarbonBadge from "../../../../../assets/icons/carbon_badge.svg";
import { FaCrown } from "react-icons/fa";
import ProfileUpdate from "./ProfileUpdate";

const MyProfile = ({ isSeller = false, profileData={}, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    if (onEdit) {
      onEdit();
    }
    setIsEditing(true);
  };

  if (isEditing) {
    return <ProfileUpdate />;
  }

  return (
    <div className="flex lg:flex-row flex-col justify-between lg:items-start items-center w-full gap-6">
      {/* Left Profile Card */}
      <div className="flex sm:min-w-95 w-full flex-col items-center">
        <div className="w-full py-4 bg-white sm:mx-5 rounded-lg shadow-md flex flex-col items-center gap-2">
          <div
            className={`h-56 flex flex-col items-center gap-2 ${
              isSeller ? "" : "justify-center"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src={
                  profileData.profilePicture ||
                  "https://randomuser.me/api/portraits/women/85.jpg"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full"
              />
              <div className="text-neutral-900 text-2xl font-bold">
                {profileData.fullName}
              </div>
            </div>

            {/* Seller Verification Badge - only show if isSeller */}
            {isSeller && (
              <div className="px-2 py-1 bg-red-100 rounded-full border border-neutral-100 flex items-center gap-1">
                <span className="text-red-500 text-xs font-bold">
                  <img
                    src={CarbonBadge}
                    alt="Badge"
                    className="w-4 h-4 inline-block mr-1"
                  />
                  Un-verified Seller
                </span>
              </div>
            )}
          </div>
          <div className="text-center text-zinc-800 text-xs font-bold">
            Joined 25th Dec, 2025
          </div>
        </div>

        {/* Upgrade Badge Button - only show if isSeller */}
        {isSeller && (
          <button className="px-6 py-2 bg-primary cursor-pointer hover:opacity-90 rounded text-white text-xs font-bold flex items-center mt-4">
            <span className="px-2">Basic (Upgrade)</span>
            <FaCrown className="text-lg" />
          </button>
        )}
      </div>

      {/* Right Profile Info */}
      <div className="w-full flex flex-col items-end gap-8">
        {/* Edit Button */}
        <button
          onClick={handleEditClick}
          className="hidden md:flex w-40 h-8 px-2 bg-secondary cursor-pointer hover:opacity-90 rounded flex justify-center items-center gap-2"
        >
          <span className="text-white text-xs font-bold">Edit Profile</span>
          <FiEdit className="text-white" />
        </button>

        {/* Account Details */}
        <div className="w-full bg-white rounded-lg shadow-md flex flex-col gap-12 overflow-hidden">
          <div className="w-full flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-md">
              <h2 className="text-lg rounded-tl rounded-tr h-12 py-2.5 px-4 bg-primary-50 font-bold text-neutral-900 mb-6">
                My Account Details
              </h2>
              <div>
                <div className="p-4 flex flex-col gap-6 font-bold sm:text-lg text-sm">
                  <div className="flex justify-between gap-1">
                    <span className="text-neutral-400">Email:</span>
                    <span className="text-neutral-600 truncate">
                      {profileData.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Phone:</span>
                    <span className="text-neutral-600">
                      {profileData.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="w-full bg-white rounded-lg shadow-md flex flex-col gap-12 overflow-hidden">
          <div className="w-full flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-md">
              <h2 className="text-lg rounded-tl rounded-tr h-12 py-2.5 px-4 bg-primary-50 font-bold text-neutral-900 mb-6">
                Location
              </h2>
              <div className="">
                <div className="p-4 flex flex-col gap-6 sm:text-lg text-base">
                  <div className="flex justify-between sm:flex-row flex-col">
                    <span className="text-neutral-400 font-bold">
                      Street Address
                    </span>
                    <span className="text-neutral-600 font-bold">
                      {profileData.location.street_address || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between sm:flex-row flex-col">
                    <span className="text-neutral-400 font-bold">
                      Local Government
                    </span>
                    <span className="text-neutral-600 font-bold">
                      {profileData.location.local_govt || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between sm:flex-row flex-col">
                    <span className="text-neutral-400 font-bold">State</span>
                    <span className="text-neutral-600 font-bold">
                      {profileData.location.state || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between sm:flex-row flex-col gap-2">
                    <span className="text-neutral-400 font-bold">Landmark</span>
                    <span className="text-neutral-600 font-bold truncate">
                      {profileData.location.landmark || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleEditClick}
          className="md:hidden w-40 h-8 px-2 bg-secondary cursor-pointer hover:opacity-90 rounded flex justify-center items-center gap-2"
        >
          <span className="text-white text-xs font-bold">Edit Profile</span>
          <FiEdit className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MyProfile;

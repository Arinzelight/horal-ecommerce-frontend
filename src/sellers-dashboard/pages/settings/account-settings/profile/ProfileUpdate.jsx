import React, { useState, useRef } from "react";
import { FaRegUser, FaRegEnvelope } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Router } from "react-router-dom";

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    localGovernment: "",
    state: "",
    landmark: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/women/85.jpg"
  );
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // TODO: Upload image to cloud storage
    }
  };

  const handleUpdate = (e) => {
    Router.push("/sellers-dashboard/settings/account-settings");
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between lg:items-start items-center w-full gap-6">
      {/* Avatar Section */}
      <div className="sm:min-w-96 w-full p-4 bg-white  rounded-lg shadow-md flex flex-col items-center gap-4">
        <div className="relative w-36 h-36">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-full w-36 h-36 object-cover"
          />
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
          {/* Edit Icon */}
          <div
            onClick={handleImageClick}
            className="absolute bottom-2 right-2 bg-sky-500 p-2 rounded-full outline outline-3 outline-white cursor-pointer"
            title="Change photo"
          >
            <BsCamera className="text-white text-xl" />
          </div>
        </div>
        <p className="text-xs text-center text-gray-700">
          Allow buyers to view your visual identity to build trust.
        </p>
        <div className="text-xs font-bold text-zinc-800 text-center">
          Joined 25th Dec, 2025
        </div>
      </div>

      {/* Form Section */}
      <form className="flex flex-col gap-10  w-full">
        {/* Account details */}
        <div className="flex-1  flex flex-col gap-8">
          <div className="bg-white rounded-lg shadow-md ">
            <h2 className="text-lg rounded-tl rounded-tr  h-12 py-2.5 sm:px-6 px-3 bg-primary-50 font-bold text-neutral-900 mb-6">
              My Account Details
            </h2>
            <div className=" sm:px-6 px-3">
              {/* Input Fields */}
              {[
                { label: "First Name", icon: <FaRegUser />, name: "firstName" },
                { label: "Last Name", icon: <FaRegUser />, name: "lastName" },
                {
                  label: "Email",
                  icon: <FaRegEnvelope />,
                  name: "email",
                  type: "email",
                },
                {
                  label: "Phone",
                  icon: <IoCallOutline />,
                  name: "phone",
                  type: "tel",
                },
              ].map(({ label, icon, name, type = "text" }) => (
                <div key={name} className="mb-4">
                  <label className="block text-sm font-medium text-neutral-900 mb-1">
                    {label}
                  </label>

                  <div className="flex items-center border border-neutral-200 bg-neutral-50 ">
                    <div className="w-14 text-primary h-14 flex justify-center items-center border-r border-gray-200">
                      {icon}
                    </div>
                    <input
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                      className="flex-1 h-14 px-4 bg-transparent text-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex-1  flex flex-col gap-8">
          <div className="bg-white rounded-lg shadow-md ">
            <h2 className="text-lg rounded-tl rounded-tr   h-12 py-2.5 sm:px-6 px-3 bg-primary-50 font-bold text-neutral-900 mb-6">
              Location
            </h2>

            <div className=" sm:px-6 px-3">
              {/* Input Fields */}
              {[
                { label: "Street Address", name: "streetAddress" },
                { label: "Local Government", name: "localGovernment" },
                {
                  label: "State",
                  name: "state",
                  type: "text",
                },
                {
                  label: "Landmark",
                  name: "landmark",
                  type: "tel",
                },
              ].map(({ label, icon, name, type = "text" }) => (
                <div key={name} className="mb-4 ">
                  <label className="block text-sm font-medium text-neutral-900 mb-1">
                    {label}
                  </label>

                  <div className="flex items-center border border-neutral-200 bg-neutral-50 ">
                    <div className="w-14 text-primary h-14 flex justify-center items-center border-r border-gray-200">
                      <HiOutlineLocationMarker />
                    </div>
                    <input
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                      className="flex-1 h-14 px-4 bg-transparent text-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={handleUpdate}
            class="w-40 h-8 px-2 bg-secondary cursor-pointer hover:opacity-90 text-white rounded text-xs font-bold gap-2"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;

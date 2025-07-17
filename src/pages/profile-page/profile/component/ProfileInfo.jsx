import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";

const ProfileInfo = ({ user }) => {
  const currentUser = useSelector((state) => state.user);
  const updatedUserData = useSelector((state) => state.user.currentUser?.user);

  return (
    <div className=" border-[1.5px] border-gray-200  lg:w-[60%] w-full flex flex-col items-center md:items-center gap-2 justify-center py-8   rounded-lg">
      <img
        src={
          updatedUserData?.pictureUrl ||
          currentUser?.pictureUrl ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt="user profile"
        className="rounded-full w-[100px] h-[100px] object-cover"
      />
      <h2 className="font-bold">{user?.full_name || "Guest"}</h2>
      <p className="text-gray-400">{user?.email || "NA"}</p>
      {/* <Link
        to="/profile-page/settings"
        className="text-primary text-sm font-bold"
      >
        Edit Profile
      </Link> */}
      <Link
        to="/profile-page/settings"
        className="md:flex w-40 h-8 px-2 bg-primary cursor-pointer hover:opacity-90 rounded flex justify-center items-center gap-2"
      >
        <span className="text-white text-xs font-bold">Edit Profile</span>
        <FiEdit className="text-white" />
      </Link>
    </div>
  );
};

export default ProfileInfo;

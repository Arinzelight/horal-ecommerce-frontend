import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileInfo = ({user}) => {
  const currentUser = useSelector((state) => state.user);
  const updatedUserData = useSelector((state) => state.user.currentUser?.user);

  return (
    <div className="lg:h-[250px] bg-white w-full  lg:w-[480px] flex flex-col items-center md:items-center gap-2 justify-center py-10 pl-8 shadow rounded-lg">
      <img
        src={
          updatedUserData?.pictureUrl ||
          currentUser?.pictureUrl ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt="user profile"
        className="rounded-full w-[100px] h-[100px] object-cover"
      />
      <h2 className="font-bold">{user?.full_name || ""}</h2>
      <p className="text-gray-400">{user?.email || ""}</p>
      <Link to="/profile-page/settings" className="text-primary text-sm font-bold">
        Edit Profile
      </Link>
    </div>
  );
};

export default ProfileInfo;

import React from "react";

import ProfileNavigation from "./components/ProfileNavigation";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="">
      <div className="min-h-screen w-full flex flex-col md:flex-row gap-5 ">
        <div className="w-full basis-1/4 ">
          <ProfileNavigation />
        </div>
        <div className="basis-3/4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

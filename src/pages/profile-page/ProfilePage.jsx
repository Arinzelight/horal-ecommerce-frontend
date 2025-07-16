import React from "react";

import ProfileNavigation from "./components/ProfileNavigation";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="">
      <div className="min-h-screen w-full lg:pt-8 pt-3 flex flex-col md:flex-row gap-5 ">
        <div className="w-full basis-1/4 lg:w-[20%]">
          <ProfileNavigation />
        </div>
        <div className="lg:w-[75%] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

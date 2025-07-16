import React from "react";
import { Link } from "react-router-dom";

const LocationInfo = ({ user }) => {
  return (
    <div className="text-xs lg:h-[250px] bg-white w-full lg:w-[310px] flex flex-col items-start gap-2 py-4 pl-8 shadow rounded-lg">
      <h2 className="text-neutral-500 text-sm uppercase">Billing Address</h2>

      <div className="mt-2">
        <span className="text-sm font-bold">
          {user?.full_name || "Not Available"}
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-neutral-400">
          {user?.location?.landmark || "Not Available"}
        </span>
      </div>

      <div className="flex items-center mt-6">
        <span className="">{user?.email || "Not Available"}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="">{user?.phone_number || "Not Available"}</span>
      </div>
      <div className="w-full mt-4 flex justify-center">
        <Link
          to="/profile-page/settings"
          className="text-primary text-sm font-bold text-center"
        >
          Edit Address
        </Link>
      </div>
    </div>
  );
};

export default LocationInfo;

import React from "react";
import { Link } from "react-router-dom";

const LocationInfo = ({ user }) => {
  return (
    <div className="border-[1.5px] border-gray-200 w-full lg:w-[40%]  flex flex-col items-start py-7 px-6  rounded-lg">
      {/* Header */}
      <h2 className="text-gray-300 text-base font-semibold uppercase  mb-3">
        Address
      </h2>

      {/* Name */}
      <div className="mb-2">
        <span className="text-base font-bold text-gray-900">
          {user?.full_name || "Not Available"}
        </span>
      </div>

      {/* Address Block */}
      <div className="flex flex-col space-y-1 text-sm text-gray-700 mb-5">
        <div className="flex gap-1 truncate text-gray-600">
          <span>{user?.location?.street_address || "NA"}</span>
          <span>{user?.location?.local_govt || "NA"}</span>
          <span className="text-gray-500">
            {user?.location?.landmark || "NA"}
          </span>
        </div>
        <span>
          {user?.location?.state || "NA"},{user?.location?.country || "NA"}
        </span>
      </div>

      {/* Contact Block */}
      <div className="flex flex-col space-y-1.5 text-sm font-semibold text-gray-800">
        <span>{user?.email || "Not Available"}</span>
        <span className="text-gray-500">
          {user?.phone_number || "08000000001"}
        </span>
      </div>

      {/* Edit Link */}
      <div className="w-full mt-2.5 flex justify-start">
        <Link
          to="/profile-page/settings"
          className="text-primary text-sm font-bold  hover:opacity-90 transition-colors"
        >
          Edit Address
        </Link>
      </div>
    </div>
  );
};

export default LocationInfo;

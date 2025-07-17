import React from "react";

const ShippingInfo = ({ user }) => {
  return (
    <div className=" w-full lg:w-[480px] mt-5 flex flex-col py-5 px-6 border-[1.5px] border-gray-200 rounded-lg">
      {/* Header */}
      <h2 className="text-gray-500 text-sm font-semibold uppercase  mb-4">
        Shipping Address
      </h2>

      {/* Name */}
      <div className="mb-3">
        <span className="text-base font-semibold text-gray-900">
          {user?.full_name || "Not Available"}
        </span>
      </div>

      {/* Address Block */}
      <div className="flex flex-col space-y-2 text-sm text-gray-700 mb-4">
        <span>{user?.shipping_address?.street_address || "Not Available"}</span>
        {user?.shipping_address?.landmark && (
          <span className="text-gray-500">
            {user.shipping_address.landmark}
          </span>
        )}
        <span>
          {user?.shipping_address?.state || "Not Available"}
          {user?.shipping_address?.country &&
            `, ${user.shipping_address.country}`}
        </span>
      </div>

      {/* Contact Block */}
      <div className="flex flex-col space-y-2 text-sm text-gray-700">
        <span className="font-semibold">{user?.email || "Not Available"}</span>
        <span>{user?.shipping_address?.phone_number || "Not Available"}</span>
      </div>
    </div>
  );
};

export default ShippingInfo;

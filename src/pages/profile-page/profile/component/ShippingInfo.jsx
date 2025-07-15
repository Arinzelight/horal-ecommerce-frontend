import React from "react";

const ShippingInfo = ({ user }) => {
  return (
    <div className="text-xs mt-4 lg:h-[250px] bg-white w-full  lg:w-[480px] flex flex-col items-start gap-2 py-4 pl-8 shadow rounded-lg">
      <h2 className="text-gray-400">CURRENT SHIPPING ADDRESS</h2>
      <div className="mt-2 flex items-center gap-6">
        <span className="text-sm font-bold">
          {user?.full_name || "Not Available"}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="">
          {user?.shipping_address?.street_address || "Not Available"}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-6">
        <span className="">
          {user?.email || "Not Available"}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="">
          {user?.shipping_address?.phone_number || "Not Available"}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-6">
        <span className="">
          {user?.shipping_address?.state || "Not Available"}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="">
          {user?.shipping_address?.landmark || "Not Available"}
        </span>
      </div>
    </div>
  );
};

export default ShippingInfo;

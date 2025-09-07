import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="w-full h-12 py-2.5 border-b border-gray-200 flex items-center gap-2.5 overflow-hidden">
      <h1 className="text-neutral-900 lg:text-2xl  text-xl font-bold ">
        {title}
      </h1>
    </div>
  );
};

export default SectionHeader;

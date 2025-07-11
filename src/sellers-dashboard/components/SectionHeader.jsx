import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="w-full h-12 py-2.5 border-b border-neutral-400 flex items-center gap-2.5 overflow-hidden">
      <div className="text-neutral-900 text-xl font-bold font-nunito">
        {title}
      </div>
    </div>
  );
};

export default SectionHeader;

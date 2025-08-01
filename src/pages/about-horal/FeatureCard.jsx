import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="w-80 p-6 bg-primary-50 rounded shadow-[0px_3px_8px_0px_rgba(143,143,143,0.10)] shadow-[-1px_14px_14px_0px_rgba(143,143,143,0.09)] shadow-[-2px_31px_19px_0px_rgba(143,143,143,0.05)] shadow-[-4px_55px_22px_0px_rgba(143,143,143,0.01)] shadow-[-7px_48px_16.1px_0px_rgba(143,143,143,0.00)] inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
      <div className="py-2 flex flex-col justify-center items-start gap-2 overflow-hidden">
        <div className="w-14 h-14 p-4 bg-sky-500 rounded-[30px] inline-flex justify-center items-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="inline-flex justify-center items-center">
          <div className="w-46 text-neutral-900 text-base font-bold ">
            {title}
          </div>
        </div>
      </div>

      <div className="self-stretch inline-flex justify-center items-center">
        <div className="flex-1 text-justify text-neutral-900 text-sm font-normal ">
          {description}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;

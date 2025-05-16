import React from "react";
import { GrLineChart } from "react-icons/gr";

const StatCard = ({
  title = "TOTAL REVENUE",
  amount = "$3728",
  percentage = "+45%",
  comparison = "Compared to Apr 2024",
  icon: Icon,
  iconBg = "bg-primary-500",
}) => {
  return (
    <div className="p-4 bg-white rounded outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-start items-start gap-2 w-full  ">
      <div className="h-24 flex flex-col justify-between items-start">
        {/* Top */}
        <div className="w-28 flex flex-col gap-1.5">
          <div className="flex items-end gap-1.5">
            <div
              className={`p-[2.9px] ${iconBg} rounded-[2.9px] inline-flex items-center justify-center`}
            >
              {Icon && <Icon className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className="text-xs font-medium text-neutral-900 font-nunito">
              {title}
            </span>
          </div>
          <div className="text-4xl font-bold text-neutral-900 font-nunito">
            {amount}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <GrLineChart
              className={`${
                percentage < 0
                  ? "text-red-500 transform scale-x-[1] scale-y-[-1]"
                  : "text-green-500"
              }`}
            />

            <span
              className={`text-xs font-bold font-nunito ${
                percentage < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {percentage}%
            </span>
          </div>

          <span className="text-[10px] font-bold text-neutral-400 font-nunito">
            {comparison}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;

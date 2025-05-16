import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SalesByCategory = () => {
  // Data for the pie chart
  const pieData = [
    { name: "Clothing", value: 25, color: "#34C759" },
    { name: "Vehicles", value: 20, color: "#FF2D55" },
    { name: "Fashion", value: 15, color: "#8B5CF6" },
    { name: "Electronics", value: 20, color: "#FFCC00" },
    { name: "Gadget", value: 20, color: "#30B0C7" },
  ];

  // Data for the legend items
  const categoryData = [
    {
      name: "Clothing",
      products: "209 CATEGORY PRODUCTS",
      amount: "65,000",
      color: "#34C759",
    },
    {
      name: "Vehicles",
      products: "209 CATEGORY PRODUCTS",
      amount: "65,000",
      color: "#FF2D55",
    },
    {
      name: "Fashion",
      products: "209 CATEGORY PRODUCTS",
      amount: "65,000",
      color: "#8B5CF6",
    },
    {
      name: "Electronics",
      products: "209 CATEGORY PRODUCTS",
      amount: "65,000",
      color: "#FFCC00",
    },
    {
      name: "Gadget",
      products: "209 CATEGORY PRODUCTS",
      amount: "65,000",
      color: "#30B0C7",
    },
  ];

  return (
    <div className="p-4 bg-white w-full lg:w-[50%] rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-center items-center gap-2.5">
      <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-6">
        {/* Pie Chart Section */}
        <div className="w-44 self-stretch inline-flex flex-col justify-between items-start">
          <div className="self-stretch justify-start text-neutral-900 text-xs font-medium font-nunito">
            SALES BY CATEGORY
          </div>
          <div className="self-stretch h-44 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={75}
                  paddingAngle={10}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="left-[30.98px] top-[62.29px] absolute inline-flex flex-col justify-start items-start">
              <div className="inline-flex justify-center items-center">
                <div className="p-1">
                  <span className="text-neutral-900 text-xl font-bold font-nunito">
                    ₦50,002
                  </span>
                  <span className="text-neutral-400 text-sm font-bold font-nunito">
                    .00
                  </span>
                </div>
              </div>
              <div className="self-stretch text-center justify-start text-neutral-800 text-xs font-normal font-nunito">
                Total Sales
              </div>
            </div>
          </div>
        </div>

        {/* Legend and Time Selector Section */}
        <div className="inline-flex flex-col justify-start items-end gap-5">
          {/* Time Selector */}
          <div className="px-1.5 py-2 bg-neutral-50 rounded outline outline-1 outline-offset-[-1.03px] outline-neutral-200 inline-flex justify-center items-center">
            <div className="w-16 self-stretch flex justify-between items-center">
              <div className="justify-start text-neutral-900 text-xs font-bold font-nunito">
                Week
              </div>
              <div className="w-0 h-4 relative origin-top-left rotate-90 overflow-hidden">
                <div className="w-2.5 h-[5.08px] left-[13.17px] top-[6.83px] absolute origin-top-left -rotate-180 bg-neutral-900"></div>
              </div>
            </div>
          </div>

          {/* Category Legend */}
          <div className="flex flex-col justify-start items-start gap-2">
            {categoryData.map((category, index) => (
              <div
                key={index}
                className="inline-flex justify-end items-center gap-2.5"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <div className="w-60 flex justify-between items-center">
                  <div className="inline-flex flex-col justify-start items-start">
                    <div className="self-stretch justify-start text-neutral-700 text-xs font-bold font-nunito">
                      {category.name}
                    </div>
                    <div className="justify-start text-neutral-600 text-[10px] font-normal font-nunito">
                      {category.products}
                    </div>
                  </div>
                  <div className="justify-start">
                    <span className="text-neutral-700 text-xs font-bold font-nunito">
                      ₦{category.amount}.
                    </span>
                    <span className="text-neutral-400 text-[10px] font-bold font-nunito">
                      00
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesByCategory;

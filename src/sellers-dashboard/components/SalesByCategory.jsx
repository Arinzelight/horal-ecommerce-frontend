import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiChevronDown } from "react-icons/fi";

const SalesByCategory = () => {
  const [selectedFilter, setSelectedFilter] = useState("Week");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelectedFilter(option);
    setIsOpen(false);
  };

  const pieData = [
    { name: "Clothing", value: 25, color: "#34C759" },
    { name: "Vehicles", value: 20, color: "#FF2D55" },
    { name: "Fashion", value: 15, color: "#8B5CF6" },
    { name: "Electronics", value: 20, color: "#FFCC00" },
    { name: "Gadget", value: 20, color: "#30B0C7" },
  ];

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

  const timeFilters = ["Day", "Hour", "Week", "Month", "Year"];
  const dropdownFilters = ["Day", "Month", "Year"];

  return (
    <div className="p-4 lg:w-1/2 w-full bg-white rounded-2xl outline outline-1 outline-neutral-200">
      <div className="flex justify-between mb-5">
        {/* Chart Title */}
        <div>
          <h2 className="text-xs sm:text-base font-medium text-neutral-900">
            SALES BY CATEGORY
          </h2>
        </div>

        {/* Dropdown Filter (Desktop Only) */}
        <div className="relative  hidden md:block">
          <div
            onClick={toggleDropdown}
            className="px-2 py-2 bg-neutral-50 rounded outline outline-1 outline-neutral-200 w-24 flex justify-between items-center cursor-pointer"
          >
            <span className="text-xs font-bold text-neutral-900">
              {selectedFilter}
            </span>
            <FiChevronDown
              className={`w-4 h-4 text-neutral-900 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isOpen && (
            <div className="absolute left-11 mt-1 w-24 z-40 bg-white rounded shadow-md">
              {dropdownFilters.map((option) => (
                <div
                  key={option}
                  onClick={() => selectOption(option)}
                  className={`px-3 py-3 text-xs font-medium text-neutral-800 cursor-pointer hover:bg-neutral-100 ${
                    selectedFilter === option ? "bg-neutral-100" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Chart + Total */}
        <div className="w-full h-44 relative self-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={68}
                outerRadius={85}
                paddingAngle={4}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <div className="justify-start">
              <span className="text-neutral-900 md:text-2xl text-xl font-bold ">
                ₦500,000
              </span>
              <span className="text-neutral-400 text-lg font-bold ">.00</span>
            </div>
            <p className="text-xs font-normal text-neutral-800 mt-1">
              Total Sales
            </p>
          </div>
        </div>

        {/* Right Section: Filter & Category List */}
        <div className="w-full flex flex-col">
          {/* Time Filter Tabs (Mobile Only) */}
          <div className="flex justify-between items-start border-b border-neutral-200 overflow-x-auto w-full md:hidden">
            {timeFilters.map((label) => (
              <button
                key={label}
                onClick={() => setSelectedFilter(label)}
                className={`px-3 py-2 border-b-2 text-xs font-bold whitespace-nowrap ${
                  selectedFilter === label
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-neutral-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Category Breakdown List */}
          <div className="flex flex-col gap-1 w-full mt-4">
            {categoryData.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div
                  className="w-3 h-3 rounded-full mt-1"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="w-full flex justify-between">
                  <div>
                    <div className="text-xs font-bold text-neutral-700">
                      {item.name}
                    </div>
                    <div className="text-[8px] text-neutral-600">
                      {item.products}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-neutral-700">
                      ₦{item.amount}.
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400">
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

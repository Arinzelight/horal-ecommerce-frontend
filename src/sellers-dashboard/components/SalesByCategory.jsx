import React, { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiChevronDown } from "react-icons/fi";
import useSellerAnalytics from "../../hooks/useSellerAnalytics";

const COLORS = [
  "#34C759",
  "#FF2D55",
  "#8B5CF6",
  "#FFCC00",
  "#30B0C7",
  "#FF8A65",
  "#A1887F",
  "#4DB6AC",
];

const SalesByCategory = () => {
  const [selectedFilter, setSelectedFilter] = useState("Week");
  const [isOpen, setIsOpen] = useState(false);

  const { analytics, loading, error } = useSellerAnalytics();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelectedFilter(option);
    setIsOpen(false);
  };

  // Filter mappings
  const filterKeyMap = {
    Week: "weekly",
    Month: "monthly",
    Year: "yearly",
  };

  // Only supported filters shown
  const timeFilters = ["Week", "Month", "Year"];
  const dropdownFilters = ["Week", "Month", "Year"];

  const salesData = useMemo(() => {
    if (!analytics?.sales_by_category) return [];

    const key = filterKeyMap[selectedFilter];
    return analytics.sales_by_category[key] || [];
  }, [analytics, selectedFilter]);

  const pieData = useMemo(() => {
    return salesData.map((item, idx) => ({
      name: item.category,
      value: item.total_sales,
      color: COLORS[idx % COLORS.length],
    }));
  }, [salesData]);

  const totalSales = pieData.reduce((sum, item) => sum + item.value, 0);

  const categoryData = pieData.map((item, idx) => ({
    name: item.name,
    products: `QUANTY ${salesData[idx]?.total_quantity ?? 0}  `,
    amount: item.value.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    }),
    color: item.color,
  }));

  if (loading) {
    return (
      <div className="p-4 lg:w-1/2 w-full bg-white rounded-2xl">
        <p className="text-center text-sm">Loading sales data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:w-1/2 w-full bg-white rounded-2xl">
        <p className="text-center text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:w-1/2 w-full bg-white rounded-2xl outline outline-1 outline-neutral-200">
      <div className="flex justify-between mb-5">
        <h2 className="text-xs sm:text-base font-medium text-neutral-900">
          SALES BY CATEGORY
        </h2>

        {/* Dropdown (Desktop only) */}
        <div className="relative hidden md:block">
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
        {/* Left Section: Chart */}
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

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <div className="justify-start">
              <span className="text-neutral-900 md:text-2xl text-xl font-bold">
                ₦
                {totalSales.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <p className="text-xs font-normal text-neutral-800 mt-1">
              Total Sales
            </p>
          </div>
        </div>

        {/* Right Section: Mobile Tabs + List */}
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
                      ₦{item.amount}
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

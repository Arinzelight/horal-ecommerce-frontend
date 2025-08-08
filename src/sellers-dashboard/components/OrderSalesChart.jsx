import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useSellerAnalytics from "../../hooks/useSellerAnalytics";
import { format } from "date-fns";

const OrderSalesOverview = () => {
  const { analytics, loading, error } = useSellerAnalytics();

  const chartData = useMemo(() => {
    const monthlyData = analytics?.sales_and_order_overview?.monthly;
    if (!monthlyData || !Array.isArray(monthlyData)) return [];

    return monthlyData
      .slice()
      .sort((a, b) => new Date(a.period_start) - new Date(b.period_start))
      .map((item) => ({
        name: format(new Date(item.period_start), "MMM"),
        orders: item.order_count,
        sales: item.total_sales,
      }));
  }, [analytics]);

  if (loading) {
    return (
      <div className="w-full lg:w-1/2 h-[266px] flex items-center justify-center bg-white rounded-2xl outline outline-1 outline-neutral-200">
        <p className="text-sm text-neutral-600">Loading chart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-1/2 min-h-[266px]  flex items-center justify-center bg-white rounded-2xl outline outline-1 outline-neutral-200">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full  lg:w-1/2 min-h-[200px]  p-2 sm:p-2.5 bg-white rounded-lg sm:rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col gap-2 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-end h-7">
        <div className="relative px-1 sm:px-1.5 pb-1">
          <h2 className="text-xs sm:text-sm font-medium text-neutral-900">
            Order and Sales Overview
          </h2>
          <div className="absolute top-[18px] sm:top-[22px] left-0 h-0.5 w-24 sm:w-32 bg-neutral-300">
            <div className="absolute left-0 w-4 sm:w-5 h-0.5 bg-blue-500 blur-sm opacity-50" />
            <div className="absolute left-0.5 w-4 sm:w-5 h-0.5 bg-blue-900" />
          </div>
        </div>
        <div className="flex-1 relative h-1 ">
          <div className="absolute left-0 w-full h-[1px] bg-neutral-300"></div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-1 sm:p-1.5 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <YAxis
              tick={{ fontSize: 8, fill: "#999" }}
              tickFormatter={(value) => `${value / 1000}K`}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 8, fill: "#999" }}
              axisLine={false}
              tickLine={false}
              height={20}
            />
            <Tooltip
              contentStyle={{
                fontSize: "10px",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
              labelStyle={{
                color: "#666",
                fontSize: "10px",
              }}
              formatter={(value, name) =>
                name === "sales"
                  ? [`₦${value.toLocaleString()}`, "Sales"]
                  : [value, "Orders"]
              }
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#2196F3"
              strokeWidth={2}
              dot={{ r: 2, strokeWidth: 1, fill: "#2196F3" }}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#FF6B00"
              strokeWidth={2}
              dot={{ r: 2, strokeWidth: 1, fill: "#FF6B00" }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-3 sm:gap-4 mt-1">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <div className="w-2 sm:w-3 h-0.5 bg-[#2196F3] rounded-full"></div>
          <span className="text-[10px] sm:text-xs text-neutral-600">
            Orders
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <div className="w-2 sm:w-3 h-0.5 bg-[#FF6B00] rounded-full"></div>
          <span className="text-[10px] sm:text-xs text-neutral-600">Sales</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSalesOverview;

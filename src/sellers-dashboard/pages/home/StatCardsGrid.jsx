import React from "react";
import {
  FaShoppingCart,
  FaDollarSign,
  FaUndo,
  FaChartLine,
} from "react-icons/fa";
import StatCard from "../../components/StatCard";
import useSellerAnalytics from "../../../hooks/useSellerAnalytics";
import Loader from "../../../components/Loader";

const StatCardsGrid = () => {
  const { analytics, loading, error } = useSellerAnalytics();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center gap-2">
      <StatCard
        title="ORDERS"
        amount={analytics?.total_orders?.toLocaleString() || 0}
        percentage="+10"
        comparison="Compared to last month"
        icon={FaShoppingCart}
        iconBg="bg-primary"
      />
      <StatCard
        title="REVENUE"
        amount={`₦${analytics?.total_revenue?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`}
        percentage="+12"
        comparison="Compared to last month"
        icon={FaDollarSign}
        iconBg="bg-primary"
      />
      <StatCard
        title="RETURN ORDERS"
        amount={analytics?.return_orders?.toLocaleString()}
        percentage="-5"
        comparison="Compared to last month"
        icon={FaUndo}
        iconBg="bg-primary"
      />
      <StatCard
        title="GROWTH"
        amount="--"
        percentage="+18"
        comparison="Compared to last month"
        icon={FaChartLine}
        iconBg="bg-primary"
      />
    </div>
  );
};

export default StatCardsGrid;

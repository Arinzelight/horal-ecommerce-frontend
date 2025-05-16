import React from "react";
import {
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import StatCard from "../../components/StatCard";

const StatCardsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  justify-center gap-2">
      <StatCard
        title="TRANSACTIONS"
        amount="182"
        percentage="+45"
        comparison="Compared to Apr 2024"
        icon={FaChartLine}
        iconBg="bg-primary"
      />
      <StatCard
        title="REVENUE"
        amount="$12,500"
        percentage="+30"
        comparison="Compared to Apr 2024"
        icon={FaChartLine}
        iconBg="bg-primary"
      />
      <StatCard
        title="NEW USERS"
        amount="250"
        percentage="-22"
        comparison="Compared to Apr 2024"
        icon={FaChartLine}
        iconBg="bg-primary"
      />
      <StatCard
        title="GROWTH"
        amount="18%"
        percentage="+12"
        comparison="Compared to Apr 2024"
        icon={FaChartLine}
        iconBg="bg-primary"
      />
    </div>
  );
};

export default StatCardsGrid;

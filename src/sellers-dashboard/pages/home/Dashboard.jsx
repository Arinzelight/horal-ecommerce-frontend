import React from "react";
import SectionHeader from "../../components/SectionHeader";
import GreetingMessage from "./GreetingMessage";
import StatCardsGrid from "./StatCardsGrid";
import OrderSalesChart from "../../components/OrderSalesChart";
import SalesByCategory from "../../components/SalesByCategory";
import ProductTable from "../../components/ProductTable";

const Dashboard = () => {
  return (
    <div className="lg:max-w-full sm:max-w-[95vw] max-w-[90vw]  overflow-x-auto  w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-[...] overflow-hidden">
      <SectionHeader title="Dashboard" />
      <GreetingMessage
        greeting="Good morning Godly,"
        subtitle="Here’s what’s happening with your store today"
        dotColor="bg-blue-primary"
      />
      <div className="flex flex-col gap-5">
        <StatCardsGrid />
        <div className="flex gap-2 lg:flex-row flex-col ">
          <OrderSalesChart />
          <SalesByCategory />
        </div>
      </div>
      <div className="overflow-x-auto  sm:w-full">
        <ProductTable />
      </div>
    </div>
  );
};

export default Dashboard;

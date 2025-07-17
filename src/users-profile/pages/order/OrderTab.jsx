const OrderTabs = ({ activeTab, onTabChange, orderCounts }) => {
  const tabs = [
    { id: "ongoing", label: "ONGOING ORDERS", count: orderCounts.ongoing },
    {
      id: "delivered",
      label: "DELIVERED ORDERS",
      count: orderCounts.delivered,
    },
    {
      id: "cancelled",
      label: "CANCELLED ORDERS",
      count: orderCounts.cancelled,
    },
  ];

  return (
    <div className="mt-4 ">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-4 text-xs font-medium text-center border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-orange-500 text-secondary bg-orange-50"
                : "border-transparent text-neutrals-700 hover:text-gray-700 "
            }`}
          >
            {tab.label}
            {/* {tab.count > 0 && (
              <span
                className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            )} */}
          </button>
        ))}
      </div>
    </div>
  );
};
export default OrderTabs;

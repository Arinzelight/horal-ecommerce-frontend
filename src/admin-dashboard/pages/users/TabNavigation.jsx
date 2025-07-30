
const TabNavigation = ({ activeTab, onTabChange, userCounts }) => {
  const tabs = [
    {
      id: "allUsers",
      label: "All Users",
      count: userCounts.all,
    },
    {
      id: "sellers",
      label: "Sellers",
      count: userCounts.sellers,
    },
    {
      id: "admins",
      label: "Admins",
      count: userCounts.admins,
    },
  ];

  return (
    <div className=" mb-6">
      <div className="flex space-x-8 justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-4 pt-6 px-1 font-medium w-full ${
              activeTab === tab.id
                ? "text-secondary border-b-2 border-secondary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            
            <span>{tab.label}</span>
            <span
              className={`px-2 py-1 ml-2 text-xs rounded-full ${
                activeTab === tab.id
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default TabNavigation;
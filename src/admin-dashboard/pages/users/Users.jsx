import { useMemo, useState } from "react";
import { mockUsers } from "../../../data/mockUsers";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
import SearchHeader from "../../../sellers-dashboard/components/Search";
import TabNavigation from "./TabNavigation";
import UserTable from "./UsersTable";
import EmptyState from "../../../admin-dashboard/component/EmptyState";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [activeTab, setActiveTab] = useState("allUsers");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter users based on search and active tab
  const filteredUsers = useMemo(() => {
    let users = mockUsers;

    // Filter by tab
    if (activeTab === "sellers") {
      users = users.filter((user) => user.role === "seller");
    } else if (activeTab === "admins") {
      users = users.filter((user) => user.role === "admin");
    }

    // Filter by search
    if (searchQuery.trim()) {
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return users;
  }, [activeTab, searchQuery]);

  // Calculate user counts
  const userCounts = useMemo(
    () => ({
      all: mockUsers.length,
      sellers: mockUsers.filter((user) => user.role === "seller").length,
      admins: mockUsers.filter((user) => user.role === "admin").length,
    }),
    []
  );

  const handleUserClick = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "sellers":
        return "Sellers";
      case "admins":
        return "Admins";
      default:
        return "All Users";
    }
  };

  const getEmptyStateType = () => {
    if (searchQuery.trim()) return "search";
    return activeTab === "allUsers" ? "users" : activeTab;
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <SectionHeader
          title={getTabTitle()}
        />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userCounts={userCounts}
        />

        <SearchHeader
          searchPlaceholder="Search by name, email, or phone number"
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />

        {filteredUsers.length > 0 ? (
          <UserTable users={filteredUsers} onUserClick={handleUserClick} />
        ) : (
          <EmptyState
            type={getEmptyStateType()}
            
          />
        )}
      </div>
    </div>
  );
};

export default Users;
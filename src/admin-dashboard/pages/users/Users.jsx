import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
import SearchHeader from "../../../sellers-dashboard/components/Search";
import UserTable from "./UsersTable";
import {
  ActivateUserModal,
  DeactivateUserModal,
  BanUserModal,
} from "./UserActionModal";
import { mockUsers } from "../../../data/mockUsers";

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.phone.includes(query)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleFilterChange = (filterId, value) => {
    let filtered = users;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.includes(searchQuery)
      );
    }

    if (filterId === "role" && value !== "all") {
      filtered = filtered.filter(
        (user) => user.role.toLowerCase() === value.toLowerCase()
      );
    }

    if (filterId === "status" && value !== "all") {
      filtered = filtered.filter(
        (user) => user.status.toLowerCase() === value.toLowerCase()
      );
    }

    setFilteredUsers(filtered);
  };

  const handleUserAction = (action, user) => {
    setSelectedUser(user);

    if (action === "view") {
      navigate(`/admin/users/${user.id}`);
      return;
    }

    setActiveModal(action);
  };

  const handleActivateUser = (user, options) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === user.id ? { ...u, status: "Active" } : u))
    );
    setFilteredUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === user.id ? { ...u, status: "Active" } : u))
    );
    console.log("Activating user:", user.name, "Options:", options);
  };

  const handleDeactivateUser = (user, options) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, status: "Suspended" } : u
      )
    );
    setFilteredUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, status: "Suspended" } : u
      )
    );
    console.log("Deactivating user:", user.name, "Options:", options);
  };

  const handleBanUser = (user, options) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === user.id ? { ...u, status: "Banned" } : u))
    );
    setFilteredUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === user.id ? { ...u, status: "Banned" } : u))
    );
    console.log("Banning user:", user.name, "Options:", options);
  };

  const filterOptions = [
    {
      title: "Role",
      options: [
        { id: "all", label: "All Roles" },
        { id: "buyer", label: "Buyer" },
        { id: "seller", label: "Seller" },
      ],
      defaultValue: "all",
    },
    {
      title: "Status",
      options: [
        { id: "all", label: "All Status" },
        { id: "active", label: "Active" },
        { id: "suspended", label: "Suspended" },
        { id: "banned", label: "Banned" },
      ],
      defaultValue: "all",
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-6 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-sm overflow-hidden">
      <SectionHeader title="All Users" />

      <SearchHeader
        searchPlaceholder="Search by name, email or phone number"
        filterOptions={filterOptions}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      <UserTable users={filteredUsers} onUserAction={handleUserAction} />

      {/* Modals */}
      <ActivateUserModal
        isOpen={activeModal === "activate"}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onConfirm={handleActivateUser}
      />

      <DeactivateUserModal
        isOpen={activeModal === "deactivate"}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onConfirm={handleDeactivateUser}
      />

      <BanUserModal
        isOpen={activeModal === "ban"}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onConfirm={handleBanUser}
      />
    </div>
  );
}

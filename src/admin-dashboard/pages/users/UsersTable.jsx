import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { FaEye, FaUserCheck, FaUserTimes, FaBan } from "react-icons/fa";
import StatusBadge from "../../../sellers-dashboard/pages/shop/shop-orders/StatusBadge";
import Pagination from "../../../components/Pagination";

const UserTable = ({ users, onUserAction }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const menuRefs = useRef({});

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const toggleMenu = (e, userId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const handleAction = (e, action, user) => {
    e.stopPropagation();
    onUserAction(action, user);
    setActiveMenu(null);
  };

  const handleRowClick = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu !== null) {
        const activeMenuRef = menuRefs.current[activeMenu];
        if (activeMenuRef && !activeMenuRef.contains(event.target)) {
          setActiveMenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        <table className="w-full bg-white">
          <thead className="">
            <tr className="bg-neutral-200 text-neutral-600 text-sm leading-normal">
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentItems.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.phone}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.role}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-6 py-4  whitespace-nowrap text-right text-sm font-medium relative">
                  <button
                    onClick={(e) => toggleMenu(e, user.id)}
                    className="p-2 bg-neutral-100 rounded border border-neutral-300"
                  >
                    <IoMdMore className="h-5 w-5" />
                  </button>

                  {activeMenu === user.id && (
                    <div
                      ref={(el) => (menuRefs.current[user.id] = el)}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                    >
                      <div className="py-1">
                        <button
                          onClick={(e) => handleAction(e, "view", user)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FaEye className="h-4 w-4 mr-2" />
                          View User
                        </button>
                        {user.status !== "Active" && (
                          <button
                            onClick={(e) => handleAction(e, "activate", user)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaUserCheck className="h-4 w-4 mr-2" />
                            Activate User
                          </button>
                        )}
                        {user.status === "Active" && (
                          <button
                            onClick={(e) => handleAction(e, "deactivate", user)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaUserTimes className="h-4 w-4 mr-2" />
                            Deactivate User
                          </button>
                        )}
                        <button
                          onClick={(e) => handleAction(e, "ban", user)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <FaBan className="h-4 w-4 mr-2" />
                          Ban User
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex  sm:flex-row items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-600 whitespace-nowrap">
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, users.length)} of {users.length}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;

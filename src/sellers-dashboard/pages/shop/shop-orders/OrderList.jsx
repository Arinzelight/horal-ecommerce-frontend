import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { FaEye, FaTrash } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import Pagination from "../../../../components/Pagination"


const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      isLoggedIn: true,
      userRole: "buyer", // or "buyer"
    });
  }, []);

  return { user };
};
export default function OrderList({ orders, selectedStatus }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRefs = useRef({});

  // Filter orders based on selected status
  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter(
          (order) => order.status.toLowerCase() === selectedStatus.toLowerCase()
        );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const toggleMenu = (e, orderId) => {
    e.stopPropagation(); // Prevent row click when clicking menu
    setActiveMenu(activeMenu === orderId ? null : orderId);
  };

  const handleViewOrder = (e, orderId) => {
    e.stopPropagation(); // Prevent row click when clicking menu item
    const basePath = user?.userRole === "seller" ? "/sellers-dashboard/shop-order" : "/users-dashboard/orders";

    navigate(`${basePath}/${orderId}`);
    
    setActiveMenu(null);
  };

  const handleDeleteOrder = (e, orderId) => {
    e.stopPropagation(); // Prevent row click when clicking menu item
    console.log(`Delete order: ${orderId}`);
    setActiveMenu(null);
  };

  const handleRowClick = (orderId) => {
    const basePath =
      user?.userRole === "seller"
        ? "/sellers-dashboard/shop-order"
        : "/users-dashboard/orders";
    navigate(`${basePath}/${orderId}`);
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

  // Get header text based on selected status
  const getHeaderText = () => {
    switch (selectedStatus) {
      case "all":
        return "ALL ORDERS";
      case "pending":
        return "PENDING ORDERS";
      case "processing":
        return "PROCESSING ORDERS";
      case "in transit":
        return "IN TRANSIT ORDERS";
      case "delivered":
        return "DELIVERED ORDERS";
      case "cancelled":
        return "CANCELLED ORDERS";
      default:
        return "ALL ORDERS";
    }
  };

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 mb-4">
        {getHeaderText()}
      </h2>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-neutral-200 text-neutral-600 text-sm leading-normal">
                {user?.userRole === "seller" && (
                  <th className="py-3 px-4 text-left">Items</th>
                )}

                {user?.userRole === "seller" && (
                  <th className="py-3 px-4 text-left">Buyer</th>
                )}
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Order Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left w-10">Options</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {currentItems.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(order.orderId)}
                >
                  {user?.userRole === "seller" && (
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={
                            order.productImage ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={order.productName}
                          className="w-10 h-10 object-cover mr-3"
                        />
                        <span>{order.productName}</span>
                      </div>
                    </td>
                  )}

                  {user?.userRole === "seller" && (
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={
                            order.buyerAvatar ||
                            "/placeholder.svg?height=30&width=30"
                          }
                          alt={order.buyerName}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        <span>{order.buyerName}</span>
                      </div>
                    </td>
                  )}
                  <td className="py-3 px-4">#{order.orderId}</td>
                  <td className="py-3 px-4">₦{order.price.toLocaleString()}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-4 relative">
                    <button
                      onClick={(e) => toggleMenu(e, order.orderId)}
                      className="p-2 bg-neutral-100 rounded border border-neutral-300"
                    >
                      <IoMdMore className="h-5 w-5" />
                    </button>

                    {activeMenu === order.orderId && (
                      <div
                        ref={(el) => (menuRefs.current[order.orderId] = el)}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                      >
                        <div className="py-1">
                          <button
                            onClick={(e) => handleViewOrder(e, order.orderId)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaEye className="h-4 w-4 mr-2" />
                            View Order
                          </button>
                          <button
                            onClick={(e) => handleDeleteOrder(e, order.orderId)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <FaTrash className="h-4 w-4 mr-2" />
                            Delete Order
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-600 whitespace-nowrap">
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
            {filteredOrders.length}
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
}

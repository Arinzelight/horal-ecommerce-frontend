import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { FaEye, FaTrash } from "react-icons/fa";
import StatusBadge from "./StatusBadge";

export default function OrderList({ orders, selectedStatus }) {
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
    navigate(`/sellers-dashboard/shop-order/${orderId}`);
    setActiveMenu(null);
  };

  const handleDeleteOrder = (e, orderId) => {
    e.stopPropagation(); // Prevent row click when clicking menu item
    console.log(`Delete order: ${orderId}`);
    setActiveMenu(null);
  };

  const handleRowClick = (orderId) => {
    navigate(`/sellers-dashboard/shop-order/${orderId}`);
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
              <tr className="bg-neutral-200 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Buyer</th>
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
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(order.id)}
                >
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
                  <td className="py-3 px-4">{order.orderId}</td>
                  <td className="py-3 px-4">₦{order.price.toLocaleString()}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-4 relative">
                    <button
                      onClick={(e) => toggleMenu(e, order.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <IoMdMore className="h-5 w-5" />
                    </button>

                    {activeMenu === order.id && (
                      <div
                        ref={(el) => (menuRefs.current[order.id] = el)}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                      >
                        <div className="py-1">
                          <button
                            onClick={(e) => handleViewOrder(e, order.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaEye className="h-4 w-4 mr-2" />
                            View Order
                          </button>
                          <button
                            onClick={(e) => handleDeleteOrder(e, order.id)}
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
        <div className="flex items-center justify-between mt-4 text-sm">
          <div>
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
            {filteredOrders.length}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md mr-1 bg-gray-200 disabled:opacity-50"
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPage(pageNum);
                  }}
                  className={`px-3 py-1 rounded-md mx-1 ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="mx-1">...</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPage(totalPages);
                  }}
                  className={`px-3 py-1 rounded-md mx-1 bg-gray-200`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage(Math.min(totalPages, currentPage + 1));
              }}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md ml-1 bg-gray-200 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { FaEye, FaTrash } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import Pagination from "../../../../components/Pagination"
import formatDate from "../../../../utils/formatDate";



export default function OrderList({ orders, selectedStatus, isSeller = true}) {
  
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
    e.stopPropagation();
    const path = isSeller ? "/sellers-dashboard/shop-order" : "/admin/orders";
    navigate(`${path}/${orderId}`);
    setActiveMenu(null);
  };

  const handleRowClick = (orderId) => {
    const path = isSeller ? "/sellers-dashboard/shop-order" : "/admin/orders";
    navigate(`${path}/${orderId}`);
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
      case "paid":
        return "PAID ORDERS";
      case "shipped":
        return "SHIPPED ORDERS";
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
                {isSeller && <th className="py-3 px-4 text-left">Item</th>}
                <th className="py-3 px-4 text-left">Order ID</th>

                <th className="py-3 px-4 text-left">Buyer</th>
                {!isSeller && <th className="py-3 px-4 text-left">Seller</th>}
                {!isSeller && <th className="py-3 px-4 text-left">No of Products</th>}
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Order Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left w-10">Options</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {currentItems.map((order) => (
                <tr
                  key={order?.order_id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(order?.order_id)}
                >
                  {isSeller && (
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={
                            order?.image ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={order?.title}
                          className="w-10 h-10 object-cover mr-3"
                        />
                        <span>{order?.title}</span>
                      </div>
                    </td>
                  )}
                  <td className="py-3 px-4">#{order?.order_id}</td>

                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {/* <img
                          src={
                            order.buyerAvatar ||
                            "/placeholder.svg?height=30&width=30"
                          }
                          alt={order.buyerName}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        /> */}
                      <span>{order?.buyer}</span>
                    </div>
                  </td>

                  {!isSeller && (
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span>{order?.sellerName}</span>
                      </div>
                    </td>
                  )}
                  {!isSeller && (
                    <td className="py-3 px-4">{order?.itemCount}</td>
                  )}
                  <td className="py-3 px-4">
                    ₦{order?.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{formatDate(order?.order_date)}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={order?.status} />
                  </td>
                  <td className="py-3 px-4 relative">
                    <button
                      onClick={(e) => handleViewOrder(e, order?.order_id)}
                      className="text-primary hover:underline"
                    >
                      View
                    </button>
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

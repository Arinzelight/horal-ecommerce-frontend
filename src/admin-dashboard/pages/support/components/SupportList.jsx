import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { FaEye, FaUserPlus, FaClock } from "react-icons/fa";
import Pagination from "../../../../components/Pagination";
import formatDate from "../../../../utils/formatDate";
import StatusBadge from "../../../../sellers-dashboard/pages/shop/shop-orders/StatusBadge";
import AssignTicketModal from "./AssignTicketModal";
import { toast } from "../../../../components/toast";
import useSupport from "../../../../hooks/useSupport";

const SupportList = ({ tickets, selectedStatus }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRefs = useRef({});
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { fetchTickets, updateTicketStatus } = useSupport();

  const toggleMenu = (e, ticketId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === ticketId ? null : ticketId);
  };

  // Filter tickets based on selected status
  const filteredTickets =
    selectedStatus === "all"
      ? tickets
      : tickets?.filter((ticket) => {
          const ticketStatus =
            ticket.ticket_data?.status || ticket.ticket_state;
          return ticketStatus?.toLowerCase() === selectedStatus.toLowerCase();
        });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTickets?.length / itemsPerPage);

  const handleViewTicket = (e, ticketId) => {
    e.stopPropagation();
    navigate(`/admin/support/${ticketId}`);
    setActiveMenu(null);
  };

  const handleRowClick = (ticketId) => {
    navigate(`/admin/support/${ticketId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle assign ticket click
  const handleAssignTicket = (e, ticket) => {
    e.stopPropagation();
    setSelectedTicket(ticket);
    setIsAssignModalOpen(true);
    setActiveMenu(null);
  };

  // Handle mark as processing
  const handleMarkAsProcessing = async (e, ticket) => {
    e.stopPropagation();
    setActiveMenu(null);

    try {
      await updateTicketStatus({
        ticketId: ticket.id,
        statusData: { status: "processing" },
      });
      toast.success("Ticket marked as processing");
      // Refresh tickets to get updated data
      fetchTickets();
    } catch (error) {
      toast.error("Failed to update ticket status");
      console.error("Error updating ticket status:", error);
    }
  };

  // Handle successful ticket assignment
  const handleAssignSuccess = () => {
    toast.success("Ticket assigned successfully");
    fetchTickets();
  };

  // Handle assign modal close
  const handleAssignModalClose = () => {
    setIsAssignModalOpen(false);
    setSelectedTicket(null);
  };

  // Check if ticket can be marked as processing
  const canMarkAsProcessing = (ticket) => {
    const currentStatus = ticket?.ticket_data?.status?.toLowerCase();
    return (
      currentStatus !== "processing" &&
      currentStatus !== "completed" &&
      currentStatus !== "resolved" &&
      currentStatus !== "unresolved" &&
      currentStatus !== "accepted" &&
      currentStatus !== "rejected"
    );
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
        return "ALL TICKETS";
      case "processing":
        return "PROCESSING TICKETS";
      case "completed":
        return "COMPLETED TICKETS";
      case "resolved":
        return "RESOLVED TICKETS";
      case "unresolved":
        return "UNRESOLVED TICKETS";
      case "pending":
        return "PENDING TICKETS";
      default:
        return "ALL TICKETS";
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
                <th className="py-3 px-4 text-left text-xs">Ticket ID</th>
                <th className="py-3 px-4 text-left text-xs ">Ticket Type</th>
                <th className="py-3 px-4 text-left text-xs">Ticket State</th>
                <th className="py-3 px-4 text-left text-xs">User Email</th>
                <th className="py-3 px-4 text-left text-xs">Subject</th>
                <th className="py-3 px-4 text-left text-xs">Date Submitted</th>
                <th className="py-3 px-4 text-left text-xs">Status</th>
                <th className="py-3 px-4 text-left text-xs">Options</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs">
              {currentItems?.map((ticket) => (
                <tr
                  key={ticket?.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(ticket?.id)}
                >
                  <td className="py-3 px-4 font-bold">
                    #{ticket?.ticket_data?.reference || ticket?.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span>{ticket?.ticket_type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span>{ticket?.ticket_state}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{ticket?.ticket_data?.email}</td>
                  <td className="py-3 px-4">
                    {ticket?.ticket_data?.subject || ticket?.ticket_data.reason}
                  </td>
                  <td className="py-3 px-4">
                    {formatDate(ticket?.ticket_data?.created_at)}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={ticket?.ticket_data?.status} />
                  </td>
                  <td className="py-3 px-4 relative text-sm">
                    <button
                      onClick={(e) => toggleMenu(e, ticket?.id)}
                      className="bg-neutral-100 p-1 rounded border border-neutral-300"
                    >
                      <IoMdMore className="w-5 h-5" />
                    </button>
                    {activeMenu === ticket?.id && (
                      <div
                        ref={(el) => (menuRefs.current[ticket?.id] = el)}
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10"
                      >
                        <button
                          onClick={(e) => handleViewTicket(e, ticket?.id)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FaEye /> View Ticket
                        </button>

                        <button
                          onClick={(e) => handleAssignTicket(e, ticket)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-blue-600"
                        >
                          <FaUserPlus /> Assign Ticket
                        </button>

                        {canMarkAsProcessing(ticket) && (
                          <button
                            onClick={(e) => handleMarkAsProcessing(e, ticket)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-orange-600"
                          >
                            <FaClock /> Mark as Processing
                          </button>
                        )}
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
            {Math.min(indexOfLastItem, filteredTickets.length)} of{" "}
            {filteredTickets.length}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* ADDED: Assign Ticket Modal */}
      <AssignTicketModal
        isOpen={isAssignModalOpen}
        onClose={handleAssignModalClose}
        onSuccess={handleAssignSuccess}
        ticketId={selectedTicket?.id}
        ticketData={selectedTicket}
      />
    </div>
  );
};

export default SupportList;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSupport from "../../../hooks/useSupport";
import { toast } from "../../../components/toast";
import InitialLoader from "../../../components/InitialLoader";
import AssignmentStatus from "./components/ticket-details/AssignmentStatus";
import ReturnItemDetails from "./components/ticket-details/ReturnItem";
import CustomerDetails from "./components/ticket-details/CUstomerDetails";
import TicketMessage from "./components/ticket-details/TicketMessage";
import TicketSidebar from "./components/ticket-details/TicketSidebar";
import ReplyModal from "./components/ticket-details/ReplyModal";
import TicketHeader from "./components/ticket-details/TicketHeader";
import TicketMessages from "./components/ticket-details/TicketMessages";
import ConfirmationDialog from "./components/ticket-details/COnfirmationDialog";
import { getConfirmationContent, needsConfirmation } from "./utils/confirmation-content";
import { set } from "date-fns";
const TicketDetailsPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [assignedAdmin, setAssignedAdmin] = useState("");
  const [messages, setMessages] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);

  const {
    fetchTicketDetails,
    respondToTicket,
    fetchTicketMessages,
    updateSupportTicketStatus,
    markReturnTicketAsRejected,
    markReturnTicketAsApproved,
    loading,
    error,
  } = useSupport();

  // Fetch ticket details on component mount
  useEffect(() => {
    const loadTicketDetails = async () => {
      try {
        const details = await fetchTicketDetails(ticketId);
        setTicketDetails(details);
        setSelectedStatus(details.ticket_data?.status || "pending");
        setAssignedAdmin(details.assigned_to?.email || "");

        await loadTicketMessages(
          details?.ticket_data?.id,
          details?.ticket_type
        );
      } catch (error) {
        console.error("Error loading ticket details:", error);
      }
    };

    const loadTicketMessages = async (ticketDataId, ticketType) => {
      try {
        setMessagesLoading(true);
        const ticketMessages = await fetchTicketMessages(
          ticketDataId,
          ticketType
        );
        setMessages(ticketMessages || []);
      } catch (error) {
        setMessages([]);
      } finally {
        setMessagesLoading(false);
      }
    };

    if (ticketId) {
      loadTicketDetails();
    }
  }, [ticketId]);

  // Update ticket status by type
  const updateTicketStatusByType = async (status) => {
    const ticketDataId = ticketDetails?.ticket_data?.id;

    if (!ticketDataId) {
      throw new Error("Missing ticket ID");
    }

    const isReturn = ticketDetails?.ticket_type === "returns";

    if (isReturn) {
      switch (status) {
        case "approved":
          return await markReturnTicketAsApproved(ticketDataId);
        case "rejected":
          return await markReturnTicketAsRejected(ticketDataId);
        default:
          throw new Error("Invalid status for return ticket");
      }
    } else {
      if (status === "resolved" || status === "unresolved") {
        return await updateSupportTicketStatus({
          ticketId: ticketDataId,
          statusData: { status },
        });
      } else {
        throw new Error("Invalid status for support ticket");
      }
    }
  };

  // Handle status change with confirmation
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    // If no status selected or same as current, do nothing
    if (!newStatus || newStatus === selectedStatus) {
      return;
    }

    const isReturn = ticketDetails?.ticket_type === "returns";

    // Check if this status change needs confirmation
    if (needsConfirmation(newStatus, isReturn)) {
      // Store the pending change and show confirmation dialog
      setPendingStatusChange(newStatus);
      setShowConfirmDialog(true);
     
    } else {
      // For statuses that don't need confirmation, proceed directly
      await performStatusUpdate(newStatus);
    }
  };

  // Perform the actual status update
  const performStatusUpdate = async (newStatus) => {
    setSelectedStatus(newStatus);

    try {
      const updatedTicket = await updateTicketStatusByType(newStatus);

      // Update local state
      if (updatedTicket) {
        setTicketDetails((prevDetails) => ({
          ...prevDetails,
          ticket_data: {
            ...prevDetails.ticket_data,
            status: newStatus,
          },
        }));
      }

      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating ticket status:", error);
      // Revert the status selection on error
      setSelectedStatus(ticketDetails.ticket_data?.status || "pending");
      toast.error(error.message || "Failed to update status. Please try again.");
    }
  };

  // Handle confirmation dialog confirm
  const handleConfirmStatusChange = async () => {
    setShowConfirmDialog(false);

    if (pendingStatusChange) {
      await performStatusUpdate(pendingStatusChange);
      setPendingStatusChange(null);
    }
  };

  // Handle confirmation dialog cancel
  const handleCancelStatusChange = () => {
    setShowConfirmDialog(false);
    setPendingStatusChange(null);
  };
const handleReplySubmit = async () => {
  if (!replyMessage.trim()) {
    toast.error("Please enter a reply message");
    return;
  }

  const responseId = ticketDetails?.ticket_data?.id;
  const ticketType = ticketDetails?.ticket_type;

  if (!responseId) {
    throw new Error("Unable to send reply: missing response ID");
  }

  try {
    await respondToTicket(
      responseId,
      {
        body: replyMessage.trim(),
      },
      ticketType
    );

    // Close modal and reset message
    setShowReplyModal(false);
    setReplyMessage("");

    // Show success message
    toast.success("Reply sent successfully!");

    // ✅ FIXED: Refresh messages properly
    const refreshedMessages = await fetchTicketMessages(
      ticketDetails.ticket_data.id,
      ticketDetails.ticket_type
    );
    setMessages(refreshedMessages || []);
  } catch (error) {
    console.error("Error sending reply:", error);
    toast.error("Failed to send reply. Please try again.");
  }
};

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">
          <InitialLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!ticketDetails || !ticketDetails.ticket_data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Ticket not found</div>
      </div>
    );
  }

   const handleViewMessages = () => {
     navigate(`/admin/support/tickets/${ticketId}/messages`);
   };

  const { ticket_type } = ticketDetails;
  const isReturnTicket = ticket_type === "returns";

  // Get confirmation content for the dialog
  const confirmationContent = pendingStatusChange
    ? getConfirmationContent(pendingStatusChange, isReturnTicket)
    : null;

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <TicketHeader
        onBackClick={handleBackClick}
        ticketDetails={ticketDetails}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Status */}
          <AssignmentStatus ticketDetails={ticketDetails} />

          {/* Return Item Details - Only for return tickets */}
          {isReturnTicket && (
            <ReturnItemDetails ticketDetails={ticketDetails} />
          )}

          {/* Customer Details */}
          <CustomerDetails ticketDetails={ticketDetails} />

          {/* Ticket Message */}
          <TicketMessage ticketDetails={ticketDetails} />

          {/* <TicketMessages messages={messages} loading={messagesLoading} /> */}

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Ticket Messages & Replies
                  </h2>
                  <p className="text-gray-600 text-sm">
                    View all messages and replies for this ticket
                  </p>
                </div>
                <button
                  onClick={handleViewMessages}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <span>See Ticket Messages</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <TicketSidebar
          ticketDetails={ticketDetails}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          assignedAdmin={assignedAdmin}
          onAssignedAdminChange={setAssignedAdmin}
          onReplyClick={() => setShowReplyModal(true)}
          isReturnTicket={isReturnTicket}
        />
      </div>

      {/* Reply Modal */}
      <ReplyModal
        isOpen={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        replyMessage={replyMessage}
        onReplyMessageChange={setReplyMessage}
        onSubmit={handleReplySubmit}
      />

      {/* Confirmation Dialog */}
      {confirmationContent && (
        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={handleCancelStatusChange}
          onConfirm={handleConfirmStatusChange}
          title={confirmationContent.title}
          message={confirmationContent.message}
          confirmText={confirmationContent.confirmText}
          isDestructive={confirmationContent.isDestructive}
        />
      )}
    </div>
  );
};

export default TicketDetailsPage;

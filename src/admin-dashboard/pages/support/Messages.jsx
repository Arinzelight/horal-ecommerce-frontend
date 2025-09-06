import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaReply } from "react-icons/fa";
import useSupport from "../../../hooks/useSupport";
import formatDate from "../../../utils/formatDate";
import InitialLoader from "../../../components/InitialLoader";
import TicketMessages from "./components/ticket-details/TicketMessages";
import ReplyModal from "./components/ticket-details/ReplyModal";
import { toast } from "../../../components/toast";

const TicketMessagesPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const { fetchTicketDetails, fetchTicketMessages, respondToTicket, loading, error } =
    useSupport();

  useEffect(() => {
    const loadTicketData = async () => {
      try {
        // First fetch ticket details
        const details = await fetchTicketDetails(ticketId);
        setTicketDetails(details);

        // Then fetch messages using ticket_data.id
        await loadTicketMessages(details.ticket_data?.id, details.ticket_type);
      } catch (error) {
        console.error("Error loading ticket data:", error);
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
        console.error("Error loading ticket messages:", error);
        setMessages([]);
      } finally {
        setMessagesLoading(false);
      }
    };

    if (ticketId) {
      loadTicketData();
    }
  }, [ticketId]);

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

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "requested":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "assigned":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTicketTypeBadgeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "returns":
        return "bg-red-100 text-red-800 border-red-200";
      case "support":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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

  const { ticket_data, ticket_type } = ticketDetails;

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-6 justify-start sm:px-8 px-4 py-4 bg-neutral-50">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/admin/support/${ticketId}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                <span>Back to Ticket Details</span>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Date Submitted: {formatDate(ticket_data?.created_at)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Messages - TICKET #: {ticket_data?.reference}
              </h1>
              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getTicketTypeBadgeColor(
                    ticket_type
                  )}`}
                >
                  {ticket_type?.toUpperCase()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(
                    ticket_data?.status
                  )}`}
                >
                  {ticket_data?.status?.toUpperCase() || "PENDING"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowReplyModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaReply className="w-4 h-4" />
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-1">
        <TicketMessages messages={messages} loading={messagesLoading} />
      </div>

      {/* Reply Modal */}
      <ReplyModal
        isOpen={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        replyMessage={replyMessage}
        onReplyMessageChange={setReplyMessage}
        onSubmit={handleReplySubmit}
      />
    </div>
  );
};

export default TicketMessagesPage;



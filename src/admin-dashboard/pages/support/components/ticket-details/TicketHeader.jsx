import { FaArrowLeft } from "react-icons/fa";
import formatDate from "../../../../../utils/formatDate";

const TicketHeader = ({ onBackClick, ticketDetails }) => {
  const { ticket_data, ticket_type, ticket_state } = ticketDetails;
  const isReturnTicket = ticket_type === "returns";

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


  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackClick}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Support</span>
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Date Submitted: {formatDate(ticket_data?.created_at)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {isReturnTicket
                ? `RETURN #: ${ticket_data?.reference}`
                : `TICKET #: ${ticket_data?.reference || ticketDetails.id}`}
            </h1>
            <div className="flex gap-2">
              
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(
                  ticket_data?.status || ticket_state
                )}`}
              >
                {(ticket_data?.status || ticket_state)?.toUpperCase() ||
                  "PENDING"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;

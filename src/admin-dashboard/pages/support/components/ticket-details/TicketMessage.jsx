import { FaUser } from "react-icons/fa";
import formatDate from "../../../../../utils/formatDate";

const TicketMessage = ({ ticketDetails }) => {
  const { ticket_data, ticket_type } = ticketDetails;
  const isReturnTicket = ticket_type === "returns";

  // Only show if it's not a return ticket OR if there's a subject/body
  if (isReturnTicket && !ticket_data?.subject && !ticket_data?.body) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {isReturnTicket ? "Additional Message" : "Ticket Issue"}
        </h2>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <FaUser className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">
                {ticket_data?.customer?.full_name || "Customer"}
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(ticket_data?.created_at)}
              </span>
            </div>
            {ticket_data?.subject && (
              <div className="mb-3">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {ticket_data.subject}
                </h3>
              </div>
            )}
            {ticket_data?.body && (
              <p className="text-gray-700 whitespace-pre-wrap">
                {ticket_data.body}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketMessage;

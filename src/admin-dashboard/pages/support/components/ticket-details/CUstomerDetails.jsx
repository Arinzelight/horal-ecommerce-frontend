import { FaUser, FaEnvelope, FaPhone, FaCalendar } from "react-icons/fa";
import formatDate from "../../../../../utils/formatDate";

const CustomerDetails = ({ ticketDetails }) => {
  const { ticket_data } = ticketDetails;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Customer Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FaUser className="w-4 h-4 text-gray-400" />
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="font-medium">
                {ticket_data?.customer?.full_name || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="w-4 h-4 text-gray-400" />
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{ticket_data?.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone className="w-4 h-4 text-gray-400" />
            <div>
              <label className="text-sm text-gray-500">Phone Number</label>
              <p className="font-medium">
                {ticket_data?.customer?.phone_number || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendar className="w-4 h-4 text-gray-400" />
            <div>
              <label className="text-sm text-gray-500">Date Issued</label>
              <p className="font-medium">
                {formatDate(ticket_data?.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;

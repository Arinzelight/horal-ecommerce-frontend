import formatDate from "../../../../../utils/formatDate";
const TicketSidebar = ({
  ticketDetails,
  selectedStatus,
  onStatusChange,
  assignedAdmin,
  onAssignedAdminChange,
  onReplyClick,
  isReturnTicket,
}) => {
  const { ticket_data, ticket_type, ticket_state, assigned_to } = ticketDetails;

  const getReturnStatusOptions = () => [
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const getSupportStatusOptions = () => [
    { value: "resolved", label: "Resolved" },
    { value: "unresolved", label: "Unresolved" },
  ];

  // Get the appropriate status options based on ticket type
  const getStatusOptions = () => {
    if (isReturnTicket) {
      return getReturnStatusOptions();
    } else {
      return getSupportStatusOptions();
    }
  };

  const statusOptions = getStatusOptions();

  return (
    <div className="space-y-6">
      {/* Assign To */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Assign To *
          </h3>
          <input
            type="email"
            value={assignedAdmin}
            onChange={(e) => onAssignedAdminChange(e.target.value)}
            placeholder="Enter admin email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {assigned_to && (
            <div className="mt-2 text-xs text-gray-500">
              Currently assigned to: {assigned_to.name}
            </div>
          )}
        </div>
      </div>

      {/* Ticket Status */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Ticket Status *
          </h3>
          <select
            value={selectedStatus}
            onChange={onStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Status info helper text */}
          <div className="mt-2 text-xs text-gray-500">
            {isReturnTicket
              ? "Return tickets: Pending → Resolved/Unresolved"
              : "Support tickets: Pending → Processing → Completed"}
          </div>
        </div>
      </div>

      {/* Ticket Information Summary */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Ticket Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span className="font-medium capitalize">{ticket_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">State:</span>
              <span className="font-medium capitalize">{ticket_state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Created:</span>
              <span className="font-medium">
                {formatDate(ticket_data?.created_at)}
              </span>
            </div>
            {ticketDetails.updated_at && (
              <div className="flex justify-between">
                <span className="text-gray-500">Updated:</span>
                <span className="font-medium">
                  {formatDate(ticketDetails.updated_at)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 space-y-3">
          <button
            onClick={onReplyClick}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Reply Ticket
          </button>
          <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSidebar;

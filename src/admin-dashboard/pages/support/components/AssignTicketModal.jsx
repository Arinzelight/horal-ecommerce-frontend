import { useState, useEffect } from "react";
import useSupport from "../../../../hooks/useSupport";

const AssignTicketModal = ({
  isOpen,
  onClose,
  onSuccess,
  ticketId,
  ticketData,
}) => {
  const { getTeamMembers, assignTicket, loading, error } = useSupport();
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [formError, setFormError] = useState("");

  // Fetch team members when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchTeamMembersData();
      setSelectedTeamMemberId("");
      setFormError("");
    }
  }, [isOpen]);

  const fetchTeamMembersData = async () => {
    try {
      const members = await getTeamMembers();
      setTeamMembers(members || []);
    } catch (err) {
      setFormError("Failed to fetch team members");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!selectedTeamMemberId) {
      setFormError("Please select a team member");
      return;
    }

    try {
      const result = await assignTicket(ticketId, selectedTeamMemberId);

      if (result) {
        onSuccess && onSuccess(result);
        onClose();
        setSelectedTeamMemberId("");
      }
    } catch (err) {
      // Handle specific error format 
      const errorData = err.response?.data;
      let errorMessage = "Failed to assign ticket";

      if (errorData?.assigned_to && Array.isArray(errorData.assigned_to)) {
        errorMessage = errorData.assigned_to[0];
      } else if (
        errorData?.assigned_to_id &&
        Array.isArray(errorData.assigned_to_id)
      ) {
        errorMessage = errorData.assigned_to_id[0];
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setFormError(errorMessage);
    }
  };

  const handleClose = () => {
    setSelectedTeamMemberId("");
    setFormError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assign Ticket</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Ticket Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Ticket ID:</span> #
            {ticketData?.ticket_data?.reference || ticketId}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Subject:</span>{" "}
            {ticketData?.ticket_data?.subject ||
              ticketData?.ticket_data?.reason ||
              "N/A"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="team-member-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Team Member
            </label>
            <select
              id="team-member-select"
              value={selectedTeamMemberId}
              onChange={(e) => setSelectedTeamMemberId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              required
            >
              <option value="">Select a team member...</option>
              {teamMembers.map((member) => (
                <option key={member.team} value={member.team}>
                  {member.name} ({member.email}){member.is_lead && " - Lead"}
                </option>
              ))}
            </select>
          </div>

          {/* Display errors */}
          {(formError || error) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError || error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !selectedTeamMemberId}
            >
              {loading ? "Assigning..." : "Assign Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTicketModal;

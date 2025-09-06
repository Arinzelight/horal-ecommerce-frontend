import { FaUser, FaUserCheck, FaUserTimes } from "react-icons/fa";
import formatDate from "../../../../../utils/formatDate";

const AssignmentStatus = ({ ticketDetails }) => {
  const { assigned_to } = ticketDetails;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          {assigned_to ? (
            <FaUserCheck className="w-5 h-5 text-green-600" />
          ) : (
            <FaUserTimes className="w-5 h-5 text-red-600" />
          )}
          Assignment Status
        </h2>
        {assigned_to ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaUser className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 mb-1">
                  Assigned to:
                </h3>
                <p className="text-green-700 font-medium">{assigned_to.name}</p>
                <p className="text-green-600 text-sm">{assigned_to.email}</p>
                <div className="mt-2 text-xs text-green-600">
                  Assigned on: {formatDate(ticketDetails.assigned_at)}
                </div>
                <div className="mt-1 flex gap-4 text-xs text-green-600">
                  <span>Current tickets: {assigned_to.current_tickets}</span>
                  <span>Completed: {assigned_to.completed_tickets}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaUserTimes className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Not Assigned Yet</h3>
                <p className="text-red-600 text-sm">
                  This ticket has not been assigned to any team member.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentStatus;

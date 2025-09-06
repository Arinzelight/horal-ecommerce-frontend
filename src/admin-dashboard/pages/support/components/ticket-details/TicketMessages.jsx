import React from "react";
import { FaUser, FaUserTie, FaPaperclip } from "react-icons/fa";
import formatDate from "../../../../../utils/formatDate";

const TicketMessages = ({ messages, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Messages & Replies
          </h2>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Messages & Replies
          </h2>
          <div className="text-center py-8 text-gray-500">
            No messages found for this ticket.
          </div>
        </div>
      </div>
    );
  }

  // Sort messages by sent_at date (oldest first)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.sent_at) - new Date(b.sent_at)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Messages & Replies ({messages.length})
        </h2>

        <div className="space-y-6">
          {sortedMessages.map((message, index) => (
            <div key={message.id} className="relative">
              {/* Timeline line */}
              {index < sortedMessages.length - 1 && (
                <div className="absolute left-5 top-12 w-0.5 h-full bg-gray-200"></div>
              )}

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.from_staff
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {message.from_staff ? (
                    <FaUserTie className="w-5 h-5" />
                  ) : (
                    <FaUser className="w-5 h-5" />
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-800">
                      {message.sender?.full_name || "Unknown User"}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.from_staff
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.from_staff ? "Staff" : "Customer"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(message.sent_at)}
                    </span>
                  </div>

                  {/* Subject */}
                  {message.subject && (
                    <div className="mb-2">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {message.subject}
                      </h4>
                    </div>
                  )}

                  {/* Message Body */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                      {message.body}
                    </p>
                  </div>

                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaPaperclip className="w-3 h-3" />
                      <span>{message.attachments.length} attachment(s)</span>
                    </div>
                  )}

                  {/* Sender Email */}
                  <div className="mt-2 text-xs text-gray-500">
                    {message.sender?.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketMessages;

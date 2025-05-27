import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";

export default function ChatList({
  chats,
  selectedChatId,
  onChatSelect,
  className = "",
}) {
  const [filter, setFilter] = useState("all");

  const filteredChats = chats.filter((chat) => {
    if (filter === "unread") return chat.unreadCount > 0;
    return true;
  });

  return (
    <div
      className={`bg-white  border-gray-200 flex flex-col h-full ${className}`}
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-600">
            <FiMessageSquare className="mr-2" />
            <span>All Chats</span>
          </div>
        </div>
      </div>

      {/* Scrollable Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChatId === chat.id ? "bg-primary-50 border-blue-200" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={chat.buyerAvatar || "/placeholder.svg"}
                  alt={chat.buyerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {chat.buyerName}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {chat.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {chat.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

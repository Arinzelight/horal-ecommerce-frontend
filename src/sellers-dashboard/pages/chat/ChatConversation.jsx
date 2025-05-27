"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

export default function ChatConversation({ chat, onSendMessage }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 text-lg">
            Select a chat to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full">
   

      {/* Scrollable Messages Container */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-4">
          {chat.messages.length > 0 ? (
            <>
              {/* Date separator */}
              <div className="text-center mb-4">
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                  Today
                </span>
              </div>

              {chat.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isFromCurrentUser={!message.isFromBuyer}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <p className="text-gray-500">
                No messages yet. Start the conversation!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Message Input */}
      <div className="border-t border-gray-200 bg-white">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import ChatConversation from "./ChatConversation";
import EmptyState from "../../components/EmptyProduct";
import { mockChats } from "../../../data/mockChat";
export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState(mockChats);
  const navigate = useNavigate();

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    // Mark messages as read
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
  };

  const handleBackToChatList = () => {
    setSelectedChatId(null);
    navigate("/sellers-dashboard/chat");
  };

  const handleSendMessage = (messageText) => {
    if (!selectedChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: "seller",
      senderName: "You",
      message: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isFromBuyer: false,
      time: "Today",
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: messageText,
              lastMessageTime: "now",
            }
          : chat
      )
    );
  };

  const handleClearChat = () => {
    if (selectedChat) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId ? { ...chat, messages: [] } : chat
        )
      );
    }
  };

  // Show empty state if no chats
  if (chats.length === 0) {
    return (
      <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start  py-4 bg-neutral-50  overflow-hidden">
        <SectionHeader title="Chat" />
        <EmptyState
          animationSrc="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
          message="You don't have any chats on record"
        />
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50  overflow-hidden">
      <SectionHeader title="Chat" />

      <div className="flex-1  shadow-sm overflow-hidden">
        <div className="flex h-[calc(100vh-200px)]">
          {/* Desktop Layout */}
          <div className="hidden md:flex w-full justify-between gap-8">
            {/* Chat List Sidebar */}
            <div className="w-80 md:w-[357px] rounded-[8px] bg-white shadow-sm overflow-hidden">
              <ChatList
                chats={chats}
                selectedChatId={selectedChatId}
                onChatSelect={handleChatSelect}
              />
            </div>

            {/* Chat Conversation */}
            <div className="flex-1 flex flex-col rounded-[8px] bg-white shadow-sm overflow-hidden">
              {/* Sticky Chat Header */}
              {selectedChat && (
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                  <ChatHeader
                    chat={selectedChat}
                    onClose={handleClearChat}
                    showCloseButton={true}
                  />
                </div>
              )}

              {/* Scrollable Chat Conversation */}
              <div className="flex-1 overflow-hidden">
                <ChatConversation
                  chat={selectedChat}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden w-full">
            {!selectedChatId ? (
              <div className="h-full bg-white rounded-[8px] shadow-sm overflow-hidden">
                <ChatList
                  chats={chats}
                  selectedChatId={selectedChatId}
                  onChatSelect={handleChatSelect}
                  className="h-full"
                />
              </div>
            ) : (
              <div className="flex flex-col h-full bg-white rounded-[8px] shadow-sm overflow-hidden">
                {/* Sticky Chat Header for Mobile */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                  <ChatHeader
                    chat={selectedChat}
                    onClose={handleClearChat}
                    onBack={handleBackToChatList}
                    showBackButton={true}
                    showCloseButton={true}
                  />
                </div>

                {/* Scrollable Chat Conversation for Mobile */}
                <div className="flex-1 overflow-hidden">
                  <ChatConversation
                    chat={selectedChat}
                    onSendMessage={handleSendMessage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


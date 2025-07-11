import { FiArrowLeft } from "react-icons/fi";

const ChatHeader = ({
  chat,
  onClose,
  onBack,
  showCloseButton = false,
  showBackButton = false,
}) => {
  if (!chat) return null;

  return (
    <div className="bg-primary-50 border-b border-gray-200 px-3 py-2 sm:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {showBackButton && (
            <button
              onClick={onBack}
              className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 transition-colors md:hidden"
              aria-label="Back"
            >
              <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          <div className="relative flex-shrink-0">
            <img
              src={chat.buyerAvatar || "/placeholder.svg"}
              alt={chat.buyerName}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 max-w-[calc(100%-60px)] sm:max-w-none">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
              {chat.buyerName}
            </h3>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {chat.isOnline && (
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white flex-shrink-0"></div>
              )}
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {chat.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
        {showCloseButton && (
          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors font-medium text-sm sm:text-base flex items-center"
              aria-label="Clear chat"
            >
              <span className="hidden sm:inline mr-1">Clear chat</span>
              <span className="sm:hidden">x</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;

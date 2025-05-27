const MessageBubble = ({ message, isFromCurrentUser }) => {
  return (
    <div
      className={`flex ${
        isFromCurrentUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
          isFromCurrentUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {!isFromCurrentUser && (
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt={message.senderName}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div>
          <p
            className={`text-[14px] ${
              isFromCurrentUser ? "text-neutral-500" : "font-semibold"
            }`}
          >
            {message.senderName}
          </p>
          <div
            className={`px-4 py-2 rounded-lg ${
              isFromCurrentUser
                ? "bg-primary text-white"
                : "bg-neutral-200 text-gray-900"
            }`}
          >
            <p className="text-sm">{message.message}</p>
            <p
              className={`text-xs mt-1 ${
                isFromCurrentUser ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {message.timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MessageBubble;
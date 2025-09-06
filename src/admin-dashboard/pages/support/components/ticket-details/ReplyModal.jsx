import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ReplyModal = ({
  isOpen,
  onClose,
  replyMessage,
  onReplyMessageChange,
  onSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!replyMessage.trim()) {
      setFormError("Please enter a reply message");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit();
    } catch (err) {
      
      const errorData = err.response?.data;
      let errorMessage = "Failed to send reply";

      if (errorData?.body && Array.isArray(errorData.body)) {
        errorMessage = errorData.body[0];
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Reply to Ticket
            </h3>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="reply-message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Message *
              </label>
              <textarea
                id="reply-message"
                value={replyMessage}
                onChange={(e) => onReplyMessageChange(e.target.value)}
                placeholder="Type your reply here..."
                rows={6}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Display errors */}
            {formError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {formError}
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !replyMessage.trim()}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {isSubmitting ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;

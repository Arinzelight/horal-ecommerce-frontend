import { FaArrowLeft, FaUpload, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";
import SupportImg from "../../../assets/images/support.png";
import SectionHeader from "../../components/SectionHeader";
import useSupport from "../../../hooks/useSupport";
import { useMediaApi } from "../../../hooks/useMediaApi";

const CreateTicket = ({ onNavigate, onTicketCreated }) => {
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
    media: null,
  });
  const [mediaPreview, setMediaPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const {
    createTicket,
    loading: ticketLoading,
    error: ticketError,
  } = useSupport();
  const { uploadMedia, loading: mediaLoading } = useMediaApi();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (e.g., 10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        media: "File size must be less than 10MB",
      }));
      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        media:
          "File type not supported. Please upload images, PDFs, or documents.",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, media: file }));

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setMediaPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setMediaPreview(null);
    }

    // Clear media error
    if (errors.media) {
      setErrors((prev) => ({ ...prev, media: "" }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, media: null }));
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let mediaUrl = null;

      // Upload media if provided
      if (formData.media) {
        const mediaResponse = await uploadMedia(formData.media, {
          isPrivate: false,
        });
        mediaUrl =
          mediaResponse.url || mediaResponse.file_url || mediaResponse.id;
      }

      // Create ticket data
      const ticketData = {
        subject: formData.subject.trim(),
        body: formData.body.trim(),
        ...(mediaUrl && { media: mediaUrl }),
      };

      // Create the ticket
      const newTicket = await createTicket(ticketData);

      // Reset form
      setFormData({ subject: "", body: "", media: null });
      setMediaPreview(null);
      setErrors({});
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Notify parent component
      if (onTicketCreated) {
        onTicketCreated(newTicket);
      }

      // Show success message or navigate
      alert("Support ticket created successfully!");
    } catch (error) {
      console.error("Error creating ticket:", error);
      setErrors({ submit: "Failed to create ticket. Please try again." });
    }
  };

  const isLoading = ticketLoading || mediaLoading;

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 overflow-hidden">
      <div className="flex items-center gap-4 mb-6">
        <SectionHeader title="Create Support Ticket" />
      </div>

      <button
        className="flex items-center gap-2 mb-4 hover:text-primary transition-colors"
        onClick={() => onNavigate("main")}
        disabled={isLoading}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Go Back</span>
      </button>

      <div>
        <img
          src={SupportImg}
          alt="Support"
          className="w-full h-48 md:h-64 object-cover rounded-lg mb-6"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Brief description of your issue"
              disabled={isLoading}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message *
            </label>
            <textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleInputChange("body", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[200px] resize-none ${
                errors.body ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Please describe your issue in detail..."
              disabled={isLoading}
            />
            {errors.body && (
              <p className="mt-1 text-sm text-red-600">{errors.body}</p>
            )}
          </div>

          {/* Media Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachment (Optional)
            </label>

            {!formData.media ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Images, PDFs, or documents up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {formData.media.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(formData.media.size / 1024)}KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    disabled={isLoading}
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>

                {mediaPreview && (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="max-w-full h-32 object-cover rounded mt-2"
                  />
                )}
              </div>
            )}

            {errors.media && (
              <p className="mt-1 text-sm text-red-600">{errors.media}</p>
            )}
          </div>

          {/* Error Messages */}
          {(errors.submit || ticketError) && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">
                {errors.submit || ticketError}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-2 text-white rounded-sm transition-opacity ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-secondary hover:opacity-85 cursor-pointer"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mediaLoading ? "Uploading..." : "Creating..."}
                </div>
              ) : (
                "Submit Ticket"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;

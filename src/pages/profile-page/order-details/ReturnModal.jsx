import { useRef, useState } from "react";
import { FaTimes, FaTrash, FaUpload, FaImage, FaLink } from "react-icons/fa";
import { useMediaApi } from "../../../hooks/useMediaApi";
import { isValidUrl } from "../../../sellers-dashboard/pages/shop/shop-products/add-product/utils/valid-url";

const ReturnItemModal = ({
  isOpen,
  onClose,
  item,
  onSubmit,
  isSubmitting = false,
}) => {
  const [reason, setReason] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const fileInputRef = useRef(null);
  const { uploadMedia, loading: uploadingMedia } = useMediaApi();

  if (!isOpen || !item) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      return;
    }
    onSubmit(item.id, reason.trim(), attachments);
  };

  const handleClose = () => {
    if (!isSubmitting && !uploadingMedia) {
      setReason("");
      setAttachments([]);
      setUrlInput("");
      setShowUrlInput(false);
      onClose();
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileUpload = async (files) => {
    if (files.length === 0) return;

    try {
      // Upload files to server
      const uploadPromises = Array.from(files).map((file) =>
        uploadMedia(file, { isPrivate: false })
      );
      const uploadResults = await Promise.all(uploadPromises);

      // Add uploaded media to attachments
      const newAttachments = uploadResults.map((result) => ({
        url: result.url,
        alt: result.file_name || `Attachment ${attachments.length + 1}`,
      }));

      setAttachments([...attachments, ...newAttachments]);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files) {
      await handleFileUpload(files);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (files.length > 0) {
      await handleFileUpload(files);
    }
  };

  const handleAddUrl = () => {
    if (urlInput.trim() && isValidUrl(urlInput)) {
      setAttachments([
        ...attachments,
        {
          url: urlInput.trim(),
          alt: `Attachment ${attachments.length + 1}`,
        },
      ]);
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const updateAttachmentAlt = (index, alt) => {
    const updated = attachments.map((att, i) =>
      i === index ? { ...att, alt } : att
    );
    setAttachments(updated);
  };

  const isMediaFile = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    return [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "mp4",
      "mov",
      "avi",
      "webm",
    ].includes(extension);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Return Item Request
            </h3>
            <button
              onClick={handleClose}
              disabled={isSubmitting || uploadingMedia}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Product Info */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                {item.product?.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product?.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    📦
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  {item.product?.title}
                </h4>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} • ₦
                  {parseFloat(item.unit_price).toLocaleString()}
                </p>
                {item.variant_detail && (
                  <p className="text-xs text-gray-500">
                    {item.variant_detail.color &&
                      `Color: ${item.variant_detail.color}`}
                    {item.variant_detail.custom_size &&
                      ` | Size: ${item.variant_detail.custom_size}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Return Reason */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Return Reason *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please describe why you want to return this item..."
              rows={4}
              disabled={isSubmitting || uploadingMedia}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
            />
          </div>

          {/* Media Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Upload images or videos to support your return request
            </p>

            {/* Upload Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div
                className={`border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 h-24 cursor-pointer transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                } ${
                  uploadingMedia
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-gray-400"
                }`}
                onClick={() => !uploadingMedia && fileInputRef.current?.click()}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={!uploadingMedia ? handleDrop : undefined}
              >
                <FaImage className="text-gray-400 text-xl mb-1" />
                <p className="text-xs text-center text-gray-500">
                  {uploadingMedia ? "Uploading..." : "Click or drag to upload"}
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  disabled={uploadingMedia || isSubmitting}
                />
              </div>

              {/* URL Input */}
              {showUrlInput ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter media URL"
                    disabled={isSubmitting || uploadingMedia}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddUrl}
                      disabled={
                        isSubmitting || uploadingMedia || !urlInput.trim()
                      }
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowUrlInput(false);
                        setUrlInput("");
                      }}
                      disabled={isSubmitting || uploadingMedia}
                      className="px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowUrlInput(true)}
                  disabled={isSubmitting || uploadingMedia}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  <FaLink className="text-gray-500" />
                  Add by URL
                </button>
              )}
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Attachments ({attachments.length})
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-200 rounded-lg p-2"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                          {isMediaFile(attachment.url) ? (
                            <img
                              src={attachment.url}
                              alt={attachment.alt}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            📄
                          </div>
                        </div>
                        <button
                          onClick={() => removeAttachment(index)}
                          disabled={isSubmitting || uploadingMedia}
                          className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Description (optional)"
                        value={attachment.alt}
                        onChange={(e) =>
                          updateAttachmentAlt(index, e.target.value)
                        }
                        disabled={isSubmitting || uploadingMedia}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              disabled={isSubmitting || uploadingMedia}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || uploadingMedia || !reason.trim()}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : uploadingMedia ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                "Submit Return Request"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnItemModal;

import { useRef, useState } from "react";
import { FaVideo, FaLink } from "react-icons/fa";
import MediaItem from "./MediaItem";
import UrlInput from "./UrlInput";
import { isValidUrl } from "../../utils/valid-url";
import { useMediaApi } from "../../../../../../../hooks/useMediaApi";

const VideoUploadSection = ({
  video,
  onVideoChange,
  dragActive,
  handleDrag,
}) => {
  const videoInputRef = useRef(null);
  const replaceVideoInputRef = useRef(null);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [showVideoUrlInput, setShowVideoUrlInput] = useState(false);

  
  const { uploadMedia, loading: uploadingMedia } = useMediaApi();

  const handleVideoClick = () => videoInputRef.current.click();

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL immediately
    const previewUrl = URL.createObjectURL(file);
    onVideoChange(previewUrl);

    try {
      // Upload file to server
      const uploadResult = await uploadMedia(file, { isPrivate: false });

      // Replace preview URL with actual server URL
      onVideoChange(uploadResult.url);

      // Clean up preview URL
      URL.revokeObjectURL(previewUrl);
    } catch (error) {
      console.error("Error uploading video:", error);
      // Remove preview on error
      onVideoChange(null);
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleReplaceVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store old URL for cleanup
    const oldUrl = video;

    // Create preview URL immediately
    const previewUrl = URL.createObjectURL(file);
    onVideoChange(previewUrl);

    try {
      // Upload file to server
      const uploadResult = await uploadMedia(file, { isPrivate: false });

      // Replace preview URL with actual server URL
      onVideoChange(uploadResult.url);

      // Clean up preview URL
      URL.revokeObjectURL(previewUrl);

      // Clean up old URL if it was a blob URL
      if (oldUrl && oldUrl.startsWith("blob:")) {
        URL.revokeObjectURL(oldUrl);
      }
    } catch (error) {
      console.error("Error uploading replacement video:", error);
      // Revert to old URL on error
      onVideoChange(oldUrl);
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleVideoDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDrag(e);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("video/")
    );
    if (files.length === 0) return;

    const file = files[0]; // Only take the first video file

    // Create preview URL immediately
    const previewUrl = URL.createObjectURL(file);
    onVideoChange(previewUrl);

    try {
      // Upload file to server
      const uploadResult = await uploadMedia(file, { isPrivate: false });

      // Replace preview URL with actual server URL
      onVideoChange(uploadResult.url);

      // Clean up preview URL
      URL.revokeObjectURL(previewUrl);
    } catch (error) {
      console.error("Error uploading dropped video:", error);
      // Remove preview on error
      onVideoChange(null);
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleAddVideoUrl = () => {
    if (videoUrlInput.trim() && isValidUrl(videoUrlInput)) {
      onVideoChange(videoUrlInput.trim());
      setVideoUrlInput("");
      setShowVideoUrlInput(false);
    }
  };

  const handleRemoveVideo = () => {
    // Clean up blob URL if it exists
    if (video && video.startsWith("blob:")) {
      URL.revokeObjectURL(video);
    }
    onVideoChange(null);
  };

  return (
    <>
      <h3 className="text-lg font-medium mb-4">Live video</h3>
      <div className="border border-gray-200 rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 h-32 cursor-pointer ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } ${uploadingMedia ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={!uploadingMedia ? handleVideoClick : undefined}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={!uploadingMedia ? handleVideoDrop : undefined}
          >
            <FaVideo className="text-gray-400 text-2xl mb-2" />
            <p className="text-xs text-center text-gray-500">
              {uploadingMedia
                ? "Uploading..."
                : "Click to upload or drag and drop"}
            </p>
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoChange}
              accept="video/*"
              className="hidden"
              disabled={uploadingMedia}
            />
          </div>

          {showVideoUrlInput ? (
            <UrlInput
              value={videoUrlInput}
              onChange={(e) => setVideoUrlInput(e.target.value)}
              onAdd={handleAddVideoUrl}
              onCancel={() => setShowVideoUrlInput(false)}
              placeholder="Enter video URL"
            />
          ) : (
            !video && (
              <button
                onClick={() => setShowVideoUrlInput(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={uploadingMedia}
              >
                <FaLink /> Add video by URL
              </button>
            )
          )}

          {video && (
            <MediaItem
              media={video}
              isVideo={true}
              onReplace={() => replaceVideoInputRef.current.click()}
              onRemove={handleRemoveVideo}
              isUploading={uploadingMedia}
            />
          )}
        </div>
      </div>

      <input
        type="file"
        ref={replaceVideoInputRef}
        onChange={handleReplaceVideo}
        accept="video/*"
        className="hidden"
        disabled={uploadingMedia}
      />
    </>
  );
};

export default VideoUploadSection;
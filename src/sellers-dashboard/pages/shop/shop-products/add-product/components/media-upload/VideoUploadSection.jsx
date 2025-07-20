import { useRef, useState } from "react";
import { FaVideo, FaLink } from "react-icons/fa";
import MediaItem from "./MediaItem";
import UrlInput from "./UrlInput";
import { isValidUrl } from "../../utils/valid-url";

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

  const handleVideoClick = () => videoInputRef.current.click();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onVideoChange(URL.createObjectURL(file));
  };

  const handleReplaceVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onVideoChange(URL.createObjectURL(file));
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDrag(e);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("video/")
    );
    if (files.length === 0) return;
    onVideoChange(URL.createObjectURL(files[0]));
  };

  const handleAddVideoUrl = () => {
    if (videoUrlInput.trim() && isValidUrl(videoUrlInput)) {
      onVideoChange(videoUrlInput.trim());
      setVideoUrlInput("");
      setShowVideoUrlInput(false);
    }
  };

  const handleRemoveVideo = () => onVideoChange(null);

  return (
    <>
      <h3 className="text-lg font-medium mb-4">Live video</h3>
      <div className="border border-gray-200 rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 h-32 cursor-pointer ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onClick={handleVideoClick}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleVideoDrop}
          >
            <FaVideo className="text-gray-400 text-2xl mb-2" />
            <p className="text-xs text-center text-gray-500">
              Click to upload or drag and drop
            </p>
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoChange}
              accept="video/*"
              className="hidden"
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
      />
    </>
  );
};

export default VideoUploadSection;

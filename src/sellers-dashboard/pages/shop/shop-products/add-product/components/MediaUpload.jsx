import { useState } from "react";
import ImageUploadSection from "./media-upload/ImageUploadSection";
import VideoUploadSection from "./media-upload/VideoUploadSection";

const MediaUpload = ({ images, video, onImagesChange, onVideoChange }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  return (
    <div className="mb-6 w-full">
      <ImageUploadSection
        images={images}
        onImagesChange={onImagesChange}
        dragActive={dragActive}
        handleDrag={handleDrag}
      />

      <VideoUploadSection
        video={video}
        onVideoChange={onVideoChange}
        dragActive={dragActive}
        handleDrag={handleDrag}
      />
    </div>
  );
};

export default MediaUpload;
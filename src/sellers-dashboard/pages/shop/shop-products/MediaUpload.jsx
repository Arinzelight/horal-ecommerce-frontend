import { useState, useRef } from "react";
import { FaImage, FaVideo } from "react-icons/fa";

const MediaUpload = ({ images, video, onImagesChange, onVideoChange }) => {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const replaceImageInputRef = useRef(null);
  const replaceVideoInputRef = useRef(null);
  const [imageToReplace, setImageToReplace] = useState(null);

  const [dragActive, setDragActive] = useState(false);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Convert files to URLs
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    onImagesChange([...images, ...newImageUrls]);
  };

  const handleReplaceImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImageUrl = URL.createObjectURL(file);
    const newImages = [...images];
    newImages[index] = newImageUrl;
    onImagesChange(newImages);
  };

  const handleReplaceVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onVideoChange(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onVideoChange(URL.createObjectURL(file));
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

  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) return;

    // Convert files to URLs
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    onImagesChange([...images, ...newImageUrls]);
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("video/")
    );

    if (files.length === 0) return;

    onVideoChange(URL.createObjectURL(files[0]));
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  const handleRemoveVideo = () => {
    onVideoChange(null);
  };

  const initiateReplaceImage = (index) => {
    setImageToReplace(index);
    replaceImageInputRef.current.click();
  };

  return (
    <div className="mb-6 w-full">
      <h3 className="text-lg font-medium mb-4">Product Images</h3>

      <div className="border border-gray-200 rounded-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image upload area */}
          <div
            className={`border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 h-32 cursor-pointer ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onClick={handleImageClick}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleImageDrop}
          >
            <FaImage className="text-gray-400 text-2xl mb-2" />
            <p className="text-xs text-center text-gray-500">
              Click to upload or drag and drop
            </p>
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Display uploaded images */}
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-32 border rounded-md overflow-hidden group"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => initiateReplaceImage(index)}
                  className="bg-white h-[27px] w-[114px] text-gray-800 px-4 py-1 rounded-md w-24 text-sm font-medium"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-white h-[27px] w-[114px] text-gray-800 px-4 py-1 rounded-md w-24 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <input
        type="file"
        ref={replaceImageInputRef}
        onChange={(e) => handleReplaceImage(e, imageToReplace)}
        accept="image/*"
        className="hidden"
      />

      <h3 className="text-lg font-medium mb-4">Live video</h3>

      <div className="border border-gray-200 rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Video upload area */}
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

          {/* Display uploaded video */}
          {video && (
            <div className="relative h-32 border rounded-md overflow-hidden group">
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                className="w-full h-full object-cover group-hover:opacity-70 transition-opacity duration-200"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => replaceVideoInputRef.current.click()}
                  className="bg-white h-[27px] w-[114px] text-gray-800 px-4 py-1 rounded-md text-sm font-medium"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="bg-white h-[27px] w-[114px] text-gray-800 px-4 py-1 rounded-md text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
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
    </div>
  );
};

export default MediaUpload;

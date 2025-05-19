"use client";

import { useState, useRef } from "react";
import { FaImage, FaVideo, FaTimes } from "react-icons/fa";

const MediaUpload = ({ images, video, onImagesChange, onVideoChange }) => {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

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

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Product Images</h3>

      <div className="flex flex-col md:flex-row gap-4 mb-6 border-[1px] border-neutral-200 p-4 rounded-md">
        {/* Image upload area */}
        <div
          className={`h-[122px] md:w-[152px] md:h-[139px] border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 h-32 cursor-pointer ${
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
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="bg-red-500 text-white p-1 rounded-full"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-medium mb-4">Live video</h3>

      <div className="flex flex-col md:flex-row gap-4 mb-6 border-[1px] border-neutral-200 p-4 rounded-md">
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
            <video src={video} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="bg-red-500 text-white p-1 rounded-full"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;

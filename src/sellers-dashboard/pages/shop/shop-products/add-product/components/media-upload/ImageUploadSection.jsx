import { useRef, useState } from "react";
import { FaImage, FaLink } from "react-icons/fa";
import MediaItem from "./MediaItem";
import UrlInput from "./UrlInput";
import { isValidUrl } from "../../utils/valid-url";
import { useMediaApi } from "../../../../../../../hooks/useMediaApi"

const ImageUploadSection = ({
  images,
  onImagesChange,
  dragActive,
  handleDrag,
}) => {
  const imageInputRef = useRef(null);
  const replaceImageInputRef = useRef(null);
  const [imageToReplace, setImageToReplace] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);

  const { uploadMedia, loading: uploadingMedia } = useMediaApi();

  const handleImageClick = () => imageInputRef.current.click();

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create preview URLs immediately 
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    onImagesChange([...images, ...previewUrls]);

    try {
      // Upload files to server
      const uploadPromises = files.map((file) =>
        uploadMedia(file, { isPrivate: false })
      );
      const uploadResults = await Promise.all(uploadPromises);

      // Replace preview URLs with actual server URLs
      const serverUrls = uploadResults.map((result) => result.url);
      const updatedImages = [...images, ...serverUrls];
      onImagesChange(updatedImages);

      // Clean up preview URLs
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    } catch (error) {
      console.error("Error uploading images:", error);
      // Remove preview URLs on error
      onImagesChange(images);
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  };

  const handleReplaceImage = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL immediately
    const previewUrl = URL.createObjectURL(file);
    const newImages = [...images];
    const oldUrl = newImages[index];
    newImages[index] = previewUrl;
    onImagesChange(newImages);

    try {
      // Upload file to server
      const uploadResult = await uploadMedia(file, { isPrivate: false });

      // Replace preview URL with actual server URL
      const updatedImages = [...images];
      updatedImages[index] = uploadResult.url;
      onImagesChange(updatedImages);

      // Clean up preview URL
      URL.revokeObjectURL(previewUrl);

      // Clean up old URL if it was a blob URL
      if (oldUrl && oldUrl.startsWith("blob:")) {
        URL.revokeObjectURL(oldUrl);
      }
    } catch (error) {
      console.error("Error uploading replacement image:", error);
      // Revert to old URL on error
      const revertedImages = [...images];
      revertedImages[index] = oldUrl;
      onImagesChange(revertedImages);
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleImageDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDrag(e);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length === 0) return;

    // Create preview URLs immediately
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    onImagesChange([...images, ...previewUrls]);

    try {
      // Upload files to server
      const uploadPromises = files.map((file) =>
        uploadMedia(file, { isPrivate: false })
      );
      const uploadResults = await Promise.all(uploadPromises);

      // Replace preview URLs with actual server URLs
      const serverUrls = uploadResults.map((result) => result.url);
      const updatedImages = [...images, ...serverUrls];
      onImagesChange(updatedImages);

      // Clean up preview URLs
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    } catch (error) {
      console.error("Error uploading dropped images:", error);
      // Remove preview URLs on error
      onImagesChange(images);
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim() && isValidUrl(imageUrlInput)) {
      onImagesChange([...images, imageUrlInput.trim()]);
      setImageUrlInput("");
      setShowImageUrlInput(false);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const removedUrl = newImages[index];

    // Clean up blob URL if it exists
    if (removedUrl && removedUrl.startsWith("blob:")) {
      URL.revokeObjectURL(removedUrl);
    }

    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  const initiateReplaceImage = (index) => {
    setImageToReplace(index);
    replaceImageInputRef.current.click();
  };

  return (
    <>
      <h3 className="text-lg font-medium">Product Images</h3>
      <p className="text-sm text-gray-600 mb-2">
        Upload images for your product, including different angles and details.
      </p>
      <div className="border border-gray-200 rounded-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 h-32 cursor-pointer ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } ${uploadingMedia ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={!uploadingMedia ? handleImageClick : undefined}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={!uploadingMedia ? handleImageDrop : undefined}
          >
            <FaImage className="text-gray-400 text-2xl mb-2" />
            <p className="text-xs text-center text-gray-500">
              {uploadingMedia
                ? "Uploading..."
                : "Click to upload or drag and drop"}
            </p>
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="hidden"
              disabled={uploadingMedia}
            />
          </div>

          {showImageUrlInput ? (
            <UrlInput
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              onAdd={handleAddImageUrl}
              onCancel={() => setShowImageUrlInput(false)}
              placeholder="Enter image URL"
            />
          ) : (
            <button
              onClick={() => setShowImageUrlInput(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={uploadingMedia}
            >
              <FaLink /> Add image by URL
            </button>
          )}

          {images.map((image, index) => (
            <MediaItem
              key={index}
              media={image}
              isVideo={false}
              onReplace={() => initiateReplaceImage(index)}
              onRemove={() => handleRemoveImage(index)}
              isUploading={uploadingMedia}
            />
          ))}
        </div>
      </div>

      <input
        type="file"
        ref={replaceImageInputRef}
        onChange={(e) => handleReplaceImage(e, imageToReplace)}
        accept="image/*"
        className="hidden"
        disabled={uploadingMedia}
      />
    </>
  );
};

export default ImageUploadSection;
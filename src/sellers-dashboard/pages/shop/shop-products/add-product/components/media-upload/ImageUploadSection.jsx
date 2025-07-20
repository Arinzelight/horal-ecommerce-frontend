import { useRef, useState } from "react";
import { FaImage, FaLink } from "react-icons/fa";
import MediaItem from "./MediaItem";
import UrlInput from "./UrlInput";
import { isValidUrl } from "../../utils/valid-url";

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

  const handleImageClick = () => imageInputRef.current.click();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
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

  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDrag(e);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length === 0) return;
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    onImagesChange([...images, ...newImageUrls]);
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
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  const initiateReplaceImage = (index) => {
    setImageToReplace(index);
    replaceImageInputRef.current.click();
  };

  return (
    <>
      <h3 className="text-lg font-medium mb-4">Product Images</h3>
      <div className="border border-gray-200 rounded-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      />
    </>
  );
};

export default ImageUploadSection;

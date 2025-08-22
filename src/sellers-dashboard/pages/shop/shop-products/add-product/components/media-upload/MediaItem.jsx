import { FaVideo, FaSpinner } from "react-icons/fa";

const MediaItem = ({
  media,
  isVideo,
  onReplace,
  onRemove,
  isUploading = false,
}) => {
  return (
    <div className="relative h-32 border rounded-md overflow-hidden group">
      {isVideo ? (
        media.startsWith("blob:") ? (
          <video
            src={media}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            className="w-full h-full object-cover group-hover:opacity-70 transition-opacity duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <FaVideo className="text-4xl text-gray-400" />
          </div>
        )
      ) : (
        <img
          src={media || "/placeholder.svg"}
          alt="Product"
          className="w-full h-full object-cover"
        />
      )}

      {/* Upload loading overlay */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="flex items-center gap-2 text-white">
            <FaSpinner className="animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        </div>
      )}

      {/* Action buttons overlay */}
      <div
        className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 ${
          isUploading ? "hidden" : ""
        }`}
      >
        <button
          type="button"
          onClick={onReplace}
          className="bg-white h-[27px] w-[114px] text-gray-800 px-4 py-1 rounded-md text-sm font-medium"
          disabled={isUploading}
        >
          Replace
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="bg-white h-[27px] w-[114px] text-gray-800 px-4 py-1 rounded-md text-sm font-medium"
          disabled={isUploading}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MediaItem;

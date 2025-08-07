import { FaCheck } from "react-icons/fa";
import { getColorClass } from "../../../utils/color-class";

export default function ColorSelector({
  availableColors,
  selectedColor,
  onColorSelect,
}) {
  if (availableColors.length === 0) {
    return null;
  }

  const isWhiteColor = (color) => {
    const whiteVariants = ["white", "cream", "ivory", "off-white", "snow"];
    return whiteVariants.some((variant) =>
      color.toLowerCase().includes(variant.toLowerCase())
    );
  };

  const getCheckmarkColor = (color) => {
    // For white/light colors, use dark checkmark
    if (isWhiteColor(color)) {
      return "text-gray-800";
    }
    // For dark colors, use white checkmark
    return "text-white";
  };

  return (
    <div className="">
      <div className="md:text-lg lg:text-lg xl:text-xl font-bold mb-2">
        Available colors:
      </div>
      <div className="flex space-x-4">
        {availableColors.map((color, index) => (
          <div key={index} className="relative">
            <button
              className={`${getColorClass(
                color
              )} w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                selectedColor === color
                  ? "ring-2 ring-secondary ring-offset-2 scale-110"
                  : "hover:scale-105"
              } ${
                // Add border for white/light colors
                isWhiteColor(color)
                  ? "border-2 border-gray-300 shadow-sm"
                  : "border border-gray-200"
              }`}
              onClick={() => onColorSelect(color)}
              aria-label={`Select ${color} color`}
              title={color} // Tooltip showing color name
            >
              {selectedColor === color && (
                <FaCheck className={`${getCheckmarkColor(color)} text-xs`} />
              )}
            </button>

            {/* Color name label that appears on hover */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <span className="text-xs text-gray-600 whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm border">
                {color}
              </span>
            </div>
          </div>
        ))}
      </div>

      
      {selectedColor && (
        <div className="mt-3 text-sm text-gray-700">
          Selected:{" "}
          <span className="font-medium capitalize">{selectedColor}</span>
        </div>
      )}
    </div>
  );
}

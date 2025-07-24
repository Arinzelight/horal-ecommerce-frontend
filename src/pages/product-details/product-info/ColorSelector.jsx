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

  return (
    <div className="">
      <div className="md:text-lg lg:text-lg xl:text-xl font-bold mb-2">
        Available color
      </div>
      <div className="flex space-x-4">
        {availableColors.map((color, index) => (
          <button
            key={index}
            className={`${getColorClass(
              color
            )} w-6 h-6 rounded-full flex items-center justify-center ${
              selectedColor === color
                ? "ring-2 ring-secondary ring-offset-2"
                : ""
            }`}
            onClick={() => onColorSelect(color)}
            aria-label={color}
          >
            {selectedColor === color && (
              <FaCheck className="text-white text-xs" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

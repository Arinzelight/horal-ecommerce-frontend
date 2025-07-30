import { getColorClass } from "../../../../../../../utils/color-class";

const ColorDisplay = ({ colorName, showName = true }) => {
  // Handle empty/no color
  if (!colorName || colorName.trim() === "") {
    return (
      <div className="flex items-center">
        <div className="w-4 h-4 rounded-full mr-2 border-2 border-dashed border-gray-400 bg-transparent flex items-center justify-center">
          <span className="text-xs text-gray-400">N/A</span>
        </div>
        {showName && <span className="text-gray-500 italic">No Color</span>}
      </div>
    );
  }

  // Handle standard color differently
  if (colorName === "standard" || colorName === "Standard") {
    return (
      <div className="flex items-center">
        <div className="w-4 h-4 rounded-full mr-2 border-2 border-gray-400 bg-gray-100 flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
        {showName && <span className="capitalize">Standard</span>}
      </div>
    );
  }

  const colorClass = getColorClass(colorName);

  return (
    <div className="flex items-center">
      <div className={`w-4 h-4 rounded-full mr-2 ${colorClass}`} />
      {showName && <span className="capitalize">{colorName}</span>}
    </div>
  );
};

export default ColorDisplay;

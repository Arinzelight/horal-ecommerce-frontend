import { getColorClass } from "../../../../../../../utils/color-class";

const ColorDisplay = ({ colorName, showName = true }) => {
  const colorClass = getColorClass(colorName);

  return (
    <div className="flex items-center">
      <div className={`w-4 h-4 rounded-full mr-2 ${colorClass}`} />
      {showName && <span className="capitalize">{colorName}</span>}
    </div>
  );
};

export default ColorDisplay;

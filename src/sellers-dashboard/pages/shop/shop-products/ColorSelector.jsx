const colors = [
  { name: "Blue", value: "#1e90ff" },
  { name: "White", value: "#ffffff" },
  { name: "Yellow", value: "#ffeb3b" },
  { name: "Green", value: "#4caf50" },
  { name: "Red", value: "#f44336" },
  { name: "Purple", value: "#9c27b0" },
  { name: "Brown", value: "#795548" },
  { name: "Orange", value: "#ff9800" },
  { name: "Teal", value: "#009688" },
  { name: "Cyan", value: "#00bcd4" },
  { name: "Pink", value: "#e91e63" },
  { name: "Indigo", value: "#3f51b5" },
];

const ColorSelector = ({ selectedColor, onColorChange }) => {
  const handleColorToggle = (color) => {
    const newColors = selectedColor.includes(color.name)
      ? selectedColor.filter((c) => c !== color.name)
      : [...selectedColor, color.name];
    onColorChange(newColors);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Colors</h3>
      <div className="border-[1px] border-neutral-200 p-4 rounded-md">
        <p className="text-sm text-gray-500 mb-3">Select available colors</p>

        <div className="grid grid-cols-4 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="flex items-center">
              <input
                type="checkbox"
                id={`color-${color.name}`}
                checked={selectedColor.includes(color.name)}
                onChange={() => handleColorToggle(color)}
                className="hidden"
              />
              <label
                htmlFor={`color-${color.name}`}
                className={`flex items-center cursor-pointer group ${
                  selectedColor.includes(color.name) ? "font-medium" : ""
                }`}
              >
                <div
                  className={`relative p-0.3 rounded-full mr-2 ${
                    selectedColor.includes(color.name)
                      ? "ring-1 ring-offset-1 ring-primary"
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                >
                  <span
                    className={`block w-[10px] h-[10px] rounded-full ${
                      color.value === "#ffffff" ? "border border-gray-300" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                  ></span>
                  {selectedColor.includes(color.name) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <span
                  className={
                    selectedColor.includes(color.name)
                      ? "text-neutral-600"
                      : "text-neutral-700"
                  }
                >
                  {color.name}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;

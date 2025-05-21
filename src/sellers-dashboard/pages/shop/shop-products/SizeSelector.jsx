

import { useState } from "react";

// Size options for different categories
const sizeOptions = {
  footwear: [
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
  ],
  clothing: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  babies: [
    "0-3M",
    "3-6M",
    "6-9M",
    "9-12M",
    "12-18M",
    "18-24M",
  ],
};

const SizeSelector = ({ category, selectedSizes, onSizesChange }) => {
  const [sizeType, setSizeType] = useState(
    category === "fashion" ? "clothing" : "babies"
  );

  // Determine which size options to show based on category and size type
  const getSizeOptionsForCategory = () => {
    if (category === "babies") {
      return sizeOptions.babies;
    } else if (category === "fashion") {
      return sizeOptions[sizeType];
    }
    return [];
  };

  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter((s) => s !== size));
    } else {
      onSizesChange([...selectedSizes, size]);
    }
  };

  // If not a relevant category, don't render anything
  if (!["fashion", "babies"].includes(category)) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-[16px] font-medium mb-2">Size Options</h3>
      <div className="border-[1px] border-neutral-200 p-4 rounded-md">
        {/* Size type toggle for fashion category */}
        {category === "fashion" && (
          <div className="mb-4">
            <div className="flex space-x-4 mb-3">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="sizeType"
                  checked={sizeType === "clothing"}
                  onChange={() => setSizeType("clothing")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Clothing Size</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="sizeType"
                  checked={sizeType === "footwear"}
                  onChange={() => setSizeType("footwear")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Footwear Size</span>
              </label>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-3">Select all available sizes</p>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {getSizeOptionsForCategory().map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeToggle(size)}
              className={`py-[6px] px-[1px] border rounded-md text-xs font-medium transition-colors 
              ${
                selectedSizes.includes(size)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeSelector;

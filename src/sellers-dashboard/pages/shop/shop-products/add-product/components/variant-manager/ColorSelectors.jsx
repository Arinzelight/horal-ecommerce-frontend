import React from "react";
import ColorDisplay from "./ColorDisplay";
import { colors } from "../../utils/constants";

const ColorSelector = ({ selectedColor, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Select Color
    </label>
    <p className="text-xs text-gray-500 mb-3">
      If the product does not have a specific color, you can leave this selection
      blank. This is optional and can be ignored for products that do not require color variants eg food products.
      
    </p>
    <div className="grid  grid-cols-3 lg:grid-cols-4 gap-2">
      {colors.map((color) => (
        <label key={color.name} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="color"
            checked={selectedColor === color.name}
            onChange={() => onChange(color.name)}
            className="sr-only"
          />
          <div
            className={`flex items-center md:p-1 rounded text-xs ${
              selectedColor === color.name
                ? "bg-primary-700 text-white border-blue-500"
                : "hover:bg-gray-50"
            } border-[1px] border-neutral-200`}
          >
            <ColorDisplay colorName={color.name} />
          </div>
        </label>
      ))}
    </div>
  </div>
);

export default ColorSelector;

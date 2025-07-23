import React from "react";
import ColorDisplay from "./ColorDisplay";
import { colors } from "../../utils/constants";

const ColorSelector = ({ selectedColor, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Select Color
    </label>
    <div className="grid grid-cols-4 gap-2">
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
            className={`flex items-center p-2 rounded ${
              selectedColor === color.name
                ? "bg-blue-100 border-blue-500"
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

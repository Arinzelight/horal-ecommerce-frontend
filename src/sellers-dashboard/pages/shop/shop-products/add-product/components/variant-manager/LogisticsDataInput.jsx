import React from "react";


const weightMeasurements = [
  { value: "kG", label: "Kilograms (kg)" },
  { value: "G", label: "Grams (g)" },
];

const LogisticsDataInput = ({
  weightMeasurement,
  totalWeight,
  onWeightMeasurementChange,
  onTotalWeightChange,
}) => {
  return (
    <div className="my-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Logistics Data (Required)
      </label>
      <p className="text-xs text-gray-500 mb-3">
        Provide weight (weight per item/variant) information for shipping calculations. This is required
        for all product variants.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Weight Unit
          </label>
          <select
            value={weightMeasurement || ""}
            onChange={(e) => onWeightMeasurementChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select unit...</option>
            {weightMeasurements.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Total Weight
          </label>
          <input
            type="number"
            min="0"
            value={totalWeight || ""}
            onChange={(e) => onTotalWeightChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter weight"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LogisticsDataInput;

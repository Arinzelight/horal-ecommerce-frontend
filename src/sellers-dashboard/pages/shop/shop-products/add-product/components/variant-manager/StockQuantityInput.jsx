import React from "react";

const StockQuantityInput = ({ stockQuantity, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      Stock Quantity
    </label>
    <input
      type="number"
      min={0}
      value={stockQuantity || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      placeholder="Enter stock quantity"
    />
  </div>
);

export default StockQuantityInput;

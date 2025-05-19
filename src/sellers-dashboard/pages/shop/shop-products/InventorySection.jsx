"use client";

const InventorySection = ({ quantity, sku, onInputChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Inventory</h3>

      <div className="flex flex-col md:flex-row space-x-4 border-[1px] border-neutral-200 p-4 rounded-md ">
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantity Available
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) =>
              onInputChange("quantity", Number.parseInt(e.target.value) || 1)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            SKU (Optional)
          </label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => onInputChange("sku", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g. RP-92-EIO-QP"
          />
        </div>
      </div>
    </div>
  );
};

export default InventorySection;

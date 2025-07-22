
const PricingSection = ({ price, onPriceChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-[16px] font-medium mb-4">Pricing</h3>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Price
        </label>
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            ₦
          </span>
          <input
            type="number"
            id="price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0.00"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

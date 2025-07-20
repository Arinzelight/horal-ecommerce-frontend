

const OriginSection = ({ origin, onOriginChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Origin of Ingredients</h3>

      <div className="border-[1px] border-neutral-200 p-4 rounded-md">
        <input
          type="text"
          value={origin}
          onChange={(e) => onOriginChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Origin of Ingredients"
        />
      </div>
    </div>
  );
};

export default OriginSection;

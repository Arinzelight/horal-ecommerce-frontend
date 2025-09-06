export default function SizeSelector({
  availableSizes,
  selectedSize,
  onSizeSelect,
}) {
  if (availableSizes.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="md:text-lg font-bold mb-2">Available Size: </h3>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => (
          <button
            key={size.key}
            className={`px-4 py-1 text-sm rounded-4xl border ${
              selectedSize?.key === size.key
                ? "bg-primary text-white"
                : "bg-white text-gray-800 border-primary"
            }`}
            onClick={() => onSizeSelect(size)}
            aria-label={`Size ${size.display}`}
          >
            {parseFloat(size.display)}
          </button>
        ))}
      </div>
    </div>
  );
}

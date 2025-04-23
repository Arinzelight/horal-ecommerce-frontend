import React from "react";

const sortOptions = [
  { value: "featured", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
];

const SortModal = ({ open, setOpen, value, onChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white rounded-t-xl md:rounded-xl max-w-xs w-full p-6 shadow-xl md:max-w-md md:p-8">
        <h2 className="font-bold text-lg mb-4">Sort By</h2>
        <div className="space-y-3">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`block w-full text-left px-4 py-2 rounded-md text-md ${
                value === option.value
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          className="mt-6 w-full py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default SortModal;

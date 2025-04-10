import { FaTshirt } from "react-icons/fa";

export default function MobileCategoryGrid() {
  // Create a grid of categories (4 columns)
  const categories = Array(16).fill({
    name: "Women's Fashion",
    icon: <FaTshirt />,
  });

  return (
    <div className="grid grid-cols-4 gap-1 bg-white max-h-[70vh] overflow-y-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-2 bg-white rounded"
        >
          <div className="w-10 h-10 bg-gray-200 text-secondary rounded-full flex items-center justify-center mb-1">
            {category.icon}
          </div>
          <span className="text-xs text-black">{category.name}</span>
        </div>
      ))}
    </div>
  );
}

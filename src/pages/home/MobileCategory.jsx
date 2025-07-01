import { FaTshirt } from "react-icons/fa";
// import { categories } from "../../data/mockProducts";

export default function MobileCategoryGrid({categories, onCategoryClick }) {
  return (
    <div className="grid grid-cols-4 gap-2 bg-white lg:max-w-5xl lg:mx-auto lg:px-12 overflow-y-auto p-2 rounded-lg shadow-md">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategoryClick(category.name)}
          aria-label={`Go to ${category.name} category`}
          className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mb-2">
            {category.icon}
          </div>
          <span className="text-xs text-black text-center font-medium">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
}

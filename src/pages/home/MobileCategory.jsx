import { FaTshirt } from "react-icons/fa";
import { categories } from "../../data/mockProducts";

export default function MobileCategoryGrid({ onCategoryClick }) {
  return (
    <div className="grid grid-cols-4 gap-2 bg-white lg:max-w-5xl lg:mx-auto lg:px-12 overflow-y-auto p-2 rounded-lg shadow-md">
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => onCategoryClick(category.name)}
          className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
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

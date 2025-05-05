import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/mockProducts";
import MobileCategoryGrid from "./MobileCategory";

export default function Sidebar() {
  const [showCategoryGrid, setShowCategoryGrid] = useState(false);
  const navigate = useNavigate();

  const toggleCategoryGrid = () => setShowCategoryGrid(!showCategoryGrid);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    setShowCategoryGrid(false); // Close the category grid on mobile
  };

  return (
    <>
      {/* Mobile View (always shown on mobile) */}
      <div className="lg:max-w-5xl lg:mx-auto lg:px-12 my-4 relative md:hidden">
        <button
          onClick={toggleCategoryGrid}
          className={`w-full flex items-center justify-between bg-primary text-white px-4 py-3 rounded ${
            showCategoryGrid ? "bg-primary-700" : ""
          }`}
        >
          <span className="text-[16px]">Categories</span>
          <FaChevronDown
            className={`transition-transform w-6 h-6 ${
              showCategoryGrid ? "rotate-180" : ""
            }`}
          />
        </button>

        {showCategoryGrid && (
          <div className="left-0 right-0 top-full lg:max-w-5xl lg:mx-auto lg:px-12 z-10 shadow-lg">
            <MobileCategoryGrid onCategoryClick={handleCategoryClick} />
          </div>
        )}
      </div>

      {/* Desktop View (hidden on mobile) */}
      <div className="w-full rounded-md h-[500px] bg-primary text-white p-3 scrollbar-hide overflow-y-auto hidden md:block">
        <h2 className="text-xl font-bold mb-4 ml-2">Categories</h2>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className="w-full flex items-center hover:bg-white hover:text-primary py-2 rounded cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
              aria-label={`Go to ${category.name} category`}
            >
              <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center mr-2">
                {category.icon}
              </div>
              <span className="text-[16px] whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

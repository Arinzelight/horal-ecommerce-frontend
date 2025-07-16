import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import MobileCategoryGrid from "./MobileCategory";
import { FaShirt } from "react-icons/fa6";
import { getCategoryIconElement } from "../../utils/categoryIconMapper";

export default function Sidebar() {
  const [showCategoryGrid, setShowCategoryGrid] = useState(false);
  const navigate = useNavigate();
  const { categories } = useCategories();

  const toggleCategoryGrid = () => setShowCategoryGrid(!showCategoryGrid);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`);
    setShowCategoryGrid(false);
  };

  return (
    <>
      {/* Mobile View (always shown on mobile) */}
      <div className="lg:max-w-5xl lg:mx-auto lg:px-12  relative md:hidden">
        <button
          onClick={toggleCategoryGrid}
          className={`w-full flex items-center justify-between bg-primary text-white px-4 py-2 rounded ${
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
            <MobileCategoryGrid
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        )}
      </div>

      {/* Desktop View (hidden on mobile) */}
      <div className="w-full rounded-md h-[500px] bg-primary text-white p-3 scrollbar-hide overflow-y-auto hidden md:block">
        <h2 className="text-xl font-bold mb-4 ml-2">Categories</h2>
        <div className="space-y-2">
          {categories.map((category, index) => {
            // Get the icon component for this category
            const IconComponent = category.icon || FaShirt;

            return (
              <button
                key={category.id || index} // Use category.id if available
                className="w-full flex items-center hover:bg-white pl-3 hover:text-primary py-2 rounded cursor-pointer"
                onClick={() => handleCategoryClick(category)}
                aria-label={`Go to ${category.name} category`}
              >
                <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center mr-2">
                   {getCategoryIconElement(category.name)}{" "}
                </div>
                <span className="text-[16px] capitalize whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

import { forwardRef } from "react";
import { FaShirt } from "react-icons/fa6";

const MobileMenu = forwardRef(
  ({ showMobileMenu, categories, handleCategoryClick }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed top-24 left-0 h-full w-60 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-1">
          <h2 className="text-xl mb-4 mt-2 font-bold ml-4">Categories</h2>
          {categories.map((category, index) => (
            <button
              key={index}
              className="w-full flex items-center hover:bg-white pl-3 hover:text-primary py-2 rounded cursor-pointer"
              onClick={() => handleCategoryClick(category)}
              aria-label={`Go to ${category.name} category`}
            >
              {/* 
            <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center mr-2">
              {category.icon}
            </div>
           */}
              {/* use placeholder icon for now */}
              <div className="w-8 h-8 bg-gray-200 text-primary rounded-full flex items-center justify-center mr-2">
                <FaShirt className="text-sm" />
              </div>
              <span className="text-[16px] text-primary capitalize whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;

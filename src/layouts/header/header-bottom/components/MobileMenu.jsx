import { forwardRef } from "react";
import { FaTimes } from "react-icons/fa";
import Logo from "../../../../assets/images/horal-logo-1.png";
import Logo2 from  "../../../../assets/images/Horal-Logo.png";
import { getCategoryIconElement } from "../../../../utils/categoryIconMapper";

const MobileMenu = forwardRef(
  ({ showMobileMenu, categories, handleCategoryClick, onClose }, ref) => {
    return (
      <>
        {/* Dark Overlay */}
        {showMobileMenu && (
          <div
            className="fixed inset-0 bg-black/60 bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={onClose}
          />
        )}

        {/* Mobile Menu */}
        <div
          ref={ref}
          className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <img src={Logo} alt="Horal Logo" className="h-8 w-auto" />
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-primary-600 transition-colors"
              aria-label="Close menu"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Categories Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Browse Categories
              </h2>

              <div className="space-y-1">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group"
                    onClick={() => handleCategoryClick(category)}
                    aria-label={`Go to ${category.name} category`}
                  >
                    <div className="w-10 h-8 bg-primary-50 text-primary rounded-full flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <div className="text-sm">
                          {getCategoryIconElement(category.name)}
                        </div>
                      )}
                    </div>

                    <span className="text-base text-gray-700 capitalize font-medium group-hover:text-gray-900 transition-colors duration-200">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500 text-center">
              Discover amazing products in every category
            </p>
          </div>
        </div>
      </>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;

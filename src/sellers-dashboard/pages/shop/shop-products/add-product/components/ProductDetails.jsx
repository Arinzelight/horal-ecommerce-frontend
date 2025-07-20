import { useEffect } from "react";
import SubcategorySelector from "./SubCategorySelector";

const ProductDetails = ({ formData, onInputChange, selectedCategory }) => {
  // Clear subcategory when category changes
  useEffect(() => {
    if (formData.subcategory && selectedCategory) {
      // Clear the subcategory selection when category changes
      onInputChange("subcategory", "");
    }
  }, [selectedCategory, formData.subcategory, onInputChange]);

  return (
    <div className="mb-6">
      <h3 className="text-[16px] font-medium mb-2">Product Details</h3>

      <div className="space-y-4 border-[1px] border-neutral-200 p-4 rounded-md">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => onInputChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Name of Product/Dish"
            required
          />
        </div>

        {/* Subcategory Selector */}
        <SubcategorySelector
          selectedCategory={selectedCategory}
          selectedSubcategory={formData.subcategory}
          onSubcategoryChange={(subcategory) =>
            onInputChange("subcategory", subcategory)
          }
        />

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            value={formData.state}
            onChange={(e) => onInputChange("state", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="State"
          />
        </div>

        <div>
          <label
            htmlFor="local_govt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Local Government Area
          </label>
          <input
            type="text"
            id="local_govt"
            value={formData.local_govt}
            onChange={(e) => onInputChange("local_govt", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Local Government Area"
          />
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Brand Name
          </label>
          <input
            type="text"
            id="brand"
            value={formData.brand}
            onChange={(e) => onInputChange("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Brand Name"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
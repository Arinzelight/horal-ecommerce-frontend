"use client";

const ProductDetails = ({ formData, onInputChange }) => {
  return (
    <div className="mb-6  ">
      <h3 className="text-lg font-medium mb-4">Details</h3>

      <div className="space-y-4 border-[1px] border-neutral-200 p-4 rounded-md">
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Name of Product/Dish"
            required
          />
        </div>

        <div>
          <label
            htmlFor="brandName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            value={formData.brand}
            onChange={(e) => onInputChange("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Brand Name"
          />
        </div>

        <div>
          <label
            htmlFor="productDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Description
          </label>
          <textarea
            id="productDescription"
            value={formData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Product details including material, purpose, compatibility"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

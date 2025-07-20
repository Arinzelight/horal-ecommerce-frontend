
import { specificationsByCategory } from "../utils/specification-by-category";

const SpecificationsSection = ({
  category,
  specification, 
  specifications, 
  onSpecificationChange, 
  onSpecificationsChange, 
}) => {
  // Get category name from category object or use directly if it's a string
  const categoryName = typeof category === "object" ? category.name : category;

  // Get specifications for the selected category
  const relevantSpecs = specificationsByCategory[categoryName] || [];

  if (relevantSpecs.length === 0 && !onSpecificationsChange) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>

      <div className="space-y-4 border border-gray-200 p-6 rounded-lg bg-white">
        <p className="text-sm text-gray-600 mb-4">
          Provide detailed specifications applicable to your {categoryName}{" "}
          product
        </p>

        {/* Structured Specifications (Key-Value Pairs) */}
        {relevantSpecs.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-800 border-b pb-2">
              Standard Specifications
            </h4>
            {relevantSpecs.map((spec) => (
              <div key={spec.key}>
                <label
                  htmlFor={spec.key}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {spec.label}
                </label>
                <input
                  type="text"
                  id={spec.key}
                  value={specification?.[spec.key] || ""}
                  onChange={(e) =>
                    onSpecificationChange(spec.key, e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={spec.placeholder}
                />
              </div>
            ))}
          </div>
        )}

        {/* Free-form Additional Specifications */}
        {onSpecificationsChange && (
          <div className="space-y-2">
            {relevantSpecs.length > 0 && (
              <h4 className="text-md font-medium text-gray-800 border-b pb-2 mt-6">
                Additional Specifications
              </h4>
            )}
            <label
              htmlFor="additionalSpecifications"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {relevantSpecs.length === 0
                ? "Product Specifications"
                : "Other Specifications"}
            </label>
            <textarea
              id="additionalSpecifications"
              rows={4}
              value={specifications || ""}
              onChange={(e) => onSpecificationsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any additional specifications not covered above (e.g., warranty details, special features, care instructions, etc.)"
            />
            <p className="text-xs text-gray-500">
              Use this field for any specifications not covered in the standard
              fields above
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificationsSection;

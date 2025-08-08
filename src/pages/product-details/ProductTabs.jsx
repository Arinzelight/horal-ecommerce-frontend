import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import ProductReviewsList from "./ProductReview";
import ProductReviewForm from "./ProductReviewForm";
import StarRating from "../../utils/star-rating";
import SafeProductDescription from "../../utils/SafeProductDescription";

export default function ProductTabs({
  description,
  specification = {},
  specifications,
  reviewsList = [],
  rating,
  reviews,
  productId,
}) {
  const [activeTab, setActiveTab] = useState("Description");

  // Helper function to check if we have any specifications to show
  const hasSpecifications = () => {
    const hasStructuredSpecs = Object.keys(specification).length > 0;
    const hasFreeFormSpecs = specifications && specifications.trim();
    return hasStructuredSpecs || hasFreeFormSpecs;
  };

  // Helper function to check if structured specifications have any valid values
  const hasValidStructuredSpecs = () => {
    return Object.entries(specification).some(([key, value]) => {
      return value && !(Array.isArray(value) && value.length === 0);
    });
  };

  return (
    <div className="mb-12">
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {["Description", "Reviews", "Specifications"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-1 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-primary-700 text-primary-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="prose max-w-none">
        {activeTab === "Description" && (
          <div className="text-gray-700 text-md">
            <SafeProductDescription description={description} />
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="text-gray-700">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              {/* Left column - Review list */}
              <div className="md:col-span-2 bg-gray-50 w-full md:w-[50%] rounded-lg p-4">
                <ProductReviewsList reviews={reviewsList} />
              </div>

              {/* Right column - Rating summary and review form */}
              <div className="bg-gray-50 rounded-lg p-4 w-full md:w-[50%]">
                <div className="mb-6 border-b border-gray-400 pb-4">
                  <div className="">
                    <div className="flex text-secondary my-2">
                      <StarRating
                        rating={rating || 0}
                        reviews={reviews || 0}
                        size={18}
                        showAverageRating={true}
                      />
                    </div>
                  </div>
                </div>
                <ProductReviewForm product_id={productId} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "Specifications" && (
          <div className="text-gray-700">
            {hasSpecifications() ? (
              <div className="space-y-6">
                {/* Structured Specifications - Only show if there are valid values */}
                {hasValidStructuredSpecs() && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Product Specifications
                    </h4>
                    <div className="bg-gray-50 rounded-lg pt-2">
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(specification).map(([key, value]) => {
                          // Skip empty values
                          if (
                            !value ||
                            (Array.isArray(value) && value.length === 0)
                          ) {
                            return null;
                          }

                          return (
                            <div
                              key={key}
                              className="flex text-xs "
                            >
                              <span className="w-1/3 lg:w-1/5 font-medium text-gray-800 capitalize">
                                {key.replace(/_/g, " ")}:
                              </span>
                              <span className="w-2/3 text-gray-700">
                                {Array.isArray(value)
                                  ? value.join(", ")
                                  : value}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Specifications (Free-form text) */}
                {specifications && specifications.trim() && (
                  <div>
                    <h4 className="text-sm font-semibold  text-gray-900">
                      Additional Information
                    </h4>
                    <div className="bg-gray-50 rounded-lg pt-2">
                      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {specifications}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              
              <div className="text-center py-8 text-gray-500">
                <p>No specifications available for this product.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

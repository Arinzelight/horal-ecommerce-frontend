
import { useState } from "react"
import { FaStar, FaRegStar } from "react-icons/fa"
import ProductReviewsList from "./ProductReview"
import ProductReviewForm from "./ProductReviewForm"
import StarRating from "../../utils/star-rating"

export default function ProductTabs({
  description,
  specifications = {},
  reviewsList = [],
  rating,
  reviews,
}) {
  const [activeTab, setActiveTab] = useState("Description")


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
          <div className="text-gray-700">
            <p>{description}</p>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="text-gray-700">
            <div className="flex flex-col md:flex-row justify-between  mb-4">
              {/* Left column - Review list */}
              <div className="md:col-span-2 bg-gray-50 w-full md:w-[50%] rounded-lg p-4">
                <ProductReviewsList reviews={reviewsList} />
              </div>

              {/* Right column - Rating summary and review form */}
              <div className="bg-gray-50 rounded-lg p-4 w-full md:w-[50%]">
                <div className="mb-6 border-b border-gray-400 pb-4">
                  <div className="">
                    <div className="flex  text-secondary my-2">
                      <StarRating
                        rating={rating || 0}
                        reviews={reviews || 0}
                        size={18}
                        showAverageRating={true}
                      />
                    </div>
                  </div>
                </div>
                {/* This form should only be visible to logged in users who have purchased the product */}
                {/* implement authentication and purchase validation logic later */}
                <ProductReviewForm />
              </div>
            </div>
          </div>
        )}

        {activeTab === "Specifications" && (
          <div className="text-gray-700">
            {Object.keys(specifications).length > 0 ? (
              <div className="grid grid-cols-1  gap-4">
                {Object.entries(specifications).map(([key, value]) => {
                  // Skip empty arrays
                  if (Array.isArray(value) && value.length === 0) return null;

                  return (
                    <div key={key} className="flex">
                      <span className="w-1/3 font-medium capitalize">
                        {key.replace("_", " ")}:
                      </span>
                      <span className="w-2/3">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No specifications available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

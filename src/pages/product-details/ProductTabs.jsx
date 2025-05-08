
import { useState } from "react"
import { FaStar, FaRegStar } from "react-icons/fa"
import ProductReviewsList from "./ProductReview"
import ProductReviewForm from "./ProductReviewForm"

export default function ProductTabs({
  description,
  details = [],
  specifications = {},
  reviewsList = [],
  rating,
  reviews,
}) {
  const [activeTab, setActiveTab] = useState("Details")

  const renderRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-secondary" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-secondary" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-secondary" />)
      }
    }
    return stars
  }

  return (
    <div className="mb-12">
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {["Details", "Reviews", "Specifications"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-1 text-sm font-medium ${
                activeTab === tab ? "border-b-2 border-primary-700 text-primary-700" : "text-gray-500 hover:text-gray-700"
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
        {activeTab === "Details" && (
          <div className="text-gray-700">
            <p>{description}</p>
            {details && details.length > 0 && (
              <ul className="mt-4 space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="flex">
                    <span className="mr-2">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Review list */}
              <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                <ProductReviewsList reviews={reviewsList} />
              </div>

              {/* Right column - Rating summary and review form */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-6">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold">{rating.toFixed(1)}</h3>
                    <div className="flex justify-center text-secondary my-2">{renderRatingStars(rating)}</div>
                    <p className="text-sm text-gray-500">({reviews} Reviews)</p>
                  </div>
                </div>

                <ProductReviewForm />
              </div>
            </div>
          </div>
        )}

        {activeTab === "Specifications" && (
          <div className="text-gray-700">
            {Object.keys(specifications).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="w-1/3 font-medium">{key}:</span>
                    <span className="w-2/3">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Technical specifications and product details.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

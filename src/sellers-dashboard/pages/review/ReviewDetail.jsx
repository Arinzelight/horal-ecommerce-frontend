import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import StarRating from "../review/StarRating";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";

const ReviewDetail = ({
  productName,
  productImage,
  averageRating,
  totalReviews,
  reviews,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Ensure reviews is an array
  const reviewList = Array.isArray(reviews) ? reviews : [];

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviewList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviewList.length / itemsPerPage);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors"
      >
        <FaArrowLeft className="h-4 w-4 mr-2" />
        Back to Reviews
      </button>

      <div className="flex items-center border-b pb-4 mb-6">
        <img
          src={productImage || "/placeholder.svg?height=60&width=60"}
          alt={productName}
          className="w-16 h-16 object-cover rounded-lg mr-4"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{productName}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
          </p>
        </div>
        <div className="text-right">
          <StarRating rating={averageRating} size="lg" />
          <p className="text-sm text-gray-600 mt-1">
            {averageRating ? averageRating.toFixed(1) : "0.0"} out of 5
          </p>
        </div>
      </div>

      {reviewList.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No reviews available for this product.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {currentItems.map((review, index) => (
            <div
              key={review.id || index}
              className="border-b border-gray-100 pb-6 last:border-b-0"
            >
              <div className="flex items-center mb-3">
                {review?.image ? (
                  <img
                    src={review.image}
                    alt={review.user_full_name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 font-medium text-sm">
                    {review.user_full_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {review?.user_full_name || "Anonymous User"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {review.time_since_review || "Recently"}
                  </p>
                </div>
                <StarRating rating={review?.rating || 0} />
              </div>
              <p className="text-gray-700 leading-relaxed">
                {review?.comment || "No comment provided."}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, reviewList.length)} of{" "}
            {reviewList.length} reviews
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewDetail;

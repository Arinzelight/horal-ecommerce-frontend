import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import StarRating from "../review/StarRating";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination"; 

const ReviewDetail = ({
  productId,
  productName,
  productImage,
  averageRating,
  reviews,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

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
        className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
      >
        <FaArrowLeft className="h-4 w-4 mr-2" />
        Back to Reviews
      </button>

      <div className="flex items-center border-b pb-4 mb-6">
        <img
          src={productImage || "/placeholder.svg?height=60&width=60"}
          alt={productName}
          className="w-12 h-12 object-cover mr-4"
        />
        <div className="flex-1">
          <h2 className="text-lg font-medium">{productName}</h2>
        </div>
        <StarRating rating={averageRating} size="lg" />
      </div>

      <div className="space-y-6">
        {currentItems.map((review, index) => (
          <div key={index} className="pb-6">
            <div className="flex items-center mb-2">
              <img
                src={review.userAvatar || "/placeholder.svg?height=40&width=40"}
                alt={review.userName}
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <h3 className="font-medium">{review.userName}</h3>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Replaced custom pagination with Pagination component */}
      {totalPages > 1 && (
        <div className="mt-6">
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

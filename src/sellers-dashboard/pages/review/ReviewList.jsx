import { useState } from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";

export default function ReviewList({ reviews }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handleRowClick = (productId) => {
    navigate(`/sellers-dashboard/review/${productId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px] pb-2">
          
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-neutral-100 text-neutral-600 text-sm leading-normal">
                <th className="py-3 px-4 text-left w-24">Images</th>
                <th className="py-3 px-4 text-left min-w-[150px]">Product</th>
                <th className="py-3 px-4 text-left min-w-[100px]">Rating</th>
                <th className="py-3 px-4 text-left min-w-[120px]">
                  No of Review
                </th>
              </tr>
            </thead>
            <tbody className="text-neutral-600 text-sm">
              {currentItems.map((review) => (
                <tr
                  key={review.productId}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(review.productId)}
                >
                  <td className="py-3 px-4">
                    <img
                      src={
                        review.productImage ||
                        "/placeholder.svg?height=40&width=40"
                      }
                      alt={review.productName}
                      className="w-10 h-10 object-cover"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {review.productName}
                  </td>
                  <td className="py-3 px-4">
                    <StarRating rating={review.averageRating} />
                  </td>
                  <td className="py-3 px-4">{review.reviewCount} Reviews</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, reviews.length)} of {reviews.length}
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
}

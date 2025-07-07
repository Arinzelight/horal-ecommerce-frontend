import { FaStar, FaRegStar } from "react-icons/fa"

export default function ProductReviewsList({ reviews }) {
  console.log("Reviews:", reviews)
  return (
    <>
      <h3 className="font-medium mb-4">Review List</h3>

      <div className="space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex space-x-3 pb-4  border-gray-200">
              {/* reviewer avatar and details */}
              {/* <div className="flex-shrink-0">
                <img
                  src={review.user.avatar || "/placeholder.svg"}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div> */}
              <div className="flex-1">
                <div className="flex space-x-4 items-center mb-1">
                  <h4 className="font-medium text-sm">{review.user_full_name}</h4>
                  <span className="text-xs text-gray-500">{review.time_since_review}</span>
                </div>
                <div className="flex text-secondary mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < review.rating ? <FaStar /> : <FaRegStar />}</span>
                  ))}
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </>
  )
}

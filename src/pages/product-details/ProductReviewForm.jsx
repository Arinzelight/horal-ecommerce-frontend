import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function ProductReviewForm() {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted! Thank you for your feedback.");
    setUserRating(0);
    setReviewText("");
  };

  return (
    <div>
      <div>
        <h3 className="font-medium mb-2">Rate Product</h3>
        <div className="flex text-2xl mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingClick(star)}
              className="focus:outline-none"
            >
              {star <= userRating ? (
                <FaStar className="text-secondary" />
              ) : (
                <FaRegStar className="text-secondary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <h3 className="font-medium mb-2">Give your Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review"
          className="w-full p-3 border rounded-md mb-3 focus:outline-none focus:ring-1 focus:ring-primary-700"
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-colors"
        >
          Send Review
        </button>
      </form>
    </div>
  );
}

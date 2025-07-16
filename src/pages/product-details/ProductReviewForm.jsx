import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { createReview } from "../../redux/review/reviewThunk";


export default function ProductReviewForm({ product_id }) {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.reviews);

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!reviewText.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    if (!product_id) {
      toast.error("Product ID is required");
      return;
    }

    // Prepare data 
    const reviewData = {
      rating: userRating.toString(),
      comment: reviewText.trim()
    };

    try {
      const resultAction = await dispatch(createReview({ 
        product_id, 
        reviewData 
      }));

      if (createReview.fulfilled.match(resultAction)) {
        // Success case
        toast.success("Review submitted successfully!");
        
        // Reset form
        setUserRating(0);
        setReviewText("");
      } else if (createReview.rejected.match(resultAction)) {
        // Handle different types of errors
        const error = resultAction.payload;
        
        if (error?.message) {
          toast.error(error.message);
        } else if (error?.detail) {
          toast.error(error.detail);
        } else if (error?.non_field_errors) {
          toast.error(error.non_field_errors[0]);
        } else if (error?.rating) {
          toast.error(`Rating: ${error.rating[0]}`);
        } else if (error?.comment) {
          toast.error(`Comment: ${error.comment[0]}`);
        } else {
          toast.error("Failed to submit review. Please try again.");
        }
        // Reset form to allow resubmission
        setUserRating(0);
        setReviewText("");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Review submission error:", error);
    }
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
              className="focus:outline-none hover:scale-110 transition-transform"
              disabled={loading}
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
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || userRating === 0}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 rounded-md transition-colors"
        >
          {loading ? "Submitting..." : "Send Review"}
        </button>
      </form>
    </div>
  );
}
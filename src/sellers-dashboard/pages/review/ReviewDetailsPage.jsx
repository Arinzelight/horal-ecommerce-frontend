import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReviewDetail from "./ReviewDetail";
import EmptyState from "../../components/EmptyProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviewsForProduct } from "../../../redux/review/reviewThunk";

export default function ReviewDetailPage() {
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { reviews, loading: reviewsLoading } = useSelector(
    (state) => state.reviews
  );

  // Get product info from location state (passed from ReviewList)
  const productInfo = location.state || {};

  useEffect(() => {
    if (params?.id) {
      // Fix: Pass object with product_id property
      dispatch(fetchAllReviewsForProduct({ product_id: params.id })).finally(
        () => setLoading(false)
      );
    }
  }, [params?.id, dispatch]);

  if (reviewsLoading || loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-50 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-100 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!params?.id) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <EmptyState
          animationSrc="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
          message="Product not found or no reviews available"
        />
      </div>
    );
  }

  // Check if reviews data exists and has the expected structure
  if (!reviews || !reviews.reviews || reviews.reviews.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <EmptyState
          animationSrc="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
          message="No reviews found for this product"
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <ReviewDetail
        productId={params.id}
        productName={productInfo.title || "Product"}
        productImage={productInfo.image || productInfo.images}
        averageRating={reviews.total_rating}
        totalReviews={reviews.review_count}
        reviews={reviews.reviews}
      />
    </div>
  );
}

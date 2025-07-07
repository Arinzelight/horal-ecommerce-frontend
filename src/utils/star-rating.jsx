import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({
  rating,
  reviews = 0,
  size = 20,
  showReviewCount = true,
  showAverageRating = false, // New prop
}) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Render stars based on rating
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} size={size} className="text-secondary" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key={i} size={size} className="text-secondary" />
      );
    } else {
      stars.push(<FaRegStar key={i} size={size} className="text-secondary" />);
    }
  }

  return (
    <div className="">
      {showAverageRating && rating > 0 && (
        <div>
          <h3 className="text-neutral-700 font-bold text-2xl">
            {rating.toFixed(1)}{" "}
            <span className="text-neutral-500 text-sm">out of 5.0</span>
          </h3>
        </div>
      )}
      <div className="flex mr-2 mt-5">
        {stars}

        {showReviewCount && (
          <span className="text-gray-600 text-sm">
            ({reviews || 0} Review{reviews !== 1 ? "s" : ""})
          </span>
        )}
      </div>
    </div>
  );
}

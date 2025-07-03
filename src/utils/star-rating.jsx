import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({
  rating = 0,
  reviews = 0,
  size = 20,
  showReviewCount = true,
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
    <div className="flex items-center">
      <div className="flex mr-2">{stars}</div>
      {showReviewCount && (
        <span className="text-gray-600 text-sm">
          ({reviews || 0} Review{reviews !== 1 ? "s" : ""})
        </span>
      )}
    </div>
  );
}

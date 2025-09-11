import StarRating from "../../../utils/star-rating";

export default function ProductHeader({
  name,
  category,
  rating,
  reviews,
  displayPrice,
}) {
  return (
    <div>
      <h1 className="text-lg md:text-2xl lg:text-xl xl:text-4xl font-bold mb-1">
        {name}
      </h1>
      <p className="text-gray-600 mb-2 md:text-xl lg:text-lg xl:text-xl">
        {category}
      </p>

      {/* Ratings */}
      <div className="flex items-center mb-4">
        <StarRating
          rating={rating}
          reviews={reviews || 0}
          size={18}
          showReviewCount={true}
          showAverageRating={false}
        />
      </div>

      {/* Price */}
      <div className="md:text-xl lg:text-xl xl:text-3xl font-bold mb-4 mt-6">
        ₦{" "}
        {displayPrice
          ? Number(
              typeof displayPrice === "string"
                ? displayPrice.replace(/[^\d.-]/g, "")
                : displayPrice
            ).toLocaleString("en-NG", {
              maximumFractionDigits: 0,
            })
          : "0"}
      </div>
    </div>
  );
}

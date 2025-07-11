import { useState } from "react";
import SearchHeader from "../../components/Search";
import EmptyState from "../../components/EmptyProduct"
import ReviewList from "../review/ReviewList";
import { mockProductReviews } from "../../../data/mockReview";
import SectionHeader from "../../components/SectionHeader"
export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedReviewCount, setSelectedReviewCount] = useState("all");

  // Check if there are any reviews at all
  const hasReviews = mockProductReviews.length > 0;

  // Filter reviews based on search and filters
  const filteredReviews = mockProductReviews.filter((review) => {
    // Search filter
    if (
      searchQuery &&
      !review.productName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Rating filter
    if (selectedRating !== "all") {
      const rating = Number.parseFloat(selectedRating);
      if (review.averageRating < rating || review.averageRating >= rating + 1) {
        return false;
      }
    }

    // Review count filter
    if (selectedReviewCount !== "all") {
      const count = Number.parseInt(selectedReviewCount);
      if (review.reviewCount < count) {
        return false;
      }
    }

    return true;
  });

  // Check if we have search or filter applied
  const hasSearchOrFilter =
    searchQuery || selectedRating !== "all" || selectedReviewCount !== "all";

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterId, value) => {
    if (filterId === "rating") {
      setSelectedRating(value);
    } else if (filterId === "no of review") {
      setSelectedReviewCount(value);
    }
  };

  const filterOptions = [
    {
      title: "Rating",
      options: [
        { id: "all", label: "All" },
        { id: "5", label: "5 Stars" },
        { id: "4", label: "4 Stars" },
        { id: "3", label: "3 Stars" },
        { id: "2", label: "2 Stars" },
        { id: "1", label: "1 Star" },
      ],
      defaultValue: "all",
    },
    {
      title: "No of Review",
      options: [
        { id: "all", label: "All" },
        { id: "10", label: "10+" },
        { id: "20", label: "20+" },
        { id: "50", label: "50+" },
        { id: "100", label: "100+" },
      ],
      defaultValue: "all",
    },
  ];

  // Render content based on conditions
  const renderContent = () => {
    // If there are no reviews at all, show empty state
    if (!hasReviews) {
      return (
        <EmptyState
          animationSrc="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
          message="You do not have any review on a product on record"
        />
      );
    }

    // If there are reviews but no search results, show a message
    if (filteredReviews.length === 0 && hasSearchOrFilter) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">
            No reviews match your search criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedRating("all");
              setSelectedReviewCount("all");
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      );
    }

    // Otherwise show the review list
    return <ReviewList reviews={filteredReviews} />;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <SectionHeader title="Reviews" />

      {/* Search and Filter Header */}
      <div className="mt-8">
        <SearchHeader
          searchPlaceholder="Search Order ID"
          filterOptions={filterOptions}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </div>

      {renderContent()}
    </div>
  );
}


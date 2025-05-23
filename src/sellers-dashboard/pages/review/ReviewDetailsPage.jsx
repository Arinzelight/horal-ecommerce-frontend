import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { mockProductReviews, mockReviewDetails } from "../../../data/mockReview"
import ReviewDetail from "./ReviewDetail"
import EmptyState from "../../components/EmptyProduct"

export default function ReviewDetailPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [productId, setProductId] = useState(null)
  const [productDetails, setProductDetails] = useState(null)

  useEffect(() => {
    if (params?.id) {
      const id = Number.parseInt(params.id )
      setProductId(id)

      // Find product details
      const product = mockProductReviews.find((p) => p.productId === id)
      if (product) {
        setProductDetails({
          ...product,
          reviews: mockReviewDetails[id] || [],
        })
      }

      setLoading(false)
    }
  }, [params])

  if (loading) {
    return <div className="p-6 bg-white rounded-lg shadow">Loading...</div>
  }

  if (!productDetails) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <EmptyState
          animationSrc="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
          message="Product not found or no reviews available"
        />
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <ReviewDetail
        productId={productDetails.productId}
        productName={productDetails.productName}
        productImage={productDetails.productImage}
        averageRating={productDetails.averageRating}
        reviews={productDetails.reviews}
      />
    </div>
  )
}

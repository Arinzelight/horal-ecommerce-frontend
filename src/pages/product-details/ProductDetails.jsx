import { Link, useParams } from "react-router-dom";
import ProductImageGallery from "./ProductImageSection";
import ProductInfo from "./ProductInfo";
import ProductShareSection from "./ProductShareSection";
import SellerInfo from "./SellerInfo";
import ProductTabs from "./ProductTabs";
// import SimilarProducts from "../../components/SimilarProduct"; // Uncomment if used
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlug } from "../../redux/product/thunks/productThunk";
import { clearProduct } from "../../redux/product/slices/productSlice";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader";
import { toast } from "../../components/toast";
import { useCart } from "../../hooks/useCart";
import { addToRecentlyViewed } from "../../redux/product/slices/productSlice";
import { fetchAllReviewsForProduct } from "../../redux/review/reviewThunk";

export default function ProductDetailsPage() {
  const { productSlug } = useParams();
  const dispatch = useDispatch();
  const { loadCart } = useCart();

  let { product, loading, error, seller_data, reviews } = useSelector(
    (state) => state.products || {}
  );



  // Add product to recently viewed when the component mounts
  useEffect(() => {
    if (product) {
      dispatch(addToRecentlyViewed(product));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (productSlug) {
      dispatch(fetchProductBySlug({ slug: productSlug }));
    }

    // Load cart  on component mount
    loadCart();

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, productSlug, loadCart]);

  useEffect(() => {
    if (product?.id) {
      dispatch(fetchAllReviewsForProduct({ product_id: product.id }));
    }
  }, [dispatch, product?.id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  const averageRating =
    reviews?.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold">
        <InitialLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-md p-6 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-700 mb-4">
            We're having trouble loading this product. Please try again later.
          </p>
          <p className="text-sm text-gray-500">
            Error details: {error.message || error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-md p-6 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-700 mb-4">
            We couldn't find the product you're looking for. It might have been
            removed or the link might be incorrect.
          </p>
          <Link
            to="/products"
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition"
          >
            Browse Other Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="pt-6">
        <div className="flex flex-col md:flex-col lg:flex-row lg:gap-8 xl:gap-14">
          <div className="md:w-full lg:w-[500px]">
            <ProductImageGallery
              images={product?.images}
              hasVideo={product?.live_video_url}
              productName={product?.title}
            />
          </div>

          <div className="mt-4 md:mt-2 lg:mt-0 lg:h-[661px]">
            <ProductInfo
              name={product?.title}
              category={product?.category_object?.category?.name}
              rating={averageRating || 0}
              reviews={reviews?.length || 0}
              price={product?.price}
              variants={product?.variants_details || []}
              productId={product?.id}
            />
          </div>
        </div>

        <ProductShareSection onCopyLink={copyLink} />
        <SellerInfo
          seller={seller_data}
          hasVideo={product?.live_video_url || ""}
        />

        <div className="md:pt-42 lg:pt-0 lg:mt-0 xl:mt-0">
          <ProductTabs
            description={product?.description}
            details={product?.details}
            specification={product?.specification}
            specifications={product?.specifications}
            reviewsList={reviews}
            rating={averageRating}
            reviews={reviews?.length || 0}
            productId={product?.id}
          />
        </div>

        {/* Uncomment if SimilarProducts is ready */}
        {/* <SimilarProducts products={similarProducts} title={"You May Also Like"} /> */}
      </div>
    </div>
  );
}

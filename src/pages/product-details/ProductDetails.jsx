import { Link, useParams } from "react-router-dom";
import { mockProducts } from "../../data/mockProducts";
import ProductImageGallery from "./ProductImageSection";
import ProductInfo from "./ProductInfo";
import ProductShareSection from "./ProductShareSection";
import SellerInfo from "./SellerInfo";
import ProductTabs from "./ProductTabs";
import SimilarProducts from "../../components/SimilarProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchingProductById } from "../../redux/product/thunks/productThunk";
import { clearProduct } from "../../redux/product/slices/productSlice";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader";
export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {products, product,loading, error} = useSelector((state) => state.products);

  const productList = products.results || [];
  // Find the category of the product based on the ID
  const category = productList?.find(p => p.id ===  id)?.category_name;
  console.log("Product category:", category);
  useEffect(() => {
    if (id) {
      if (category) {
        dispatch(fetchingProductById({ category, id }));
      } else {
        dispatch(fetchingProductById({ id }));
      }
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, category]);

  // const product =
  //   mockProducts.find((p) => p.id === Number(id)) || mockProducts[0];

  // const similarProducts = mockProducts
  //   .filter((p) => p.category === product.category && p.id !== product.id)
  //   .slice(0, 4);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold"><InitialLoader /></div>;
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

  // add the ! operator to check if product is falsy later
  // for now lets just display a message acting as if the product is not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-md p-6 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-700 mb-4">
            We couldn't find the product you're looking for. It might have been
            removed or the link might be incorrect.
          </p>
          <Link
            to="/products"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Browse Other Products
          </Link>
        </div>
      </div>
    );
  }

  console.log("Product details:", product);

  return (
    <div className="min-h-screen ">
      <div className="pt-6  ">
        <div className="flex flex-col md:flex-col lg:flex-row lg:gap-8 xl:gap-14">
          <div className=" md:w-full lg:w-[500px] ">
            <ProductImageGallery
              images={product.images?.[0]  }
              hasVideo={product.live_video_url}
              productName={product.title}
            />
          </div>

          <div className="mt-4 md:mt-2 lg:mt-0  lg:h-[661px] ">
            <ProductInfo
              name={product.title}
              category={product.category_name}
              rating={product.rating}
              reviews={product.reviews}
              price={product.price}
              colors={product.variants_details?.color}
              sizes={product.variants_details?.size_value}
            />
          </div>
        </div>

        <ProductShareSection onCopyLink={copyLink} />
        <SellerInfo seller={product.seller} hasVideo={product.hasVideo} />
        <div className="md:pt-42 lg:pt-0 lg:mt-0 xl:mt-0 ">
          <ProductTabs
            description={product.description}
            details={product.details}
            specifications={product.specifications}
            reviewsList={product.reviewsList}
            rating={product.rating}
            reviews={product.reviews}
          />
        </div>

        {/* <SimilarProducts
          products={similarProducts}
          title={"You May Also Like"}
        /> */}
      </div>
    </div>
  );
}

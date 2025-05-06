import { useParams } from "react-router-dom";
import { mockProducts } from "../../data/mockProducts";
import ProductImageGallery from "./ProductImageSection";
import ProductInfo from "./ProductInfo";
import ProductShareSection from "./ProductShareSection";
import SellerInfo from "./SellerInfo";
import ProductTabs from "./ProductTabs";
import SimilarProducts from "../../components/SimilarProduct";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product =
    mockProducts.find((p) => p.id === Number(id)) || mockProducts[0];

  // Filter similar products (same category but different ID)
  const similarProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen lg:mx-auto sm:px-16 px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Product Images */}
        <ProductImageGallery
          images={product.images || [product.image]}
          hasVideo={product.hasVideo}
          productName={product.name}
        />

        {/* Right Column - Product Details */}
        <ProductInfo
          name={product.name}
          category={product.category}
          rating={product.rating}
          reviews={product.reviews}
          price={product.price}
          colors={product.colors}
          sizes={product.sizes}
        />
      </div>

      {/* Share section */}
      <ProductShareSection onCopyLink={copyLink} />

      {/* Seller information and video section */}
      <SellerInfo seller={product.seller} hasVideo={product.hasVideo} />

      {/* Tabs */}
      <ProductTabs
        description={product.description}
        details={product.details}
        specifications={product.specifications}
        reviewsList={product.reviewsList}
        rating={product.rating}
        reviews={product.reviews}
      />

      {/* Similar products */}
      <SimilarProducts products={similarProducts} title={"You May Also Like"}  />
    </div>
  );
}


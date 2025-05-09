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

  const similarProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen lg:mx-auto md:mx-0 ">
      <div className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:px-0">
          <div className="md:max-w-[530px]">
            <ProductImageGallery
              images={product.images || [product.image]}
              hasVideo={product.hasVideo}
              productName={product.name}
            />
          </div>

          <div className="mt-6 md:mt-0 lg:max-w-[530px]  xl:max-w-[530px]  xl:-ml-38">
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
        </div>

        <ProductShareSection onCopyLink={copyLink} />
        <SellerInfo seller={product.seller} hasVideo={product.hasVideo} />
        <ProductTabs
          description={product.description}
          details={product.details}
          specifications={product.specifications}
          reviewsList={product.reviewsList}
          rating={product.rating}
          reviews={product.reviews}
        />
        <SimilarProducts
          products={similarProducts}
          title={"You May Also Like"}
        />
      </div>
    </div>
  );
}

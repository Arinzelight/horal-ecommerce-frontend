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
    <div className="min-h-screen ">
      <div className="pt-6  ">
        <div className="flex flex-col md:flex-col lg:flex-row lg:gap-8 xl:gap-14">
          <div className=" md:w-full lg:w-[500px] ">
            <ProductImageGallery
              images={product.images || [product.image]}
              hasVideo={product.hasVideo}
              productName={product.name}
            />
          </div>

          <div className="mt-4 md:mt-2 lg:mt-0  lg:h-[661px] ">
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

        <SimilarProducts
          products={similarProducts}
          title={"You May Also Like"}
        />
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaChevronRight,
  FaChevronLeft,
  FaCheck,
  FaPlay,
  FaLink,
  FaPlusCircle,
  FaMinusCircle,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { mockProducts } from "../../data/mockProducts";
import ProductCard from "../../components/ProductCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product =
    mockProducts.find((p) => p.id === Number(id)) || mockProducts[0];
  const imageContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");

  const nextImage = () => {
    if (product?.images) {
      const nextIndex = (selectedImage + 1) % product.images.length;
      setSelectedImage(nextIndex);
      scrollToImage(nextIndex);
    }
  };

  const previousImage = () => {
    if (product?.images) {
      const prevIndex =
        selectedImage === 0 ? product.images.length - 1 : selectedImage - 1;
      setSelectedImage(prevIndex);
      scrollToImage(prevIndex);
    }
  };

  const scrollToImage = (index) => {
    if (imageContainerRef.current) {
      const container = imageContainerRef.current;
      const imageWidth = container.scrollWidth / product.images.length;
      container.scrollTo({
        left: index * imageWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (imageContainerRef.current) {
      const container = imageContainerRef.current;
      const scrollPos = container.scrollLeft;
      const imageWidth = container.scrollWidth / product.images.length;
      const currentIndex = Math.round(scrollPos / imageWidth);
      setSelectedImage(currentIndex);
      setScrollPosition(scrollPos);
    }
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

   const handlers = useSwipeable({
     onSwipedLeft: nextImage,
     onSwipedRight: previousImage,
     preventDefaultTouchmoveEvent: true,
     trackMouse: true,
   });

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  // Filter similar products (same category but different ID)
  const similarProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-secondary" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-secondary" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-secondary" />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Mobile view - Product images first */}

      <div className="md:hidden mb-6 relative">
        {/* Horizontal scrollable images */}
        <div
          ref={imageContainerRef}
          className="relative w-full overflow-x-auto snap-x snap-mandatory flex no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
          {...handlers}
        >
          {product.images?.map((img, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-start relative"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                loading="lazy"
                src={img || product.img}
                alt={`${product.name} ${index + 1}`}
                
                className="w-full h-auto object-contain"
              />

              {/* Image counter positioned at bottom left - only visible for active image */}
              {selectedImage === index && (
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {index + 1}/
                  {product.images?.length + (product.hasVideo ? 1 : 0)}
                </div>
              )}
            </div>
          ))}

          {/* Product video in mobile view */}
          {product.hasVideo && (
            <div className="w-full flex-shrink-0 snap-start flex items-center justify-center bg-gray-100 relative">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
                  <FaPlay className="text-blue-600 ml-1" />
                </div>
                <p className="text-sm text-gray-600">Watch Product Video</p>
              </div>
              {/* Counter for video - only visible when video is active */}
              {selectedImage === product.images?.length && (
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {product.images?.length + 1}/{product.images?.length + 1}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Product Images (Desktop) */}
        <div className="hidden md:block">
          <div className="">
            {/* Main product image */}
            <div className="relative mb-4">
              <div className="relative h-[400px] rounded-sm overflow-hidden mb-2 group bg-white flex">
                <img
                  loading="lazy"
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-[600px] h-full object-cover"
                />
              </div>

              {/* Thumbnail images with horizontal scroll */}
              {product.images && product.images.length > 1 && (
                <div className="relative">
                  <div className="overflow-x-auto flex space-x-2 scrollbar-hide">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        className={`rounded-md overflow-hidden border-2 flex-shrink-0 w-20 h-20 ${
                          selectedImage === index
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                        onClick={() => {
                          setSelectedImage(index);
                          scrollToImage(index);
                        }}
                        aria-label={`Thumbnail ${index + 1}`}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Scroll buttons for thumbnails */}
                  {product.images.length > 5 && (
                    <>
                      <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                        onClick={previousImage}
                      >
                        <FaChevronLeft className="h-3 w-3" />
                      </button>
                      <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                        onClick={nextImage}
                      >
                        <FaChevronRight className="h-3 w-3" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div>
          <div className="">
            <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
            <p className="text-gray-600 mb-2 text-sm">{product.category}</p>

            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderRatingStars(product.rating)}
              </div>
              <span className="text-gray-600 text-sm">
                ({product.reviews || 0} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold mb-4 mt-12">
              ₦{" "}
              {product.price.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </div>

            {/* Color options */}
            {product.colors && product.colors.length > 0 && (
              <div className="my-8">
                <div className="flex justify-between items-center mb-5 mr-12">
                  <div className="flex flex-col gap-4">
                    <div className="text-sm font-bold">Available color</div>
                    <div className="flex space-x-4">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            selectedColor === color
                              ? "ring-2 ring-secondary ring-offset-2"
                              : ""
                          }`}
                          style={{ backgroundColor: color.code }}
                          onClick={() => handleColorSelect(color)}
                          aria-label={color.name}
                        >
                          {selectedColor === color && (
                            <FaCheck className="text-white text-xs " />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="text-sm font-bold -ml-4">Quantity</div>
                    <div className="flex items-center">
                      <button
                        onClick={decrementQuantity}
                        className="w-6 h-6 text-xl flex items-center justify-center rounded-full"
                      >
                        <FaMinusCircle className="text-xl text-primary" />
                      </button>
                      <span className="w-8 text-center text-xl font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="w-6 h-6 text-xl flex items-center justify-center rounded-full"
                      >
                        <FaPlusCircle className="text-xl text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Size options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6 mt-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Available Size:{" "}
                  <span className="font-normal">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-1 text-sm rounded-4xl border ${
                        selectedSize === size
                          ? "bg-primary text-white"
                          : "bg-white text-gray-800 border-primary"
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex mt-12 flex-col sm:flex-row gap-3 mb-8">
              <button className="flex-1 bg-secondary hover:bg-orange-700 text-white py-3 rounded-md font-medium transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 text-orange border border-secondary text-secondary hover:border-gray-400 py-3 rounded-md font-medium transition-colors">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share section */}
      <div className="my-8">
        <h3 className="text-sm font-medium text-gray-700 uppercase mb-3">
          Share this product
        </h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={copyLink}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            Copy link
            <FaLink className="ml-2" />
          </button>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <FaFacebook size={18} />
          </a>
          <a href="#" className="text-green-600 hover:text-green-800">
            <FaWhatsapp size={18} />
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-800">
            <FaInstagram size={18} />
          </a>
        </div>
      </div>

      {/* Seller information and video section */}
      <div className="md:grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
        {/* Seller information */}
        <div className="py-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
              {product.seller?.avatar ? (
                <img
                  src={product.seller.avatar || "/placeholder.svg"}
                  alt={product.seller.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
                  {product.seller?.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{product.seller?.name}</h3>
              {product.seller?.isVerified && (
                <div className="flex items-center text-xs text-white bg-primary-900 rounded-full px-2 py-1">
                  <FaCheck className="text-white mr-1" />
                  <span>Verified Seller</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="grid grid-cols-5 gap-4">
              <p className="text-gray-600 col-span-2">Country:</p>
              <p className="col-span-3">{product.seller?.country || "N/A"}</p>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <p className="text-gray-600 col-span-2">State:</p>
              <p className="col-span-3">{product.seller?.state || "N/A"}</p>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <p className="text-gray-600 col-span-2">LGA:</p>
              <p className="col-span-3">{product.seller?.lga || "N/A"}</p>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <p className="text-gray-600 col-span-2">Address:</p>
              <p className="col-span-3">{product.seller?.address || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Video section (if available) */}
        {product.hasVideo && (
          <div className="border mt-4 rounded-lg p-4 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-md hover:shadow-lg transition-shadow">
                <FaPlay className="text-blue-600 ml-1" />
              </div>
              <p className="text-sm text-gray-600">Watch Product Video</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {["Details", "Reviews", "Specifications"].map((tab) => (
              <button
                key={tab}
                className={`py-3 px-1 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="prose max-w-none">
          {activeTab === "Details" && (
            <div className="text-gray-700">
              <p>{product.description}</p>
              {product.details && (
                <ul className="mt-4 space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="text-gray-700">
              <p>Customer reviews for this product will appear here.</p>
            </div>
          )}

          {activeTab === "Specifications" && (
            <div className="text-gray-700">
              {product.specifications ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex">
                        <span className="w-1/3 font-medium">{key}:</span>
                        <span className="w-2/3">{value}</span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p>Technical specifications and product details.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Similar products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}


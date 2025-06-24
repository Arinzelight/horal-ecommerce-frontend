import { useState, useRef, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

export default function ProductImageGallery({
  images,
  hasVideo = false,
  productName,
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const imageContainerRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const nextImage = () => {
    if (images) {
      const nextIndex = (selectedImage + 1) % images.length;
      setSelectedImage(nextIndex);
      scrollToImage(nextIndex);
    }
  };

  const previousImage = () => {
    if (images) {
      const prevIndex =
        selectedImage === 0 ? images.length - 1 : selectedImage - 1;
      setSelectedImage(prevIndex);
      scrollToImage(prevIndex);
    }
  };

  const scrollToImage = (index) => {
    if (imageContainerRef.current) {
      const container = imageContainerRef.current;
      const imageWidth = images ? container.scrollWidth / images.length : 0;
      container.scrollTo({
        left: index * imageWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollTimeoutRef = useRef(null);
  const placeholderImg =
    "https://ui-avatars.com/api/?name=Image&background=cccccc&color=ffffff&size=400";

  const handleScroll = useCallback(() => {
    if (imageContainerRef.current) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        const container = imageContainerRef.current;
        const scrollPos = container.scrollLeft;
        const imageWidth = container.scrollWidth / images.length;
        const currentIndex = Math.round(scrollPos / imageWidth);
        setSelectedImage(currentIndex);
      }, 100);
    }
  }, [images?.length]);

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const container = thumbnailsRef.current;
      const scrollAmount = direction === "left" ? -100 : 100;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: previousImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden mb-2 relative">
        <div
          ref={imageContainerRef}
          className="relative w-full overflow-x-auto snap-x snap-mandatory flex no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
          {...handlers}
        >
          {images?.map((img, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-start relative"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                loading="lazy"
                src={placeholderImg}
                alt={`${productName} ${index + 1}`}
                className="w-full h-auto object-contain"
              />

              {/* Image counter positioned at bottom left - only visible for active image */}
              {selectedImage === index && (
                <div className="absolute bottom-2 left-2 bg-white text-secondary text-xs px-2 py-1 rounded">
                  {index + 1}/{images?.length + (hasVideo ? 1 : 0)}
                </div>
              )}
            </div>
          ))}

          {/* Product video in mobile view */}
          {hasVideo && (
            <div className="w-full flex-shrink-0 snap-start flex items-center justify-center bg-gray-100 relative">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
                  <FaPlay className="text-primary-700 ml-1" />
                </div>
                <p className="text-sm text-gray-600">Watch Product Video</p>
              </div>
              {/* Counter for video - only visible when video is active */}
              {selectedImage === images?.length && (
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {images?.length + 1}/{images?.length + 1}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block ">
        <div className="relative mb-4 ">
          <div className="relative md:h-[505px]  overflow-hidden mb-2 group bg-white flex">
            <img
              loading="lazy"
              src={placeholderImg || images?.[selectedImage]}
              alt={productName}
              className="rounded w-full h-full object-cover "
            />
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full cursor-pointer text-white p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 cursor-pointer text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Thumbnail images with horizontal scroll */}
          {images && images.length > 1 && (
            <div className="relative">
              {images.length > 3 && (
                <button
                  onClick={() => scrollThumbnails("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
                  aria-label="Scroll thumbnails left"
                >
                  <FaChevronLeft className="h-3 w-3" />
                </button>
              )}

              <div
                ref={thumbnailsRef}
                className="overflow-x-auto flex  scrollbar-hide"
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={` overflow-hidden border-2 flex-shrink-0 w-30 h-26 md:w-40 md:h-36 lg:w-30 lg:h-26 ${
                      selectedImage === index
                        ? "border-secondary"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedImage(index);
                      scrollToImage(index);
                    }}
                    aria-label={`Thumbnail ${index + 1}`}
                  >
                    <img
                      src={placeholderImg || img.url}
                      alt={`${productName} view ${index + 1}`}
                      className="rounded w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {images.length > 4 && (
                <button
                  onClick={() => scrollThumbnails("right")}
                  className="absolute right-0  top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
                  aria-label="Scroll thumbnails right"
                >
                  <FaChevronRight className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

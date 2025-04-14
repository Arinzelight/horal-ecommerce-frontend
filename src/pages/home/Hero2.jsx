import { useState, useEffect, useRef } from "react";
import hero1 from "../../assets/images/Billboard1.png";
import hero2 from "../../assets/images/Billboard2.png";
import hero3 from "../../assets/images/Billboard3.png";
import useMobile from "../../hooks/use-mobile";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  const isMobile = useMobile();

  // Simplified slides array with just images
  const slides = [{ image: hero1 }, { image: hero2 }, { image: hero3 }];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    // Auto slide
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[4px] w-full">
      {/* Image Carousel */}
      <div className={`relative ${isMobile ? "h-[300px]" : "h-[500px]"}`}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-gray-400/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

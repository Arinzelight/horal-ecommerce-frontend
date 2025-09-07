import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import hero1 from "../../assets/images/Hero1.png";
import hero2 from "../../assets/images/Hero2.png";
import hero3 from "../../assets/images/Hero3.png";
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const slideInterval = useRef(null);

  const slides = [
    {
      image: hero1,
      title: (
        <>
          <h2 className="text-primary text-lg font-semibold">ESCROW SERVICE</h2>
        </>
      ),
      subtitle: (
        <>
          SHOP WITH <br /> <span className="text-primary">HORAL,</span> LETS{" "}
          <br />
          KEEP YOUR
          <br /> PAYMENTS <span className="text-secondary">SAFE</span> <br />
          AND <span className="text-secondary">SECURED</span>
        </>
      ),
      textColors: ["white", "#4CAF50", "#FF6B00", "white"],
    },
    {
      image: hero3,
      title: (
        <>
          <h2 className="text-white text-lg font-semibold">EASY SHOPPING</h2>
        </>
      ),
      subtitle: (
        <>
          ENJOY A <span className="text-green-500">BETTER</span> <br />
          AND <span className="text-green-500">FASTER</span> <br />
          SHOPPING
          <br /> EXPERIENCE WITH <br />
          JUST <span className="text-secondary">ONE CLICK</span>
        </>
      ),
      textColors: ["white", "#FF6B00", "white", "#4CAF50", "white", "white"],
    },
    {
      image: hero2,
      title: (
        <>
          <h2 className="text-secondary text-lg font-semibold">BE VERIFIED</h2>
        </>
      ),
      subtitle: (
        <>
          BECOME A <br />
          <span className="text-secondary">VERIFIED </span> SELLER <br />
          TODAY AND
          <br /> ENJOY{" "}
          <span className="text-secondary">
            HIGH <br />
            VISIBILTY
          </span>
          FOR <br /> YOUR PRODUCT
        </>
      ),
    },
  ];

  const nextSlide = () => {
    setAnimating(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setAnimating(true);
    }, 10);
  };

  const prevSlide = () => {
    setAnimating(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setAnimating(true);
    }, 10);
  };

  useEffect(() => {
    setAnimating(true);

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
    <div className="relative overflow-hidden rounded-[4px]">
      {/* Carousel */}
      <div className="relative h-[300px] md:h-[500px] w-full  lg:h-[500px] xl:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center transition-opacity duration-500 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container mx-auto px-6 md:px-12">
              {/* Text content with conditional alignment */}
              <div
                className={`max-w-md ${
                  index === 1 ? "ml-auto text-right" : "text-left"
                } ${
                  animating && currentSlide === index
                    ? "animate-slide-in-left"
                    : ""
                }`}
              >
                <div className="mb-2">{slide.title}</div>
                <div className="text-xl md:text-2xl lg:text-4xl  font-bold leading-tight">
                  {slide.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        {/* <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
        >
          <FaChevronRight />
        </button> */}
        {/* Navigation arrows */}

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


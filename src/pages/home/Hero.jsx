import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import hero1 from "../../assets/images/Hero1.png";
import hero2 from "../../assets/images/Hero2.png";
import hero3 from "../../assets/images/Hero3.png";
import useMobile from "../../hooks/use-mobile";
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const slideInterval = useRef(null);
  const isMobile = useMobile();

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
                <div className="text-xl md:text-4xl font-bold leading-tight">
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

import React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const heroSlides = [
//   {
//     image: hero1,
//     title: (
//       <>
//       <h2 className="text-secondary text-lg font-semibold">BE VERIFIED</h2>
//       </>
//     ),
//     subtitle: (
//       <>
//         BECOME A <br />
//         <span className="text-secondary">VERIFIED </span> SELLER{" "}
//         <br />
//         TODAY AND
//         <br /> ENJOY <span className="text-secondary">HIGH <br />VISIBILTY</span>
//         FOR <br /> YOUR PRODUCT
//       </>
//     ),
//     textColors: [
//       "white",
//       "#4CAF50",
//       "white",
//       "#4CAF50",
//       "white",
//       "white",
//       "#FF6B00",
//       "",
//     ],
//   },
//   {
//     image: hero2,
//     title: "EASY SHOPPING",
//     subtitle: (
//       <>
//         ENJOY A <span className="text-green-500">BETTER</span> <br />
//         AND <span className="text-green-500">FASTER</span> <br />
//         SHOPPING
//         <br /> EXPERIENCE WITH <br />
//         JUST <span className="text-secondary">ONE CLICK</span>
//       </>
//     ),
//     textColors: ["white", "#FF6B00", "white", "#4CAF50", "white", "white"],
//   },
//   {
//     image: hero3,
//     title: "ESCROW SERVICE",
//     subtitle: (
//       <>
//         SHOP WITH <br /> <span className="text-primary">HORAL,</span> LETS{" "}
//         <br />
//         KEEP YOUR
//         <br /> PAYMENTS <span className="text-secondary">SAFE</span> <br />
//         AND <span className="text-secondary">SECURED</span>
//       </>
//     ),
//     textColors: ["white", "#4CAF50", "#FF6B00", "white"],
//   },
// ];

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
//     );
//   };

//   return (
//     <div className="h-full flex items-center">
//       {heroSlides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute rounded-[4px] inset-0 transition-opacity duration-500 ${
//             index === currentSlide ? "opacity-100" : "opacity-0"
//           }`}
//           style={{
//             backgroundImage: `url(${slide.image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="container mx-auto px-6 md:px-12">
//             <div className="max-w-md">
//               {/* <div className="max-w-md"> */}
//                 <h2 className="text-lg font-semibold md:text-4xl mb-4 animate-slideLeft">
//                   {slide.title}
//                 </h2>
//                 <div className="text-3xl md:text-4xl font-bold leading-tight">
//                   {slide.subtitle}
//                 </div>
//               {/* </div> */}
//             </div>
//           </div>
//         </div>
//       ))}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full"
//       >
//         <FaChevronLeft className="text-white" size={24} />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full"
//       >
//         <FaChevronRight className="text-white" size={24} />
//       </button>
//     </div>
//   );
// };

// export default Hero;

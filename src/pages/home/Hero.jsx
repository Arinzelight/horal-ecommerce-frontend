import React, { useState, useEffect } from "react";
import IMG1 from "../../assets/images/home-banners/computer.png";
import IMG2 from "../../assets/images/home-banners/mac.png";
import IMG3 from "../../assets/images/home-banners/shopping-lady.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    bg: "bg-banner-gray",
    title: "THE BEST PLACE TO PLAY",
    subtitle: "MOBILE GADGETS",
    desc: "Save up to 50% on select Xbox games. Get early discount on any product with coupon pass.",
    btn: "Shop Now",
    img: IMG1,
    styles: {
      title: "text-banner-blue",
      subtitle: "text-gray-900",
      desc: "text-gray-800",
    },
  },
  {
    id: 2,
    bg: "bg-banner-pink",
    title: "THE BEST PLACE TO SHOP",
    subtitle: "Macbook Pro",
    desc: "Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage",
    btn: "Shop Now",
    img: IMG2,
    styles: {
      title: "text-banner-blue",
      subtitle: "text-gray-900",
      desc: "text-gray-800",
    },
  },
  {
    id: 3,
    bg: "bg-banner-green",
    title: "THE BEST PLACE TO SHOP",
    subtitle: "TREAT YOURSELF",
    desc: "Get the fashion you deserve without breaking the bank",
    btn: "Shop Now",
    img: IMG3,
    styles: {
      title: "text-white",
      subtitle: "text-gray-900",
      desc: "text-white/90",
    },
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full rounded-md h-[500px] sm:h-[450px] md:h-[500px] lg:h-[500px] overflow-hidden font-poppins">
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`
            absolute inset-0 flex flex-col md:flex-row items-center md:items-center justify-between
            lg:px-14 md:px-6 px-4 py-6 transition-opacity duration-700 ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
            ${banner.bg}
          `}
        >
          {/* Left text */}
          <div className="max-w-lg w-full text-center md:text-left mb-6 md:mb-0 transition-all duration-700 ease-in-out">
            <div className="flex gap-2 items-center justify-center md:justify-start">
              <div
                className={`block h-[3px] w-10 rounded-sm bg-current ${banner.styles.title}`}
              ></div>

              <h3
                className={`text-xs sm:text-sm tracking-widest font-bold uppercase font-vivendi ${banner.styles.title}`}
              >
                {banner.title}
              </h3>
            </div>

            <h1
              className={`text-2xl sm:text-3xl lg:text-5xl font-extrabold my-3 font-vivendi ${banner.styles.subtitle}`}
            >
              {banner.subtitle}
            </h1>
            <p
              className={`mb-4 text-sm sm:text-base leading-relaxed font-vivendi ${banner.styles.desc}`}
            >
              {banner.desc}
            </p>
            <Link to="/category/gadget ">
              <div className="flex justify-center md:justify-start">
                <button className="px-5  cursor-pointer sm:px-6 py-4 bg-banner-orange text-white rounded-sm font-semibold hover:opacity-90 transition font-vivendi text-sm sm:text-base flex items-center gap-2">
                  {banner.btn}
                  <FiArrowRight className="text-lg" />
                </button>
              </div>
            </Link>
          </div>

          {/* Right image with slide animation */}
          <div
            className={`w-full md:w-1/2 flex justify-center md:justify-end transform transition-all duration-700 ease-in-out
              ${
                index === current
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }
            `}
          >
            <img
              src={banner.img}
              alt={banner.subtitle}
              className="
    max-h-[250px] sm:max-h-[300px] 
    md:max-h-[500px]   /* Bigger on tablets (iPad size) */
    lg:max-h-[600px]   /* Larger on desktops */
    w-auto object-contain
  "
            />
          </div>
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 md:left-14 transform -translate-x-1/2 md:translate-x-0 flex space-x-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-gray-600 scale-125 shadow-md"
                : "bg-gray-50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

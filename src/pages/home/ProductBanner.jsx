import { useState, useEffect } from "react";
import Nike1 from "../../assets/images/bag1.png";
import Nike2 from "../../assets/images/lapy1.png";
import Nike3 from "../../assets/images/shirt1.png";
import Nike4 from "../../assets/images/bag1.png";
import { FaFire } from "react-icons/fa";

const hotProducts = [
  {
    id: 1,
    title: "Rivr Coated Bag",
    category: "Fashion",
    price: 125000,
    image: Nike1,
    location: "Calabar",
    condition: "New",
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max",
    category: "Electronics",
    price: 750000,
    image: Nike2,
    location: "Lagos",
    condition: "New",
  },
  {
    id: 3,
    title: "Nike Air Jordan",
    category: "Fashion",
    price: 85000,
    image: Nike3,
    location: "Abuja",
    condition: "New",
  },
  {
    id: 4,
    title: "MacBook Pro M2",
    category: "Electronics",
    price: 950000,
    image: Nike4,
    location: "Lagos",
    condition: "New",
  },
];

const bgColors = [
  "bg-emerald-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-primary-700",
];

const HotProductBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % hotProducts.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentProduct = hotProducts[currentIndex];

  return (
    <div className="">
      <div className={`relative mb-8  ${bgColors[currentIndex]}`}>
        {/* Hot Price Tag */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center bg-red-500 text-white px-2 py-1 rounded-full shadow-lg">
            <span className="font-bold mr-1 text-sm whitespace-nowrap">
              Hot Price
            </span>
            <FaFire className="text-yellow-300" />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 md:p-8 lg:p-8 h-[170px] md:h-[190px] lg:h-[230px] mt-3">
          {/* Product Info */}
          <div className="flex-1 pr-2 md:mx-16 lg:mx-16">
            <h3 className="text-xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2 lg:mb-4 truncate">
              {currentProduct.title}
            </h3>
            <p className="text-white/80 mb-1 md:mb-2 text-sm md:text-base lg:text-lg">
              {currentProduct.category}
            </p>
            <div className="flex gap-2 mb-4">
              <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">
                {currentProduct.condition}
              </span>
              <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">
                {currentProduct.location}
              </span>
            </div>
            <div className="flex items-center gap-4 md:gap-4 lg:gap-8">
              <span className="text-xl mb-2 md:text-5xl lg:text-6xl whitespace-nowrap font-bold text-white">
                ₦{currentProduct.price.toLocaleString()}
              </span>
              <button className="bg-secondary text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors whitespace-nowrap">
                Shop now
              </button>
            </div>
          </div>

          {/* Product Image */}
          <div
            className={`w-1/2 md:w-1/3 md:mx-16 lg:mx-18 transition-all duration-500 transform ${
              isAnimating
                ? "-translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="w-full h-auto object-contain max-h-[130px] sm:h-[300px] md:max-h-[160px] lg:max-h-[190px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProductBanner;


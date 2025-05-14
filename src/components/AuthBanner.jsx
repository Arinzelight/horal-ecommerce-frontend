import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import BannerImg01 from "../assets/images/auth-images/auth-banner-01.png";
import BannerImg02 from "../assets/images/auth-images/auth-banner-02.png";
import BannerImg03 from "../assets/images/auth-images/auth-banner-03.png";
import BannerImg04 from "../assets/images/auth-images/auth-banner-04.png";
import BannerImg05 from "../assets/images/auth-images/auth-banner-05.png";

const banners = [
  {
    image: BannerImg04,
    heading: "Get your Orders in no-time",
    paragraph:
      "Purchase products and get your orders shipped by Horal Featured Logistics!!!",
  },
  {
    image: BannerImg01,
    heading: "Shop with Confidence",
    paragraph: "Shop for your favorite product with confidence.",
  },
  {
    image: BannerImg02,
    heading: "Enjoy Fast & Secured Payments",
    paragraph:
      "Shop for your best products and make seem-less and fast payments",
  },

  //   {
  //     image: BannerImg03,
  //     heading: "Exclusive Deals",
  //     paragraph: "Get exclusive deals and offers when you sign up!",
  //   },
  {
    image: BannerImg05,
    heading: "Shop with Confidence",
    paragraph: "Shop for your favorite product and own the experience!!!",
  },
];

const AuthBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(banners[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * banners.length);
      setCurrentBanner(banners[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block w-[516px] h-[990px] relative bg-primary rounded-2xl overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={currentBanner.image}
        alt="Auth Banner"
      />
      <div className="absolute top-14 left-7 z-10 flex items-center gap-4">
        <FaArrowLeftLong className="text-white" />
        <Link to="/" className="text-white text-lg font-bold">
          Back to Home
        </Link>
      </div>
      <div className="absolute top-44 left-7 z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-white text-4xl font-bold leading-tight mb-2">
          {currentBanner.heading}
        </h2>
        <p className="text-white text-lg">{currentBanner.paragraph}</p>
      </div>
    </div>
  );
};

export default AuthBanner;

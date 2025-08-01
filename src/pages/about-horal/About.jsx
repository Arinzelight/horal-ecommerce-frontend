import React from "react";
import { FaEye, FaHandHoldingHeart } from "react-icons/fa";
import ABOUT_HORAL_IMG1 from "../../assets/images/about-horal/about-horal-img1.png";
import ABOUT_HORAL_IMG2 from "../../assets/images/about-horal/about-horal-img2.png";
import WhyHoralSection from "./WhyHoralSection";

const About = () => {
  return (
    <div className="w-full sm:max-w-[970px]  min-h-screen mx-auto flex flex-col gap-8 overflow-hidden py-4">
      <div className="w-full h-12 p-2.5 bg-sky-950 rounded flex justify-between items-center">
        <h1 className="text-white text-xl font-bold ">About Horal</h1>
      </div>
      <div className="w-full text-justify justify-start text-neutral-900 text-sm font-normal ">
        Horal is an innovative, open-market e-commerce platform designed to
        bring buyers and sellers together in a secure, transparent, and
        user-friendly environment. With a core focus on building trust, Horal
        integrates key features like an escrow service, real-time communication,
        and KYC verification to ensure that transactions are safe and seamless
        for everyone involved.
        <br />
        <br />
        We understand the challenges of online shopping, from fraudulent
        activities to concerns about product authenticity, and we're committed
        to creating a marketplace that prioritizes security, transparency, and
        convenience. Whether you're a buyer looking for peace of mind or a
        seller striving to expand your customer base, Horal is here to simplify
        the online shopping experience for all.
      </div>
      {/* Our Vision */}

      <div className="flex flex-wrap items-center justify-between gap-12">
        {/* Text Section */}
        <div className="w-full md:w-96 flex flex-col gap-4">
          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 p-4 bg-sky-500 rounded-[30px] flex justify-center items-center">
              <FaHandHoldingHeart className="text-white text-2xl" />
            </div>
            <h2 className="text-sky-500 text-lg font-bold font-nunito">
              Our Mission
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-900 text-justify ">
            At Horal, our mission is to revolutionize the e-commerce landscape
            by providing a marketplace where buyers and sellers can interact
            freely and confidently. We aim to empower users by creating a
            secure, transparent, and trustworthy platform where everyone can
            have positive and fair transactions. By integrating robust escrow
            services, KYC verification, and real-time communication, we seek to
            eliminate the common concerns of fraud, low-quality products, and
            payment security, ultimately making online shopping a safer and more
            reliable experience. Our commitment is to ensure that both buyers
            and sellers can thrive in a digital environment built on trust,
            transparency, and mutual respect.
          </p>
        </div>

        {/* Image */}
        <img
          className="w-full md:w-[479px] h-90 object-cover rounded-lg"
          src={ABOUT_HORAL_IMG1 || "https://placehold.co/479x360"}
          alt="Mission illustration"
        />
      </div>
      {/* Our Mission */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Image */}
        <img
          className="w-full md:w-[479px] h-90 object-cover rounded-lg"
          src={ABOUT_HORAL_IMG2 || "https://placehold.co/479x360"}
          alt="Vision illustration"
        />

        {/* Text Section */}
        <div className="w-full md:w-96 flex flex-col gap-4">
          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 p-4 bg-sky-500 rounded-[30px] flex justify-center items-center">
              <FaEye className="text-white text-2xl" />
            </div>
            <h2 className="text-sky-500 text-lg font-bold font-nunito">
              Our Vision
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-900 text-justify ">
            Our vision is to become the leading e-commerce platform in Nigeria,
            driving innovation and setting the standard for secure and reliable
            online transactions. We envision a future where Horal fosters a
            thriving community of buyers and sellers who trust the platform not
            just for its convenience, but for its unwavering dedication to
            protecting their interests. As we expand, we aim to build a dynamic
            marketplace that serves as a model for e-commerce platforms
            worldwide, combining the best of technology, customer service, and
            security features to create a seamless and empowering online
            experience for all users.
          </p>
        </div>
      </div>
      {/* Why Horal Section */}
      <div className="py-10  ">
        <WhyHoralSection />
      </div>
    </div>
  );
};

export default About;

import { Link } from "react-router-dom";
import Logo from "../../assets/images/Horal-Logo.png";
import {
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white ">
      <div className="container flex flex-col  py-4 sm:px-16 px-4 justify-center ">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8  md:gap-12 lg:gap-24">
          {/* Logo and Description */}

          <div>
            <div className="mb-4">
              <Link href="/" className="flex items-center text-2xl font-bold">
                <img src={Logo} alt="Horal Logo" className="h-8 mr-2" />
              </Link>
            </div>
            <p className=" text-[16px]">
              Horal is a trusted e-commerce platform connecting buyers and
              sellers in Nigeria. With escrow service, real-time chat, and KYC
              verification, we ensure secure and transparent transactions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[22px] font-medium mb-4">Quick Links</h3>
            <ul className="space-y-1 text-blue-100">
              <li>
                <Link
                  href="#"
                  className=" text-[16px] hover:text-secondary transition-colors"
                >
                  About Horal
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[16px] hover:text-secondary transition-colors"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[16px] hover:text-secondary transition-colors whitespace-nowrap"
                >
                  Buyer Protection (Escrow Service)
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[16px] hover:text-secondary transition-colors whitespace-nowrap"
                >
                  Seller Verification (KYC Process)
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[16px] hover:text-secondary transition-colors"
                >
                  Escrow T&C
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Delivery & Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Need Help? */}
          <div>
            <h3 className="text-[22px] font-medium mb-4">Need Help?</h3>
            <ul className="space-y-1 text-blue-100">
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Refund & Dispute Resolution
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="text-[22px] font-medium mb-4">Marketplace</h3>
            <ul className="space-y-1 text-blue-100">
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Sell on Horal
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Secure Payment Options
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Verified Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  User Reviews & Ratings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile App Links */}
        <div className="mt-6 flex justify-between flex-col md:flex-row">
          {/* Social Media Links */}
          <div className="mt-6">
            <h4 className="font-medium mb-3">Follow Us</h4>
            <div className="flex space-x-2">
              <Link
                href="#"
                className="bg-white text-primary-900 p-2 rounded-sm transition-colors"
              >
                <FaFacebook />
              </Link>
              <Link
                href="#"
                className="bg-white text-primary-900 p-2 rounded-sm  transition-colors"
              >
                <FaXTwitter />
              </Link>
              <Link
                href="#"
                className="bg-white text-primary-900 p-2 rounded-sm  transition-colors"
              >
                <FaLinkedin />
              </Link>
              <Link
                href="#"
                className="bg-white text-primary-900 p-2 rounded-sm  transition-colors"
              >
                <FaTiktok />
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-medium mb-3">We are now on mobile</h4>
            <div className="flex space-x-2">
              <Link href="#">
                <button
                  className="h-[32.75px] w-[102px] bg-black text-white px-3 py-2 rounded text-xs flex items-center"
                  aria-label="Download on Apple Store"
                >
                  <FaApple className="mr-1" />
                  <div>
                    <div className="text-[8px]">Download on</div>
                    <div className="font-semibold text-[10px]">Apple Store</div>
                  </div>
                </button>
              </Link>
              <Link href="#">
                <button
                  className="h-[32.75px] w-[102px] bg-primary-700 text-white px-3 py-2 rounded text-xs flex items-center"
                  aria-label="Download on Google Play Store"
                >
                  <FaGooglePlay className="mr-1" />
                  <div>
                    <div className="text-[8px]">Get it on</div>
                    <div className="font-semibold text-[10px]">Google Play</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t bg-white h-[40px]  py-2 text-center text-neutral-800 text-sm">
        Horal © {currentYear}. All Rights Reserved
      </div>
    </footer>
  );
}

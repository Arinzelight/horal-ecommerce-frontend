
import { FaRegEye } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdAdsClick } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import FeatureCard from "../about-horal/FeatureCard";
import { Header } from "../../components/Section";
import SELLER_IMG from "../../assets/images/seller.png";

const VerifiedSellers = () => {

    const features = [
      {
        icon: FaRegEye,
        title: "Increased Visibility in Search Results",
        description:
          "Verified sellers often receive preferential treatment in search rankings. Your listings may appear higher, making it easier for potential buyers to find your products amidst the competition.",
      },
      {
        icon: IoStar,
        title: "Enhanced Credibility and Buyers Trust",
        description:
          "The 'Verified Seller' badge acts as a strong trust signal. Buyers are more likely to purchase from sellers who have been vetted by Horal, reducing hesitation and increasing conversion rates.",
      },
      {
        icon: RiVerifiedBadgeFill,
        title: "Eligibility for Featured Placements and Badges",
        description:
          "Verified sellers may be eligible for prominent placements on the homepage, category pages, or dedicated 'Featured Verified Sellers' sections, further boosting visibility.",
      },
      {
        icon: MdAdsClick,
        title: "Ability to Place Product Advertisements",
        description:
          "Verified sellers gain the exclusive ability to create and manage product advertisements within the Horal platform, further boosting the visibility of their specific listings to a targeted audience and driving more sales.",
      },
      {
        icon: HiOutlineLightBulb,
        title: "Early Access to New Platform Updates and Tools",
        description:
          "Verified sellers may receive early access to beta programs, new features, and tools being rolled out on the Horal platform, giving them a competitive edge.",
      },
      {
        icon: IoAnalytics,
        title: "Access to Advanced Analytics and Insights",
        description:
          "Horal might provide verified sellers with more detailed analytics and insights into their performance, helping them make informed decisions to optimize their business.",
      },
    ];
    return (
      <>
        <main>
          <div className="w-full max-w-[970px] mx-auto flex flex-col gap-8 overflow-hidden p-4">
            <Header title="Verified Sellers" />
            <p className="text-neutral-900 text-sm font-normal text-justify">
              At Horal, your security and satisfaction are our top priorities.
              Our "Verified Seller" badge indicates merchants who have completed
              a thorough verification process, ensuring a more secure and
              reliable shopping experience.
            </p>
            <div>
                <img src={SELLER_IMG} alt="Verified Seller" />
            </div>
            <h2 className="text-sky-500 text-xl font-bold font-nunito text-center w-full">
              Why Become a Verified Seller
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </main>
      </>
    );
};

export default VerifiedSellers;
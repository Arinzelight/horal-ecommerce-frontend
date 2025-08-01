import React from "react";
import {
  FaShieldAlt,
  FaComments,
  FaIdCard,
  FaMoneyCheckAlt,
  FaBell,
} from "react-icons/fa";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: FaShieldAlt,
    title: "Escrow-Powered Transactions",
    description:
      "Our Escrow Service ensures that buyer payments are held securely until the product is delivered and confirmed. This protects both parties and builds trust.",
  },
  {
    icon: FaComments,
    title: "Real-Time Buyer–Seller Interaction",
    description:
      "Horal enables direct chat between buyers and sellers. Discuss product details, negotiate prices, and clarify expectations before payment.",
  },
  {
    icon: FaIdCard,
    title: "KYC (Know Your Customer) Verification",
    description:
      "All sellers must complete KYC verification including document checks. This reduces fraud and ensures only verified users can list products.",
  },
  {
    icon: FaMoneyCheckAlt,
    title: "Secure and Flexible Payment Options",
    description:
      "We support debit/credit cards, bank transfers, and mobile wallets. All transactions are encrypted and processed through secure gateways.",
  },
  {
    icon: FaBell,
    title: "Instant Notifications and Order Tracking",
    description:
      "Get real-time updates on orders, messages, and delivery tracking to stay informed and in control throughout the transaction.",
  },
];

const WhyHoralSection = () => {
  return (
    <section className="w-full flex flex-col items-start gap-8">
      <h2 className="text-sky-500 text-xl font-bold font-nunito text-center w-full">
        Why Horal is the Marketplace You Can Trust
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
    </section>
  );
};

export default WhyHoralSection;

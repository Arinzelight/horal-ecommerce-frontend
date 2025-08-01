import React from "react";
import { FaLock, FaShieldAlt, FaBalanceScale, FaSmile } from "react-icons/fa";

const highlights = [
  {
    title: "No Payment Until You Approve",
    icon: <FaLock className="text-white w-6 h-6" />,
    description:
      "We don’t release your money until you receive exactly what you ordered—giving you full control over your purchase.",
  },
  {
    title: "Reduced Fraud Risk",
    icon: <FaShieldAlt className="text-white w-6 h-6" />,
    description:
      "By holding funds in escrow, scammers are blocked from disappearing with your money without delivering value.",
  },
  {
    title: "Safe Dispute Resolution",
    icon: <FaBalanceScale className="text-white w-6 h-6" />,
    description:
      "If something goes wrong—wrong item, damaged product, or no delivery—Horal's support team will step in to mediate and ensure a fair resolution.",
  },
  {
    title: "Buyer Confidence",
    icon: <FaSmile className="text-white w-6 h-6" />,
    description:
      "Shop freely across Nigeria’s open market with verified sellers, knowing your money is secure.",
  },
];

const EscrowProtection = () => {
  return (
    <div className="max-w-[970px] w-full mx-auto flex flex-col gap-8 py-6">
      {/* Section Header */}
      <div className="h-12 p-2.5 bg-sky-950 rounded flex justify-between items-center overflow-hidden">
        <h2 className="text-white text-xl font-bold font-nunito">
          Buyer Protection (Escrow Service)
        </h2>
      </div>

      {/* Main Text Blocks */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-sky-500 text-base font-bold font-nunito text-justify">
            Your money is safe. Your satisfaction is guaranteed.
          </h3>
          <p className="text-neutral-900 text-sm font-nunito text-justify">
            At Horal, we understand how risky online transactions can feel—
            especially when you're dealing with unknown sellers. That’s why
            we’ve built a powerful Escrow Service into our platform to protect
            buyers every step of the way.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sky-500 text-base font-bold font-nunito text-justify">
            With Horal’s Escrow Service:
          </h3>
          <div className="text-neutral-900 text-sm font-nunito text-justify">
            <p>
              Escrow is a secure holding system that acts as a middleman between
              the buyer and the seller. When you make a purchase on Horal, your
              payment is safely held in escrow until you're fully satisfied with
              the product or service you receive.
            </p>

            <p className="mt-4 font-bold">Here's how the process works:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Buyer makes payment → Money is held in Horal's secure escrow
                system.
              </li>
              <li>
                Seller is notified to prepare and deliver the product or
                service.
              </li>
              <li>Buyer receives and confirms satisfaction with the order.</li>
              <li>
                Horal releases the funds to the seller only after buyer
                approval.
              </li>
            </ul>
          </div>
        </div>

        {/* Why Escrow Matters */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sky-500 text-base font-bold font-nunito text-justify">
            Why Escrow Matters
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 h-72 bg-primary-50 rounded shadow-md flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 p-4 bg-sky-500 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-sky-500 font-bold text-base font-nunito">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm text-neutral-900 font-nunito text-justify">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowProtection;

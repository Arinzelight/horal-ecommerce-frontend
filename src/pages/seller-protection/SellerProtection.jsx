import React from "react";
import { Section, Header } from "../../components/Section";
const SellerProtection = () => {
  return (
    <div className="w-full max-w-[970px] mx-auto flex flex-col gap-8 overflow-hidden p-4">
      <Header title="Seller Protection" />

      <p className="text-neutral-900 text-sm font-normal  text-justify">
        At Horal, we understand how risky online transactions can
        feel—especially when you're dealing with unknown sellers. That’s why
        we’ve built a powerful Escrow Service into our platform to protect
        buyers every step of the way.
      </p>

      <div className="flex flex-col gap-8">
        <Section title="What is KYC?">
          <p>
            KYC (Know Your Customer) is a mandatory verification process that
            helps us confirm the identity of individuals and businesses. By
            collecting and validating important information, we ensure that
            sellers on Horal are real, accountable, and reliable.
          </p>
        </Section>

        <Section title="What Sellers Need to Provide">
          To become a verified seller on Horal, you’ll need to complete a
          simple, one-time verification process which includes:
          <ul className="list-disc pl-6">
            <li>Full Name and Contact Information</li>
            <li>
              {" "}
              Government-Issued ID (e.g. National ID, Driver’s Licence, Voter's
              Card, or International Passport)
            </li>
            <li> Bank Account Information for Payouts </li>
            <li>Business Information(if applicable)</li>
          </ul>
          All personal data collected is securely stored and encrypted, in
          compliance with local data protection laws.
        </Section>

        <Section title="Why KYC Matters">
          <p className="font-semibold">For Buyers:</p>
          <ul className="list-disc pl-6">
            <li>Increases confidence when buying from verified sellers</li>
            <li>Reduces the risk of scams and impersonation</li>
            <li>
              Helps ensure accountability and traceability if issues arise
            </li>
          </ul>
          <p className="font-semibold">For Sellers:</p>
          <ul className="list-disc pl-6">
            <li>Builds credibility and trust with potential buyers</li>
            <li>Opens access to premium seller tools and visibility</li>
            <li>
              Enables secure payout processing through verified bank details
            </li>
            <li>
              Positions the seller as a legitimate and professional vendor
            </li>
          </ul>
        </Section>

        <Section title="What Happens After KYC">
          <p>Once your documents are submitted:</p>
          <ul className="list-disc pl-6">
            <li>Our team reviews and validates your information.</li>
            <li>
              If all documents are in order, your account is marked as verified.
            </li>
            <li>
              You receive access to list products, receive payments, and
              interact with buyers.
            </li>
            <li>
              Verified sellers get a badge of trust, improving visibility and
              sales potential.
            </li>
          </ul>
          <p>
            In case of missing or invalid documents, we’ll guide you through
            updating them promptly.
          </p>
        </Section>
      </div>
    </div>
  );
};


export default SellerProtection;

import React from "react";

const sections = [
  {
    title: "Welcome to Horal – Nigeria’s Open Market E-commerce Platform",
    content:
      'These Terms and Conditions ("Terms") govern your access to and use of Horal’s platform (web and mobile), services, and features. By registering, accessing, or using Horal, you agree to comply with these Terms. If you do not agree, kindly refrain from using our platform.\nLast Updated: April 2025',
  },
  {
    title: "Acceptance of Terms",
    content:
      "By using Horal, you confirm that:\nYou are at least 18 years old\nYou have provided accurate information\nYou agree to abide by these Terms, our Privacy Policy, Delivery & Return Policy, and Escrow Terms",
  },
  {
    title: "About Horal",
    content:
      "Horal is an open market e-commerce platform that connects buyers and sellers across Nigeria. We facilitate secure transactions via our Escrow Service, ensure KYC verification for sellers, and provide tools for real-time communication.",
  },
  {
    title: "Account Registration & Responsibility",
    content:
      "To use certain features, you must register an account:\nProvide accurate and complete details\nKeep login credentials confidential\nYou are responsible for all activities under your account\nNotify Horal immediately if you suspect unauthorised access\nHoral reserves the right to suspend or terminate accounts that violate our policies or engage in fraudulent activity.",
  },
  {
    title: "Seller Responsibilities",
    content:
      "Sellers on Horal agree to:\nComplete KYC verification and provide valid business/personal identification\nAccurately describe products or services offered\nFulfil orders promptly upon confirmation\nAdhere to our delivery, return, and refund policies\nMaintain open communication with buyers and resolve disputes in good faith\nMisrepresentation or fraudulent behaviour will lead to account suspension and possible legal action.",
  },
  {
    title: "Buyer Responsibilities",
    content:
      "Buyers on Horal must:\nReview product descriptions, prices, and seller information before placing orders\nMake payments only through Horal’s secure payment gateways\nConfirm receipt and satisfaction within the specified escrow period\nAvoid using the platform for illegal or fraudulent purchases\nBuyers are encouraged to communicate directly with sellers for clarification before making a purchase.",
  },
  {
    title: "Escrow & Payment Terms",
    content:
      "Payments made on Horal are held in escrow until the buyer confirms delivery and satisfaction\nIf a buyer does not confirm or raise a dispute within the escrow window, funds will be auto-released to the seller\nHoral does not offer refunds for orders completed outside the platform\nAll transactions are subject to applicable fees, which will be clearly disclosed\nRefer to the Escrow Terms & Conditions for full details.",
  },
  {
    title: "Returns, Refunds & Disputes",
    content:
      "Sellers must clearly state their return and refund policy\nBuyers may request returns or raise disputes through the platform within the eligible window\nHoral will mediate disputes fairly and may request evidence from both parties\nRefunds (if approved) will be processed through the original payment method\nPlease refer to our Delivery & Return Policy for more information.",
  },
  {
    title: "Prohibited Activities",
    content:
      "Users of Horal must not:\nList or sell counterfeit, stolen, illegal, or prohibited items\nPost misleading, harmful, or abusive content\nAttempt to bypass the escrow or payment systems\nEngage in harassment, spamming, or fraudulent activities\nUse automated bots, scrapers, or manipulate the platform\nViolations may result in permanent account suspension and legal action.",
  },
  {
    title: "Platform Availability & Changes",
    content:
      "We strive to maintain reliable access, but:\nWe may temporarily suspend services for maintenance or upgrades\nWe reserve the right to change features, update policies, or discontinue parts of the platform at any time\nUsers will be notified of major updates via email or in-app notifications.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Horal is not liable for:\nAny loss, damage, or delay caused by user negligence or third-party actions\nIssues arising from orders completed outside the platform\nContent uploaded by users or sellers\nOur liability is limited to the amount paid through our platform for the transaction in question.",
  },
  {
    title: "Intellectual Property",
    content:
      "All platform content including logos, graphics, texts, and software is the property of Horal or its licensors. You may not copy, distribute, or exploit any part of the platform without our express permission.",
  },
  {
    title: "Governing Law & Jurisdiction",
    content:
      "These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising shall be resolved in the appropriate courts of jurisdiction within Nigeria.",
  },
  {
    title: "Termination",
    content:
      "Horal may terminate or suspend your account:\nFor breach of these Terms\nUpon your request\nIf required by law\nUpon termination, all pending obligations (e.g., escrow disbursements, refunds) will be processed according to platform rules.",
  },
  {
    title: "Contact Us",
    content:
      "Have questions about these Terms?\n\n📧 support@horal.com\n📞 +234-XXX-XXX-XXXX\n📍 Horal Headquarters, Victoria Island, Lagos, Nigeria",
  },
];

function renderContent(text) {
  const lines = text.trim().split("\n").filter(Boolean);

  if (lines.length === 1) {
    return <p className="text-sm text-neutral-900 text-justify">{lines[0]}</p>;
  }

  const firstLine = lines[0];
  const bulletItems = lines.slice(1);

  return (
    <>
      <p className="text-sm text-neutral-900 text-justify">{firstLine}</p>
      <ul className="list-disc list-inside text-sm text-neutral-900 space-y-1 mt-2">
        {bulletItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-sky-950 text-white text-xl font-bold px-4 py-3 rounded">
        Terms & Conditions
      </div>
      {sections.map((section, index) => (
        <section key={index} className="space-y-2">
          <h2 className="text-sky-500 text-lg font-bold">{section.title}</h2>
          {renderContent(section.content)}
        </section>
      ))}
    </div>
  );
}

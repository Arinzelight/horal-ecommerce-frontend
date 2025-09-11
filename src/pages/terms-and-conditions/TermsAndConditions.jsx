import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="w-full max-w-[970px] mx-auto flex flex-col gap-8 overflow-hidden p-4">
      <div className="w-full h-12 p-2.5 bg-sky-950 rounded flex justify-between items-center">
        <h1 className="text-white text-xl font-bold ">Terms & Conditions</h1>
      </div>

      <div className="flex flex-col gap-8">
        <Section title="Welcome to Horal – Nigeria’s Open Market E-commerce Platform">
          <p>
            These Terms and Conditions ("Terms") govern your access to and use
            of Horal’s platform (web and mobile), services, and features. By
            registering, accessing, or using Horal, you agree to comply with
            these Terms. If you do not agree, kindly refrain from using our
            platform.
          </p>
          <p className="text-sky-500 mt-2">Last Updated: April 2025</p>
        </Section>

        <Section title="Acceptance of Terms">
          <ul className="list-disc pl-6">
            <li>You are at least 18 years old</li>
            <li>You have provided accurate information</li>
            <li>
              You agree to abide by these Terms, our Privacy Policy, Delivery &
              Return Policy, and Escrow Terms
            </li>
          </ul>
        </Section>

        <Section title="About Horal">
          <p>
            Horal is an open market e-commerce platform that connects buyers and
            sellers across Nigeria. We facilitate secure transactions via our
            Escrow Service, ensure KYC verification for sellers, and provide
            tools for real-time communication.
          </p>
        </Section>

        <Section title="Account Registration & Responsibility">
          <ul className="list-disc pl-6">
            <li>Provide accurate and complete details</li>
            <li>Keep login credentials confidential</li>
            <li>You are responsible for all activities under your account</li>
            <li>Notify Horal immediately if you suspect unauthorised access</li>
          </ul>
          <p className="mt-2">
            Horal reserves the right to suspend or terminate accounts that
            violate our policies or engage in fraudulent activity.
          </p>
        </Section>

        <Section title="Seller Responsibilities">
          <ul className="list-disc pl-6">
            <li>Complete KYC verification and provide valid identification</li>
            <li>Accurately describe products or services offered</li>
            <li>Fulfil orders promptly upon confirmation</li>
            <li>Adhere to our delivery, return, and refund policies</li>
            <li>
              Maintain open communication and resolve disputes in good faith
            </li>
          </ul>
          <p className="mt-2">
            Misrepresentation or fraudulent behaviour will lead to account
            suspension and possible legal action.
          </p>
        </Section>

        <Section title="Buyer Responsibilities">
          <ul className="list-disc pl-6">
            <li>
              Review product descriptions and seller info before placing orders
            </li>
            <li>Make payments only through Horal’s secure gateways</li>
            <li>Confirm receipt within the specified escrow period</li>
            <li>Avoid illegal or fraudulent purchases</li>
          </ul>
          <p className="mt-2">
            Buyers are encouraged to communicate directly with sellers for
            clarification.
          </p>
        </Section>

        <Section title="Escrow & Payment Terms">
          <ul className="list-disc pl-6">
            <li>
              Payments are held in escrow until buyer confirms satisfaction
            </li>
            <li>
              If no dispute is raised within the escrow window, funds are
              auto-released
            </li>
            <li>No refunds for transactions completed outside the platform</li>
            <li>All transactions are subject to disclosed fees</li>
          </ul>
          <p className="mt-2">
            Refer to the{" "}
            <span className="text-sky-500">Escrow Terms & Conditions</span> for
            full details.
          </p>
        </Section>

        <Section title="Returns, Refunds & Disputes">
          <ul className="list-disc pl-6">
            <li>Sellers must clearly state return/refund policies</li>
            <li>
              Buyers may request returns or raise disputes through the platform
            </li>
            <li>Horal will mediate fairly and may request evidence</li>
            <li>
              Approved refunds are processed to the original payment method
            </li>
          </ul>
          <p className="mt-2">
            Refer to our{" "}
            <span className="text-sky-500">Delivery & Return Policy</span> for
            more info.
          </p>
        </Section>

        <Section title="Prohibited Activities">
          <ul className="list-disc pl-6">
            <li>
              Listing or selling counterfeit, illegal, or prohibited items
            </li>
            <li>Posting misleading, harmful, or abusive content</li>
            <li>Bypassing escrow or payment systems</li>
            <li>Engaging in harassment or fraudulent activities</li>
            <li>Using bots, scrapers, or manipulating the platform</li>
          </ul>
          <p className="mt-2">
            Violations may result in permanent account suspension and legal
            action.
          </p>
        </Section>

        <Section title="Platform Availability & Changes">
          <ul className="list-disc pl-6">
            <li>Temporary suspensions may occur for maintenance or upgrades</li>
            <li>
              We may change features, update policies, or discontinue services
              at any time
            </li>
          </ul>
          <p className="mt-2">
            Users will be notified of major updates via email or in-app
            notifications.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <ul className="list-disc pl-6">
            <li>Loss, damage, or delays caused by user/third-party actions</li>
            <li>Orders completed outside the platform</li>
            <li>User or seller uploaded content</li>
          </ul>
          <p className="mt-2">
            Our liability is limited to the transaction amount paid through our
            platform.
          </p>
        </Section>

        <Section title="Intellectual Property">
          <p>
            All content including logos, graphics, texts, and software is owned
            by Horal or its licensors. You may not copy, distribute, or exploit
            content without permission.
          </p>
        </Section>

        <Section title="Governing Law & Jurisdiction">
          <p>
            These Terms are governed by Nigerian law. Disputes shall be resolved
            in the appropriate courts within Nigeria.
          </p>
        </Section>

        <Section title="Termination">
          <ul className="list-disc pl-6">
            <li>For breach of these Terms</li>
            <li>Upon user request</li>
            <li>As required by law</li>
          </ul>
          <p className="mt-2">
            Upon termination, pending obligations (escrow, refunds) will be
            processed as per rules.
          </p>
        </Section>

        <Section title="Contact Us">
          <ul className="list-none pl-0">
            <li>Email: support@horal.com</li>
            <li>Phone: +234 201 330 6150</li>
            <li>Address: Horal HQ, Victoria Island, Lagos, Nigeria</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="flex flex-col gap-2">
    <h2 className="text-sky-500 text-lg font-bold ">{title}</h2>
    <div className="text-neutral-900 text-sm font-normal  text-justify">
      {children}
    </div>
  </div>
);

export default TermsAndConditions;

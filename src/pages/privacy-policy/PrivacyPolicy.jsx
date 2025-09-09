import React from "react";
const PrivacyPolicy = () => {
  return (
    <div className="w-full max-w-[970px] mx-auto flex flex-col gap-8 overflow-hidden p-4">
      <div className="w-full h-12 p-2.5 bg-sky-950 rounded flex justify-between items-center">
        <h1 className="text-white text-xl font-bold ">Privacy Policy</h1>
      </div>

      <div className="flex flex-col gap-8">
        <Section title="Your Privacy Matters to Us">
          <p>
            At Horal, we value your privacy and are committed to protecting your
            personal information. This Privacy Policy outlines how we collect,
            use, store, and protect your data when you use our website and
            mobile app. By using Horal, you agree to the practices described
            below.
          </p>

          <h3 className="font-bold mt-4">1. Information We Collect</h3>

          <h4 className="font-bold mt-2">a. Personal Information</h4>
          <ul className="list-disc pl-6">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Delivery address</li>
            <li>Government-issued ID (for KYC verification)</li>
          </ul>

          <h4 className="font-bold mt-4">b. Transactional Information</h4>
          <ul className="list-disc pl-6">
            <li>Purchase history</li>
            <li>
              Payment details (Note: we do not store full card information)
            </li>
            <li>Communication records between buyers and sellers</li>
          </ul>

          <h4 className="font-bold mt-4">c. Device and Usage Data</h4>
          <ul className="list-disc pl-6">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Mobile device information</li>
            <li>Pages visited and time spent on the platform</li>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <ul className="list-disc pl-6">
            <li>To verify your identity and complete KYC checks</li>
            <li>To facilitate safe transactions using our escrow system</li>
            <li>To manage your account and provide customer support</li>
            <li>To improve our platform functionality and user experience</li>
            <li>
              To send important notifications (e.g., order updates, alerts,
              promotional offers)
            </li>
            <li>To comply with legal obligations and resolve disputes</li>
          </ul>
        </Section>

        <Section title="Data Sharing and Disclosure">
          <p>
            We do not sell or rent your personal information to third parties.
            However, we may share your data in the following circumstances:
          </p>
          <ul className="list-disc pl-6">
            <li>
              With verified third-party service providers (e.g., payment
              processors, KYC agencies)
            </li>
            <li>When required by law or regulatory authorities</li>
            <li>
              To prevent fraud, ensure safety, or protect Horal’s legal rights
            </li>
          </ul>
        </Section>

        <Section title="Data Protection and Security">
          <p>We implement strict security measures to protect your data:</p>
          <ul className="list-disc pl-6">
            <li>SSL encryption across all web and mobile sessions</li>
            <li>Secure, PCI-compliant payment processing</li>
            <li>Two-factor authentication (2FA) for user accounts</li>
            <li>Role-based access controls within our system</li>
            <li>Regular security audits and vulnerability assessments</li>
          </ul>
        </Section>

        <Section title="Your Rights">
          <p>As a user, you have the right to:</p>
          <ul className="list-disc pl-6">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate or outdated data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Opt out of marketing communications</li>
            <li>Lodge a complaint with a regulatory authority</li>
          </ul>
          <p className="mt-2">
            You can exercise any of these rights by contacting us at:{" "}
            <strong>privacy@horal.com</strong>
          </p>
        </Section>

        <Section title="Cookies and Tracking Technologies">
          <p>
            We use cookies to enhance your browsing experience and gather
            insights into user behavior. You can control cookie settings through
            your browser preferences.
          </p>
        </Section>

        <Section title="Data Retention">
          <p>We retain your personal data only for as long as necessary to:</p>
          <ul className="list-disc pl-6">
            <li>Provide services to you</li>
            <li>Fulfil legal and regulatory requirements</li>
            <li>Resolve disputes and enforce agreements</li>
          </ul>
          <p className="mt-2">
            After this period, your data is securely deleted or anonymized.
          </p>
        </Section>

        <Section title="Children’s Privacy">
          <p>
            Horal is not intended for children under the age of 18. We do not
            knowingly collect personal information from minors. If we become
            aware of such data, it will be deleted immediately.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this Privacy Policy periodically. We’ll notify you via
            email or in-app alert whenever significant changes are made.
            Continued use of Horal after updates indicates your acceptance of
            the new terms.
          </p>
          <p className="text-sky-500 mt-2">Last updated: April 2025</p>
        </Section>

        <Section title="Contact Us">
          <p>Have questions or concerns about your data?</p>
          <ul className="list-none pl-0">
            <li>
              <strong>Email:</strong> privacy@horal.com
            </li>
            <li>
              <strong>Phone:</strong> +234 201 330 6150
            </li>
            <li>
              <strong>Address:</strong> Horal Headquarters, Victoria Island,
              Lagos, Nigeria
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="flex flex-col gap-2">
    <h2 className="text-primary text-lg font-bold ">{title}</h2>
    <div className="text-neutral-900 text-sm font-normal  text-justify">
      {children}
    </div>
  </div>
);

export default PrivacyPolicy;

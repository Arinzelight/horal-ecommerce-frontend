import { useState } from "react";
import SupportImg from "../../assets/images/support.png";
const ContactUs = () => {
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <div className="bg-sky-950 text-white p-3 rounded mb-4">
            <h1 className="text-xl font-semibold text-center">Contact Us</h1>
          </div>

          <div>
            <img
              src={SupportImg}
              alt="Support"
              className="w-full h-48 md:h-64 object-cover rounded-lg mb-3 "
            />
          </div>

          <div className="pt-2 space-y-6">
            {/* We're Here to Help */}
            <Section title={"We're Here to Help"}>
              <p className="text-gray-700">
                At Horal, our attention and focus mean everything to us. Have
                questions, concerns, or feedback? We'd love to hear from you.
              </p>
            </Section>

            {/* Need Help with an Order */}
            <Section title="Need Help with an Order">
              <p className="text-gray-700 mb-3">
                If you're having an issue with a transaction, a product, or a
                delivery, please visit the Help Centre or use the in-app chat
                support for real-time assistance.
              </p>
              <p className="text-gray-700 mb-3">
                Our dedicated support team is available to walk you through the
                following:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Order Tracking</li>
                <li>
                  General Enquiries:
                  <a
                    href="mailto:info@horal.com"
                    className="ml-2 text-primary hover:underline"
                  >
                    info@horal.com
                  </a>
                </li>
                <li>
                  Customer Support:
                  <a
                    href="mailto:support@horal.com"
                    className="ml-2 text-primary hover:underline"
                  >
                    support@horal.com
                  </a>
                </li>
                <li>
                  Business Partnerships:
                  <a
                    href="mailto:partnerships@horal.com"
                    className="ml-2 text-primary hover:underline"
                  >
                    partnerships@horal.com
                  </a>
                </li>
                <li>We typically respond within 24-48 business hours</li>
              </ul>
            </Section>

            {/* Horal Office Address */}
            <Section title="Horal Office Address">
              <p className="text-gray-700">
                7 Adepele Street Ikeja Lagos, Nigeria.
              </p>
            </Section>

            {/* Follow us for updates */}
            <Section title={"Follow us for updates"}>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61577577661800&mibextid=ZbWKwL"
                    className="hover:text-primary hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/horal-nigeria/"
                    className="hover:text-primary hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/horalnigeria"
                    className="hover:text-primary hover:underline"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@horalnigeria"
                    className="hover:text-primary hover:underline"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </Section>

            {/* Feedback & Suggestions */}
            <Section title="Feedback & Suggestions">
              <p className="text-gray-700 mb-4">
                Have feedback, suggestions, or ideas to make Horal better? We're
                constantly improving. Share your thoughts via our feedback form
                here.
              </p>
              <p className="text-gray-700 mb-6">
                Your questions matter. Your trust is our priority. Reach out —
                we are always just a message away.
              </p>

              {/* Send Review Button */}
              <div className="bg-white rounded-lg  shadow-sm p-4 md:p-6">
                <div className="space-y-4">
                  <textarea
                    placeholder="Please type in your complaint..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className=" w-full px-3 py-2  rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[300px] resize-none"
                  />
                </div>
              </div>
              <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded transition-colors">
                Send Review
              </button>
            </Section>
          </div>
        </div>
      </div>
    </>
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

export default ContactUs;

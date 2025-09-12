import SupportImg from "../../assets/images/support.png";
const ContactUs = () => {
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
                    info@horal.ng
                  </a>
                </li>
                <li>
                  Customer Support:
                  <a
                    href="mailto:support@horal.com"
                    className="ml-2 text-primary hover:underline"
                  >
                    support@horal.ng
                  </a>
                </li>
                <li>
                  Business Partnerships:
                  <a
                    href="mailto:partnerships@horal.com"
                    className="ml-2 text-primary hover:underline"
                  >
                    partnerships@horal.ng
                  </a>
                </li>
                <li>We typically respond within 24-48 business hours</li>
              </ul>
            </Section>

            {/* 📞 Contact Number */}
            <Section title="Contact Number / WhatsApp">
              <p className="text-gray-700 mt-2">
                You can reach our support team directly via:
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  📞 Phone:{" "}
                  <a
                    href="tel:+2342013306150"
                    className="text-primary font-semibold hover:underline"
                    aria-label="Call our support team at +234 201 330 6150"
                  >
                    +234 201 330 6150
                  </a>
                </li>
                <li>
                  💬 WhatsApp:{" "}
                  <a
                    href="https://wa.me/2348085266100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                    aria-label="Chat with our support team on WhatsApp at +234 201 330 6150"
                  >
                    +234 808 526 6100
                  </a>
                </li>
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
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61577577661800"
                    className="hover:text-primary hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/horal-nigeria/"
                    className="hover:text-primary hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://x.com/horalnigeria?t=lgQIIvu4iskVm4S4nCFaZw&s=09"
                    className="hover:text-primary hover:underline"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.tiktok.com/@horalnigeria"
                    className="hover:text-primary hover:underline"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
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
    <div className="text-neutral-900 text-sm font-normal text-justify">
      {children}
    </div>
  </div>
);

export default ContactUs;

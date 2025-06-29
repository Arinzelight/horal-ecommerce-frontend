import { useState } from "react";
import SupportImg from "../../../../assets/images/support.png";
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
            <section>
              <h2 className="text-primary text-lg font-semibold mb-3">
                We're Here to Help – Anytime, Anywhere
              </h2>
              <p className="text-gray-700">
                At Horal, our attention and focus mean everything to us. Have
                questions, concerns, or feedback? We'd love to hear from you.
              </p>
            </section>

            {/* Need Help with an Order */}
            <section>
              <h2 className="text-primary text-lg font-semibold mb-3">
                Need Help with an Order?
              </h2>
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
                <li>General Enquiries: info@horal.com</li>
                <li>Customer Support: support@horal.com</li>
                <li>Business Partnerships: partnerships@horal.com</li>
                <li>We typically respond within 24-48 business hours</li>
              </ul>
            </section>

            {/* Horal Office Address */}
            <section>
              <h2 className="text-primary text-lg font-semibold mb-3">
                Horal Office Address
              </h2>
              <p className="text-gray-700">
                Plot 12, Innovation Hub, Victoria Island, Lagos, Nigeria.
              </p>
            </section>

            {/* Follow us for updates */}
            <section>
              <h2 className="text-primary text-lg font-semibold mb-3">
                Follow us for updates
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </section>

            {/* Feedback & Suggestions */}
            <section>
              <h2 className="text-primary text-lg font-semibold mb-3">
                Feedback & Suggestions
              </h2>
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

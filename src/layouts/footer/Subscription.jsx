import { useState } from "react";
import useMobile from "../../hooks/use-mobile"; // Import your isMobile hook

export default function SubscriptionSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useMobile(); // Use the hook to detect mobile screens

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (email && email.includes("@")) {
        setIsSuccess(true);
        setEmail("");
      } else {
        setError("Please enter a valid email address");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-primary-100 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Subscribe to Our News Letter
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Get the latest offers, trusted seller updates, and shopping tips
          delivered straight to your inbox.
        </p>

        {isSuccess ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
            Thank you for subscribing! Please check your email for confirmation.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`flex ${
              isMobile ? "flex-col" : "flex-row"
            } gap-2 w-full max-w-md mx-auto px-4`}
          >
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className={`w-full px-4 bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                isMobile ? "text-sm" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`bg-secondary text-white px-6 py-2 rounded-md transition-colors ${
                isMobile ? "w-full" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </section>
  );
}

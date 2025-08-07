import React from "react";

const steps = [
  {
    title: "Sign Up and Verify Your Identity",
    content: (
      <>
        To get started, simply create a free Horal account using your email
        address or mobile number. Once registered:
        <ul className="list-disc pl-5 mt-2">
          <li>Buyers can begin browsing products immediately.</li>
          <li>
            Sellers will be required to complete a KYC (Know Your Customer)
            verification process by submitting valid government-issued ID and
            relevant personal details.
          </li>
        </ul>
        <p className="mt-3 font-bold">Why it matters:</p>
        <p>
          KYC helps protect users from fraudulent sellers and builds credibility
          for businesses.
        </p>
      </>
    ),
  },
  {
    title: "Browse Products or List Your Own",
    content: (
      <>
        After registration, users can either explore a wide range of product
        listings or create their own listings:
        <ul className="list-disc pl-5 mt-2">
          <li>Buyers can filter products by category, price, and location.</li>
          <li>
            Sellers can list products or services with ease by uploading photos,
            writing descriptions, and setting prices.
          </li>
        </ul>
        <p className="mt-3 font-bold">Why it matters:</p>
        <p>
          An open marketplace gives everyone an opportunity to sell or discover
          products they need at competitive prices.
        </p>
      </>
    ),
  },
  {
    title: "Connect via Real-Time Chat",
    content: (
      <>
        Horal provides a secure real-time messaging feature:
        <ul className="list-disc pl-5 mt-2">
          <li>
            Buyers can ask questions, negotiate prices, and confirm delivery.
          </li>
          <li>Sellers can respond instantly and build rapport with buyers.</li>
        </ul>
        <p className="mt-3 font-bold">Why it matters:</p>
        <p>
          Direct interaction builds trust, reduces misunderstandings, and
          improves transaction satisfaction.
        </p>
      </>
    ),
  },
  {
    title: "Make a Secure Payment through Escrow",
    content: (
      <>
        When a buyer decides to make a purchase:
        <ul className="list-disc pl-5 mt-2">
          <li>
            The buyer pays, and funds are securely held in Horal’s escrow.
          </li>
          <li>The seller is notified and delivers the product/service.</li>
          <li>Funds are released only after buyer confirmation.</li>
        </ul>
        <p className="mt-3 font-bold">Why it matters:</p>
        <p>
          Escrow protects both parties by ensuring secure, fair transactions.
        </p>
      </>
    ),
  },
  {
    title: "Receive and Review Your Order",
    content: (
      <>
        Once the product is delivered:
        <ul className="list-disc pl-5 mt-2">
          <li>The buyer confirms receipt.</li>
          <li>
            If there's an issue, the buyer can raise a dispute before funds are
            released.
          </li>
        </ul>
        <p className="mt-3 font-bold">Why it matters:</p>
        <p>This ensures transparency and fairness in all transactions.</p>
      </>
    ),
  },
  {
    title: "Rate and Review the Transaction",
    content: (
      <>
        After the transaction is completed:
        <ul className="list-disc pl-5 mt-2">
          <li>Buyers can rate sellers based on quality and delivery.</li>
          <li>
            Sellers can also rate buyers for their behavior and ease of
            transaction.
          </li>
        </ul>
        <p className="mt-3 font-bold">Why it matters:</p>
        <p>Feedback builds platform credibility and accountability.</p>
      </>
    ),
  },
  {
    title: "Keep Shopping or Selling with Confidence",
    content: (
      <>
        Now that you've had a smooth experience:
        <ul className="list-disc pl-5 mt-2">
          <li>Save favourite sellers or items.</li>
          <li>List more products if you're a seller.</li>
          <li>Get notified about new listings and promos.</li>
        </ul>
        <p className="mt-3 font-bold">Why it matters:</p>
        <p>
          With every successful transaction, Horal strengthens trust in the
          online marketplace.
        </p>
      </>
    ),
  },
];

const HowHoralWorks = () => {
  return (
    <div className="max-w-[970px] w-full mx-auto flex flex-col gap-8 py-6">
      {/* Section Title */}
      <div className="h-12 p-2.5 bg-sky-950 rounded flex justify-between items-center">
        <h2 className="text-white text-xl font-bold font-nunito">
          How Horal Works
        </h2>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h3 className="text-sky-500 text-lg font-bold font-nunito">
              {step.title}
            </h3>
            <div className="text-neutral-900 text-sm font-nunito text-justify">
              {step.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowHoralWorks;

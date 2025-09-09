import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {/* Header */}
          <div className="bg-sky-950 text-white p-3 rounded ">
            <h1 className="text-xl font-semibold text-center">
              Refund & Dispute Resolution Policy
            </h1>
          </div>

          <div className="p-6 space-y-6">
            {/* Refund Resolution Policy */}
            <Section>
              <h2 className="text-primary text-[18px] font-semibold mb-3">
                Refund Resolution Policy
              </h2>
              <p className="text-gray-700 mb-4 text-[14px]">
                At Horal, we believe that every user deserves a safe and fair
                experience—whether you're buying or selling. Our Refund &
                Dispute Resolution Policy ensures that in the event of an issue
                with a transaction, both parties are heard and treated fairly.
              </p>
              <p className="text-gray-700">
                This policy exists to protect users against fraud,
                misrepresentation, non-delivery, and disputes that may arise
                during a transaction.
              </p>
            </Section>

            {/* Refund Policy */}
            <Section title={"Refund Policy"} className="text-[14px] ">
              <h3 className="font-semibold text-gray-800 mb-2 text-[14px]">
                When Can You Request a Refund?
              </h3>
              <p className="text-gray-700 mb-3">
                Buyers are eligible to request a refund under the following
                circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>
                  The product or service was not delivered within the agreed
                  timeframe.
                </li>
                <li>
                  The item received is damaged, defective, or significantly
                  different from the listing description.
                </li>
                <li>
                  The seller failed to communicate or provide necessary
                  information.
                </li>
                <li>
                  A service paid for was not rendered or delivered below agreed
                  standards.
                </li>
                <li>
                  The seller fails to communicate or respond within a reasonable
                  time.
                </li>
              </ul>
              <p className="text-gray-700">
                All refund requests must be initiated within the escrow holding
                period, before the funds are released to the seller.
              </p>
            </Section>

            {/* How to Request a Refund */}
            <Section title={"How to Request a Refund"}>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    • Go to Your Orders
                  </h3>
                  <p className="text-gray-700 ml-4">
                    Navigate to your dashboard, select the order in question,
                    and click on "Request Refund."
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    • Submit Evidence
                  </h3>
                  <p className="text-gray-700 ml-4">
                    Provide clear reasons for the refund request, including
                    photos or video proof, receipts, chat logs, or delivery
                    issues.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    • Seller Notification & Response
                  </h3>
                  <p className="text-gray-700 ml-4">
                    The seller will be notified and given up to 72 hours to
                    respond and either accept or contest the refund request.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    • Resolution
                  </h3>
                  <p className="text-gray-700 ml-4">
                    If the seller agrees, the refund will be processed
                    immediately. If not, the case will proceed to Horal's
                    Dispute Resolution team.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    • Refund Processing
                  </h3>
                  <p className="text-gray-700 ml-4">
                    Upon approval, Horal will process your refund to your
                    original payment method within 5-10 working days, depending
                    on your bank or payment provider.
                  </p>
                </div>
              </div>
            </Section>

            {/* Dispute Resolution Process */}
            <Section title={"Dispute Resolution Process"}>
              <p className="text-gray-700 mb-4">
                If a refund request is disputed by the seller, Horal provides a
                fair and neutral mediation process to resolve the issue.
              </p>

              <h3 className="font-semibold text-gray-800 mb-2">
                Steps in the Dispute Process:
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    • Evidence Review
                  </h4>
                  <p className="text-gray-700 ml-4">
                    Both parties will be asked to submit any relevant evidence
                    to support their claim (product photos, tracking
                    information, chat logs, invoices, etc.).
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">
                    • Mediation by Horal
                  </h4>
                  <p className="text-gray-700 ml-4">
                    Horal's dispute resolution team will impartially review all
                    submissions and may request additional details from either
                    party.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">
                    • Final Decision
                  </h4>
                </div>
              </div>

              <p className="text-gray-700 mt-3 mb-2">Based on the evidence:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>A full or partial refund may be granted to the buyer.</li>
                <li>
                  The funds may be released to the seller if claims are
                  unsubstantiated.
                </li>
                <li>
                  In complex cases, Horal may recommend that the item be
                  returned for a full refund (return shipping cost
                  responsibilities will be determined based on the case).
                </li>
              </ul>

              <h3 className="font-semibold text-gray-800 mb-2">Closure</h3>
              <p className="text-gray-700">
                Once a decision is reached, it is considered final and binding
                and will be implemented within the platform's terms of service.
              </p>
            </Section>

            {/* Important Guidelines */}
            <Section title={"Important Guidelines"}>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  Refunds and disputes are only eligible for transactions made
                  within the Horal platform.
                </li>
                <li>
                  Transactions done outside Horal are not protected or covered
                  under this policy.
                </li>
                <li>
                  Misuse of the dispute system may result in temporary
                  suspension or permanent account deactivation.
                </li>
                <li>
                  Users found to be making fraudulent claims may face legal
                  action and will be removed from the platform.
                </li>
                <li>
                  We encourage open, respectful communication between users to
                  prevent unnecessary conflicts.
                </li>
              </ul>
            </Section>

            {/* Buyer and Seller Protection Guarantee */}
            <Section title={"Buyer and Seller Protection Guarantee"}>
              <p className="text-gray-700 mb-3">
                Horal's Escrow System holds funds securely until the buyer
                confirms satisfaction. This guarantees:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  Buyers are protected from paying for items they did not
                  receive or approve.
                </li>
                <li>
                  Sellers are assured of payment once they fulfill the order
                  correctly.
                </li>
              </ul>
            </Section>

            {/* Need Assistance */}
            <Section title="Need Assistance?">
              <p className="text-gray-700 mb-4">
                Our dedicated support team is here to help you with any refund
                or dispute issue.
              </p>

              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> support@horal.com
                </p>
                <p>
                  <strong>Phone:</strong> +234 201 330 6150
                </p>
                <p>
                  <strong>Live Chat:</strong> Available Mon-Fri, 9am-6pm WAT
                </p>
              </div>

              <p className="text-gray-700 mt-4">
                <span className="p-1">Visit our</span>
                <Link to="/contact-us" className="text-sky-500 hover:underline">
                  Help Centre
                </Link>{" "}
                for step-by-step guides
              </p>
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
export default RefundPolicy;

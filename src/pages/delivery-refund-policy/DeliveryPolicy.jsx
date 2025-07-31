import React from "react";
import { Section, Header } from "../../components/Section";

const DeliveryPolicy = () => {
  return (
    <div className="w-full max-w-[970px] mx-auto flex flex-col gap-8 overflow-hidden p-4">
      <Header title="Delivery and Return Policy" />

      <p className="text-neutral-900 text-sm font-normal text-justify">
        At Hand, we are committed to ensuring every transaction is transparent
        and satisfactory. This policy outlines how products are delivered, the
        expectations around providing items, and the conditions under which
        buyers may initiate a return or request a refund.
      </p>

      <div className="flex flex-col gap-8">
        <Section title="Delivery Policy">
          <p className="font-semibold">Order Processing:</p>
          <ul className="list-disc pl-6">
            <li>
              Once an order is confirmed and payment is secured via escrow, the
              seller is required to ship or deliver the item within the
              timeframe specified in their listing.
            </li>
            <li>
              The buyer will receive order status updates, including shipping
              details and estimated delivery date.
            </li>
          </ul>
        </Section>

        <Section title="Delivery Timeline">
          <ul className="list-disc pl-6">
            <li>
              Standard delivery times vary between 1 to 7 business days
              depending on location and delivery partner.
            </li>
            <li>
              Sellers must communicate estimated delivery windows in their
              product listings.
            </li>
          </ul>
        </Section>

        <Section title="Handling Delayed Deliveries">
          <ul className="list-disc pl-6">
            <li>
              Buyers should contact the seller if delivery exceeds the expected
              timeframe.
            </li>
            <li>
              If unresolved, buyers may escalate to Hand's Support Team to issue
              escrow release and initiate investigation.
            </li>
          </ul>
        </Section>

        <Section title="Proof of Delivery">
          <p>Sellers are required to provide proof of delivery such as:</p>
          <ul className="list-disc pl-6">
            <li>Delivery receipt</li>
            <li>Tracking ID</li>
            <li>Digital signature confirmation</li>
          </ul>
        </Section>

        <Section title="Return & Refund Policy">
          <p className="font-semibold">Eligibility for Return:</p>
          <ul className="list-disc pl-6">
            <li>Delayed delivery beyond promised timeframe</li>
            <li>Product was damaged or delivered to wrong address</li>
            <li>Wrong or incomplete item was delivered</li>
          </ul>
        </Section>

        <Section title="Return Window">
          <ul className="list-disc pl-6">
            <li>
              Buyers must initiate returns within 72 hours of receiving the
              product.
            </li>
            <li>
              If no action is taken, funds are automatically released to the
              seller after this period.
            </li>
          </ul>
        </Section>

        <Section title="Return Process">
          <ul className="list-disc pl-6">
            <li>
              Buyer initiates return from dashboard with supporting evidence
              (photos, videos, descriptions).
            </li>
            <li>
              If parties agree, escrow funds are either refunded or adjusted.
            </li>
          </ul>
        </Section>

        <Section title="Return Shipping">
          <ul className="list-disc pl-6">
            <li>
              Return shipping costs are typically covered by the seller for
              wrong or damaged items.
            </li>
            <li>
              For other cases, parties may agree on shipping cost
              responsibility.
            </li>
          </ul>
        </Section>

        <Section title="Refunds">
          <ul className="list-disc pl-6">
            <li>
              Refunds are processed through escrow wallet within 3-5 business
              days.
            </li>
            <li>
              Funds may be returned to original payment method or buyer's wallet
              for future use.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
};
export default DeliveryPolicy;
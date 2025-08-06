import { Section, Header } from "../../components/Section";
const EscrowTC = () => {
  return (
    <div className="w-full max-w-[970px] mx-auto flex flex-col gap-8 overflow-hidden p-4">
      <Header title="Escrow Terms & Conditions" />

      <Section title="Overview of Escrow">
        <p>
          Hard 5 Escrow Service is a secure payment feature that protects both
          buyers and sellers by holding funds during a transaction. Funds are
          released to the seller only after the buyer confirms satisfactory
          receipt of the product or service.
        </p>
      </Section>

      <div className="flex flex-col gap-8">
        <Section title="How the Escrow Process Works">
          <ul className="list-disc pl-6">
            <li>
              Buyer makes payment which is placed in Hard 5's secure escrow
              system.
            </li>
            <li>
              Seller delivers product/service and provides proof of delivery.
            </li>
            <li>Buyer confirms satisfaction via their dashboard.</li>
            <li>Funds are released to seller's wallet after confirmation.</li>
            <li>
              If disputes arise, transaction enters resolution process moderated
              by Hard 5.
            </li>
          </ul>
        </Section>

        <Section title="Timelines for Buyer Confirmation">
          <ul className="list-disc pl-6">
            <li>Buyers must confirm receipt within 72 hours of delivery.</li>
            <li>
              If no action is taken, funds may be automatically released to
              seller after 8 days (if no disputes).
            </li>
          </ul>
        </Section>

        <Section title="Disputes & Resolutions">
          <ul className="list-disc pl-6">
            <li>
              Buyers must file disputes within the 72-hour confirmation window.
            </li>
            <li>
              Hard 5 support team will mediate and review evidence from both
              parties.
            </li>
            <li>
              Decision will either refund buyer or release funds to seller based
              on findings.
            </li>
          </ul>
        </Section>

        <Section title="Eligible Transactions">
          <p>
            Most marketplace transactions are eligible for escrow. Certain
            low-value or instant transactions may be excluded based on platform
            policy updates.
          </p>
        </Section>

        <Section title="Seller Responsibilities">
          <ul className="list-disc pl-6">
            <li>Must deliver exact product/service as described in listing.</li>
            <li>Must provide proof of delivery when required.</li>
            <li>
              Failure to meet obligations may result in withheld funds or
              account penalties.
            </li>
          </ul>
        </Section>

        <Section title="Buyer Responsibilities">
          <ul className="list-disc pl-6">
            <li>Must inspect items upon delivery and confirm satisfaction.</li>
            <li>Must raise disputes within given timeframe if issues arise.</li>
            <li>
              False disputes or system abuse may lead to account restrictions.
            </li>
          </ul>
        </Section>

        <Section title="Escrow Fees">
          <p>
            A small processing fee applies to escrow transactions to cover
            operational costs. Fees will be clearly disclosed before payment.
          </p>
        </Section>

        <Section title="Limitations of Liability">
          <p>
            While Hard 5 will mediate disputes, the platform is not responsible
            for:
          </p>
          <ul className="list-disc pl-6">
            <li>Delays caused by third-party logistics</li>
            <li>Incomplete addresses or transaction negligence</li>
            <li>Issues resulting from incomplete product descriptions</li>
          </ul>
        </Section>

        <Section title="Amendments">
          <p>
            Hard 5 reserves the right to update these Escrow Terms & Conditions
            at any time. Continued use of the platform constitutes acceptance of
            the latest terms.
          </p>
        </Section>
      </div>
    </div>
  );
};
export default EscrowTC;
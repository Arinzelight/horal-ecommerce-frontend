import { Section, Header } from "../../components/Section";
import HORAL_CARD_IMG from "../../assets/images/card.png";
import {
  IoCard,
} from "react-icons/io5";

const SecuredPayment = () => {
  return (
    <main>
      <div className="w-full max-w-[970px] mx-auto flex flex-col gap-8 overflow-hidden p-4">
        <Header title="Secured Payment Options" />
        <p className="text-neutral-900 text-sm font-normal text-justify">
          At Horal, we understand that secure transactions are paramount for a
          positive online shopping experience. We've implemented robust measures
          and partnered with trusted providers to ensure your financial
          information is safe and protected every step of the way. Shop with
          confidence knowing your payments are secure.
        </p>

        <h2 className="text-neutral-700 text-xl font-bold font-nunito w-full">
          Flexible Payment Choice
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-12">
          {/* Image */}
          <img
            className="w-full md:w-[479px] h-90 object-cover rounded-lg"
            src={HORAL_CARD_IMG || "https://placehold.co/479x360"}
            alt="Mission illustration"
          />
          {/* Text Section */}
          <div className="w-full md:w-96 flex flex-col gap-4">
            {/* Icon + Title */}
            <div className="flex-col items-center gap-3">
              <div className="w-14 h-14 p-4 bg-sky-500 rounded-[30px] flex justify-center items-center">
                <IoCard className="text-white text-2xl" />
              </div>
              <h2 className="text-sky-500 text-lg font-bold font-nunito">
                Credit and Debit Cards
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-900 text-justify">
              Shop conveniently and securely using your Visa, Mastercard, Verve,
              and other major credit and debit cards. Your card details are
              protected through our trusted payment gateway, which utilizes
              industry-standard SSL encryption to safeguard your sensitive
              information during transmission. We do not store your full card
              details on our servers, ensuring an extra layer of security for
              every transaction you make on Horal.
            </p>
          </div>
        </div>

        <h2 className="text-neutral-700 text-xl font-bold font-nunito w-full">
          Your Role in Staying Safe
        </h2>

        <Section title="Use strong passwords and keep them confidential">
          <p className="text-sm text-neutral-900 text-justify">
            Shop conveniently and securely using your Visa, Mastercard, Verve,
            and other major credit and debit cards. Your card details are
            protected through our trusted payment gateway, which utilizes
            industry-standard SSL encryption to safeguard your sensitive
            information during transmission. We do not store your full card
            details on our servers, ensuring an extra layer of security for
            every transaction you make on Horal.
          </p>
          <p className="my-3 text-sm font-bold">
            How to keep your password confidential
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-neutral-900">
              <strong>Never Share:</strong> Do not tell anyone your password,
              not even friends or family. Horal support will never ask for your
              password.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Be Wary of Where You Type:</strong> Be cautious when
              entering your password on public or shared computers. Avoid saving
              passwords on these devices.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Cover Your Typing:</strong> When entering your password in
              public, shield the keyboard from prying eyes.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>
                Don't Write It Down (Unless Absolutely Necessary):
              </strong>{" "}
              If you must write down your password, store it in a secure place
              away from your device and don't label it clearly. Consider using a
              password manager application, which securely stores your passwords
              and can generate strong ones.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Beware of Phishing:</strong> Be suspicious of emails or
              messages asking for your password. Legitimate services will not
              request your password via email.
            </li>
          </ul>
        </Section>

        <Section title="Be cautious of phishing attempts and suspicious emails">
          <p className="text-sm text-neutral-900 text-justify">
            Phishing is a common tactic used by cybercriminals to trick you into
            revealing sensitive information like your login credentials, payment
            details, or personal data. They often impersonate legitimate
            organizations like Horal, banks, or other online services. Falling
            for a phishing attempt can lead to a serious breach of your security
            and privacy.
          </p>
          <p className="my-3 text-sm font-bold">
            How to identify phishing attempts
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-neutral-900">
              <strong>Unsolicited Communication:</strong> Be wary of unexpected
              emails, messages, or calls asking for personal information.
              Legitimate organizations usually don't request sensitive data this
              way.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Sense of Urgency:</strong> Phishing messages often create
              a false sense of urgency, pressuring you to act immediately (e.g.,
              "Your account will be suspended if you don't verify now").
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Suspicious Links:</strong> Hover over links before
              clicking to see the actual URL. If it looks unfamiliar or doesn't
              match the legitimate website address, don't click it.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Grammar and Spelling Errors:</strong> Many phishing emails
              contain poor grammar, misspellings, or awkward phrasing.
              Legitimate communications are usually well-written.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Generic Greetings:</strong> Be suspicious of emails that
              start with generic greetings like "Dear Customer" instead of your
              name.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Requests for Sensitive Information:</strong> Legitimate
              companies typically don't ask for passwords, PINs, or other highly
              sensitive information via email.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Spoofed Email Addresses:</strong> Check the sender's email
              address carefully. Scammers can sometimes create addresses that
              look similar to legitimate ones but have slight differences.
            </li>
          </ul>
        </Section>

        <Section title="Review Order Details Carefully Before Confirming Payment">
          <p className="text-sm text-neutral-900 text-justify">
            Before completing any purchase on Horal, double-check all the
            details of your order to avoid errors that could lead to financial
            loss, including the wrong items, or shipping to the wrong address.
            Cybercriminals might also try to manipulate order details if they
            have compromised the seller's account.
          </p>
          <p className="my-3 text-sm font-bold">
            What to review before confirming payment
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-neutral-900">
              <strong>Items in Your Cart:</strong> Ensure all the products
              listed are the ones you intended to purchase, including the
              correct quantity, size, color, and any other specifications.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Subtotal:</strong> Check that the total of each item
              reflects the quantity and specifications you selected. If there's
              a discount, verify that it has been correctly applied.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Billing Address:</strong> Ensure the billing address
              matches the address associated with your payment method.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Sales Information:</strong> Review important details like
              VAT, shipping costs, and any additional fees. Look for "Verified
              Seller" badges if available.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Return Policy:</strong> Familiarize yourself with the
              seller's and Horal's return policy before making a purchase.
            </li>
          </ul>
          <p className="my-3 text-sm font-bold">
            Tips to review order details carefully
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-neutral-900">
              <strong>Take Your Time:</strong> Don't rush through the checkout
              process. Take a moment to carefully read and verify all the
              information.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Pay Attention to Confirmation Pages:</strong> Review the
              order confirmation page and email for accuracy before clicking the
              confirm or similar button.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Check Your Order Confirmation Email:</strong> After
              placing an order, review the confirmation email you receive to
              ensure everything is correct. Contact our customer service team
              immediately if you notice any discrepancies.
            </li>
          </ul>
        </Section>

        <Section title="Contact Horal Support Immediately If You Suspect Any Unauthorized Activity">
          <p className="text-sm text-neutral-900 text-justify">
            Promptly reporting any suspected unauthorized activity helps protect
            your account, reduces your financial risk, safeguards others, and
            potentially helps recover any fraudulent charges while preserving
            important evidence.
          </p>
          <p className="my-3 text-sm font-bold">
            What constitutes suspected unauthorized activity
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-neutral-900">
              <strong>Unrecognized Login Attempts:</strong> If you receive
              notifications about login attempts from unfamiliar locations or
              devices.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Unrecognized Purchases:</strong> If you see activity in
              your purchase history that you did not cause.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Changes to Your Account:</strong> If your password, email
              address, phone number, or other important methods have been
              changed without your knowledge.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Suspicious Account Messages:</strong> If you receive
              strange messages or notifications that you did not trigger.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Unusual Account Behavior:</strong> Any other activity that
              seems out of the ordinary or that you don't recognize.
            </li>
          </ul>
          <p className="my-3 text-sm font-bold">
            How to contact Horal support immediately
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-neutral-900">
              <strong>Use Official Channels:</strong> Contact Horal support
              through the official contact methods provided on Horal website or
              mobile app (e.g. contact forms, email addresses, phone numbers),
              but avoid if uncertain. Avoid contacting support through
              unofficial channels or responding directly to suspicious emails.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Report the Issue Immediately:</strong> Don't wait. As soon
              as you notice any suspicious activity, reach out to Horal support
              with detailed information.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Follow Their Instructions:</strong> Cooperate with Horal
              support and follow their instructions to help them investigate and
              resolve the issue.
            </li>
            <li className="text-sm text-neutral-900">
              <strong>Change Your Password:</strong> If your account has been
              compromised, change your account password immediately, and enable
              two-factor authentication if available.
            </li>
          </ul>
        </Section>
      </div>
    </main>
  );
};

export default SecuredPayment;

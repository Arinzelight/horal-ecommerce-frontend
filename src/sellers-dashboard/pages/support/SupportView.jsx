import SupportOptionCard from "./SupportOptions";
import { MdSupportAgent } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { BsTelephone } from "react-icons/bs";
import SupportImg from "../../../assets/images/support.png";
import SectionHeader from "../../components/SectionHeader";
import { useNavigate } from "react-router-dom";

const MainSupportView = ({ onNavigate }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-2 py-2 bg-neutral-50  overflow-hidden">
      <SectionHeader title="Contact Us" />
      <div>
        <img
          src={SupportImg}
          alt="Support"
          className="w-full h-48 md:h-64 object-cover rounded-lg mb-2 "
        />
      </div>

      <div className="space-y-4 md:space-y-3">
        <SupportOptionCard
          icon={MdSupportAgent}
          title="Faq Center"
          mobileDescription="Need help? Get quick answers with our FAQs."
          desktopDescription="Need help? Get quick answers with our FAQS"
          buttonText="Browse FAQs"
          onButtonClick={() => navigate("/faq")}
        />

        <SupportOptionCard
          icon={CgMail}
          title="Need Support?"
          mobileDescription="Didn’t find what you were looking for? Reach out via email, and our support team will get back to you within 24 hours."
          desktopDescription="Didn’t find what you were looking for? Send an email to support@horal.com and our support team will get back to you within 24–48 hours. Response Time: Mon–Fri, 9 AM – 6 PM"
          buttonText="Send Us an Email for Support"
          onButtonClick={() => onNavigate("email")}
        />

        <SupportOptionCard
          icon={BsTelephone}
          title="Call Us"
          mobileDescription="Need urgent help? Call our customer support line during working hours (Mon–Sat, 9:00 AM – 6:00 PM)."
          desktopDescription="Need urgent help? Call our customer support line on 📞 +2348035218940 during working hours (Mon–Sat, 9:00 AM – 6:00 PM).  "
          buttonText="Call Now"
          onButtonClick={() => {}}
        />
      </div>
    </div>
  );
};
export default MainSupportView;

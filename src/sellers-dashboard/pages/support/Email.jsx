import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import SupportImg from "../../../assets/images/support.png";
import SectionHeader from "../../components/SectionHeader";


const EmailView = ({ onNavigate }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50  overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <SectionHeader title="Frequently Asked Questions" />
        </div>

        <button className="flex items-center gap-2 mb-4">
          <FaArrowLeft
            className="w-4 h-4 text-neutral-700 cursor-pointer"
            aria-label="Back to main support"
            title="Back to main support"
            onClick={() => onNavigate("main")}
          />
          <span className="text-neutral-700">Go Back</span>
        </button>

        <div>
          <img
            src={SupportImg}
            alt="Support"
            className="w-full h-48 md:h-64 object-cover rounded-lg mb-6 "
          />
        </div>

        <div className="bg-white rounded-lg  shadow-sm p-4 md:p-6">
          <div className="space-y-4">
            <textarea
              placeholder="Please type in your complaint..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className=" w-full px-3 py-2  rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[300px] resize-none"
            />
            <div className="flex justify-end">
              <button className="px-6 py-2 text-white rounded-sm  bg-secondary hover:opacity-85 cursor-pointer px-8">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EmailView;

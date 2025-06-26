import { FaChevronDown } from "react-icons/fa";

const MobileFAQAccordion = ({ category, questions, isOpen, onToggle }) => {
  return (
    <div className="">
      <div
        className=" py-3 cursor-pointer flex justify-between items-center"
        onClick={onToggle}
      >
        <span className="text-neutral-700 text-left">{category}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <FaChevronDown className="w-4 h-4 text-gray-600" />
        </span>
      </div>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="space-y-4">
            {questions.map((faq, faqIndex) => (
              <div key={faqIndex} className="border-l-2 border-gray-200 pl-4">
                <h4 className="font-medium mb-2 text-sm">{faq.question}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFAQAccordion;
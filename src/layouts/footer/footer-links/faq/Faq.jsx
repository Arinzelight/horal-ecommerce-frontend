import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import faqData from "./faqData"; 
import MobileFAQAccordion from "./MobileAccordian";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 text-white rounded-sm  bg-secondary hover:opacity-85 cursor-pointer"
    >
      {children}
    </button>
  );
};

const FAQQuestionCard = ({ question, answer }) => {
  return (
    <div className="bg-white rounded-lg border border-neutral-400 p-4">
      <h3 className="font-medium mb-2">{question}</h3>
      <p className="text-neutral-700 text-[16px] leading-relaxed">{answer}</p>
    </div>
  );
};
const Faq = ({ onNavigate }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0); // Track selected category for desktop

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* faq header */}

        <div className="bg-primary text-white p-3 rounded">
          <h1 className="text-xl font-semibold text-center">Frequently Asked Questions</h1>
        </div>
        {/* Desktop Layout */}
        <div className="hidden md:flex gap-8 mt-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="p-4 sticky top-6">
              <nav className="space-y-2">
                {faqData.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`block w-full text-left px-3 py-2 text-sm  transition-colors ${
                      index === selectedCategory
                        ? "text-primary "
                        : "text-neutral-700 "
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content - Show only selected category */}
          <div className="flex-1">
            <div className="space-y-6">
              <div
                id={faqData[selectedCategory].category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}
              >
                <h2 className="text-lg font-semibold mb-4">
                  {faqData[selectedCategory].category}
                </h2>
                <div className="space-y-4">
                  {faqData[selectedCategory].questions.map((faq, faqIndex) => (
                    <FAQQuestionCard
                      key={faqIndex}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Accordion */}
        <div className="md:hidden space-y-2 mt-6">
          {faqData.map((category, categoryIndex) => (
            <MobileFAQAccordion
              key={categoryIndex}
              category={category.category}
              questions={category.questions}
              isOpen={openAccordion === categoryIndex}
              onToggle={() =>
                setOpenAccordion(
                  openAccordion === categoryIndex ? null : categoryIndex
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;

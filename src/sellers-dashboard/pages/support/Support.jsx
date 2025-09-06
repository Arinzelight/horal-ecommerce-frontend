import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import MainSupportView from "./SupportView";
// import FAQView from "./Faq";
import CreateTicket from "./Email";

const SupportPage = () => {
  const [currentView, setCurrentView] = useState("main");

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
      {currentView === "main" && (
        <MainSupportView onNavigate={handleNavigate} />
      )}
      {/* {currentView === "faq" && <FAQView onNavigate={handleNavigate} />} */}
      {currentView === "email" && <CreateTicket onNavigate={handleNavigate} />}
    </div>
  );
}

export default SupportPage; 

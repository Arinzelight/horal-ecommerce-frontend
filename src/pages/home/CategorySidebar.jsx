"use client";

import { useState } from "react";
import {
  FaTshirt,
  FaGem,
  FaHeartbeat,
  FaMobile,
  FaBaby,
  FaTools,
  FaUtensils,
  FaCar,
  FaWrench,
  FaEllipsisH,
  FaChevronDown,
} from "react-icons/fa";
import useMobile  from "../../hooks/use-mobile";
import MobileCategoryGrid from "./MobileCategory";

export default function Sidebar() {
  const isMobile = useMobile();
  const [showCategoryGrid, setShowCategoryGrid] = useState(false);

  const toggleCategoryGrid = () => {
    setShowCategoryGrid(!showCategoryGrid);
  };

  const categories = [
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Accessories", icon: <FaGem /> },
    { name: "Health & Beauty", icon: <FaHeartbeat /> },
    { name: "Electronics", icon: <FaMobile /> },
    { name: "Babies", icon: <FaBaby /> },
    { name: "Gadgets", icon: <FaTools /> },
    { name: "Health & Beauty", icon: <FaHeartbeat /> },
    { name: "Food", icon: <FaUtensils /> },
    { name: "Vehicles", icon: <FaCar /> },
    { name: "Services", icon: <FaWrench /> },
    { name: "Others", icon: <FaEllipsisH /> },
  ];

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-full mt-4 mb-4">
        {/* Mobile Categories Button */}
        <div className="w-full">
          <button
            onClick={toggleCategoryGrid}
            className={`w-full flex items-center justify-between bg-blue-500 text-white px-4 py-3 rounded ${
              showCategoryGrid ? "bg-blue-600" : ""
            }`}
          >
            <span className="text-[16px]">Categories</span>
            <FaChevronDown
              className={`transition-transform w-6 h-6 ${
                showCategoryGrid ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Show category grid when toggled */}
        {showCategoryGrid && <MobileCategoryGrid />}
      </div>
    );
  }

  // Desktop view
  return (
    <div className="w-full h-[500px] bg-blue-500 text-white p-4  overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full flex items-center hover:bg-blue-600 p-2 rounded cursor-pointer"
          >
            <div className="w-8 h-8 bg-white text-blue-500 rounded-full flex items-center justify-center mr-2">
              {category.icon}
            </div>
            <span className="text-[16px]">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

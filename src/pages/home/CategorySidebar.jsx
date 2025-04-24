// "use client";

import { useState } from "react";
import {
  FaChevronDown,
} from "react-icons/fa";
import useMobile  from "../../hooks/use-mobile";
import MobileCategoryGrid from "./MobileCategory";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/mockProducts";
export default function Sidebar() {
  const isMobile = useMobile();
  const [showCategoryGrid, setShowCategoryGrid] = useState(false);
 const navigate = useNavigate();


  const toggleCategoryGrid = () => {
    setShowCategoryGrid(!showCategoryGrid);
  };

  const handleCategoryClick = (category) => {
    // Navigate to the category page
    navigate(`/category/${category}`);
    if(isMobile){
      setShowCategoryGrid(false); // Close the category grid on mobile
    }
  }
  

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-full mt-4 mb-4 relative">
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
        
        {showCategoryGrid && (
        <div className="left-0 right-0 top-full z-10 shadow-lg">
           <MobileCategoryGrid onCategoryClick={handleCategoryClick}/>
        </div>
        )}
      </div>
    );
  }

  // Desktop view
  return (
    <div className="w-full h-[500px] bg-blue-500 text-white p-4  overflow-y-auto hidden md:block lg:block ">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full flex items-center hover:bg-blue-600 p-2 rounded cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
            aria-label={`Go to ${category.name} category`}
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

        



// import { useState, useEffect } from "react";
// import {
//   FaTshirt,
//   FaGem,
//   FaHeartbeat,
//   FaMobile,
//   FaBaby,
//   FaTools,
//   FaUtensils,
//   FaCar,
//   FaWrench,
//   FaEllipsisH,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// // import { useMobile } from "@/hooks/use-mobile";

// export default function CategorySidebar() {
//   const isMobile = useMobile();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   // Prevent body scrolling when sidebar is open on mobile
//   useEffect(() => {
//     if (isMobile) {
//       if (sidebarOpen) {
//         document.body.style.overflow = "hidden";
//       } else {
//         document.body.style.overflow = "";
//       }
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [sidebarOpen, isMobile]);

//   const categories = [
//     { name: "Fashion", icon: <FaTshirt /> },
//     { name: "Accessories", icon: <FaGem /> },
//     { name: "Health & Beauty", icon: <FaHeartbeat /> },
//     { name: "Electronics", icon: <FaMobile /> },
//     { name: "Babies", icon: <FaBaby /> },
//     { name: "Gadgets", icon: <FaTools /> },
//     { name: "Health & Beauty", icon: <FaHeartbeat /> },
//     { name: "Food", icon: <FaUtensils /> },
//     { name: "Vehicles", icon: <FaCar /> },
//     { name: "Services", icon: <FaWrench /> },
//     { name: "Others", icon: <FaEllipsisH /> },
//   ];

//   // Mobile view
//   if (isMobile) {
//     return (
//       <>
//         {/* Menu Button */}
//         <div className="w-full flex  justify-between bg-primary text-white px-4 py-2 rounded mt-4 mb-4">
//           <h2 className="text-[16px] font-bold">Categories</h2>
//           <button
//             onClick={toggleSidebar}
//             className=""
//             aria-label="Toggle categories menu"
//           >
//             <FaBars className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Overlay */}
//         {/* {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-10 z-40 transition-opacity duration-300"
//             onClick={toggleSidebar}
//           />
//         )} */}

//         {/* Sliding Sidebar */}
//         <div
//           className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex items-center justify-between px-8 py-4 border-b border-blue-400">
//             <h2 className="text-2xl  ">Categories</h2>
//             <button
//               onClick={toggleSidebar}
//               className=" p-1 hover:bg-secondary hover:text-white rounded-full"
//               aria-label="Close menu"
//             >
//               <FaTimes className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="p-4 overflow-y-auto bg-white text-black h-[calc(100%-70px)]">
//             <div className="space-y-2">
//               {categories.map((category, index) => (
//                 <button
//                   key={index}
//                   className="w-full flex items-center  hover:text-white p-3 rounded cursor-pointer"
//                 >
//                   <div className="w-10 h-10 bg-secondary text-white  rounded-full flex items-center justify-center mr-3">
//                     {category.icon}
//                   </div>
//                   <span className="text-[16px] text-black ">
//                     {category.name}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Desktop view
//   return (
//     <div className="w-full h-[500px] bg-blue-500 text-white p-4 overflow-y-auto">
//       <h2 className="text-xl font-bold mb-4">Categories</h2>
//       <div className="space-y-2">
//         {categories.map((category, index) => (
//           <button
//             key={index}
//             className="w-full flex items-center hover:bg-blue-600 p-2 rounded cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-white text-blue-500 rounded-full flex items-center justify-center mr-2">
//               {category.icon}
//             </div>
//             <span className="text-[16px]">{category.name}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

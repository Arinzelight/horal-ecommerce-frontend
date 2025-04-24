// "use client";

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaPlus, FaChevronDown } from "react-icons/fa";
// import StateDropdown from "./StateDropdown";
// import useMobile from "../../hooks/use-mobile";

// export default function Header() {
//   const [showStateDropdown, setShowStateDropdown] = useState(false);
//   const isMobile = useMobile();

//   const toggleStateDropdown = () => {
//     setShowStateDropdown(!showStateDropdown);
//   };

//   return (
//     <header className="bg-white py-3 px-4 shadow-md">
//       {/* Mobile Top Row (Search + State) */}
//       {isMobile && (
//         <div className="w-full flex items-center mb-3 gap-2">
//           <div className="relative flex-1">
//             <button
//               onClick={toggleStateDropdown}
//               className="flex items-center justify-between w-full px-3 py-2 border rounded-md"
//             >
//               <span className="text-sm">State</span>
//               <FaChevronDown className="ml-2 text-xs" />
//             </button>
//             {showStateDropdown && <StateDropdown />}
//           </div>

//           <div className="flex flex-1">
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
//             />
//             <button className="bg-blue-500 text-white p-2 rounded-r-md">
//               <FaSearch className="text-sm" />
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="container flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           href="/"
//           className={`flex items-center text-2xl font-bold ${isMobile ? "order-2" : ""}`}
//         >
//           <span className="text-blue-600">H</span>
//           <span className="text-black">oral</span>
//         </Link>

//         {/* Desktop Middle Section */}
//         {!isMobile && (
//           <div className="flex-1 mx-8 flex items-center">
//             <div className="relative mr-2">
//               <button
//                 onClick={toggleStateDropdown}
//                 className="flex items-center justify-between w-full px-3 py-2 border rounded-md"
//               >
//                 <span>Select State</span>
//                 <FaChevronDown className="ml-2" />
//               </button>
//               {showStateDropdown && <StateDropdown />}
//             </div>

//             <div className="flex-1 flex">
//               <input
//                 type="text"
//                 placeholder="Search for anything"
//                 className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
//                 Search
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Sell Button */}
//         <div className={isMobile ? "order-3" : ""}>
//           <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded flex items-center text-sm md:text-base md:px-4">
//             {isMobile ? <FaPlus /> : "Sell"}
//             {!isMobile && <FaPlus className="ml-1" />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus, FaChevronDown } from "react-icons/fa";
import StateDropdown from "./StateDropdown";
import  useMobile  from "../../hooks/use-mobile";
import Logo from "../../assets/images/horal-logo-1.png";

export default function HeaderBottom() {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const isMobile = useMobile();

  const toggleStateDropdown = () => {
    setShowStateDropdown(!showStateDropdown);
  };

  if (isMobile) {
    return (
      <header className="bg-white py-3 px-4 shadow-sm">
        <div className="flex flex-col gap-3">
          
          <div className="flex items-center gap-2">
            <Link to="/" className="flex-shrink-0">
              <img src={Logo} alt="Horal Logo" className="h-8" />
            </Link>
            <div className="flex-1 flex items-center">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full px-3 py-2 bg-gray-200 rounded-md text-sm"
              />
              <button className="bg-primary ml-2 text-white p-2 h-9 rounded-md min-w-[40px]">
                <FaSearch className="text-sm ml-1" />
              </button>
            </div>
          </div>

          {/* Bottom row - State dropdown and Sell button */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <button
                onClick={toggleStateDropdown}
                className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md min-w-[100px]"
              >
                <span className="text-sm">State</span>
                <FaChevronDown className="ml-2 text-xs" />
              </button>
              {showStateDropdown && <StateDropdown />}
            </div>
            <button className="bg-secondary text-white px-8 py-2 rounded flex items-center text-sm">
              Sell <FaPlus className="ml-1" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Desktop layout 
  return (
    <header className="bg-white py-3 px-4 shadow-sm">
      <div className="container flex items-center justify-between">
        
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="Horal Logo" className="h-8" />
        </Link>

        <div className="flex-1 mx-8 flex items-center">
          <div className="relative mr-2">
            <button
              onClick={toggleStateDropdown}
              className="flex items-center text-sm justify-between w-full h-9 px-2 py-1 border rounded-md"
            >
              <span>Select State</span>
              <FaChevronDown className="ml-2" />
            </button>
            {showStateDropdown && <StateDropdown />}
          </div>

          <div className="flex-1 flex">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full px-3 py-2 bg-gray-200 rounded-md"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4">
              Search
            </button>
          </div>
        </div>

        <div className="">
          <button className="bg-secondary text-white px-8 py-2 rounded flex items-center text-base">
            Sell <FaPlus className="ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
}

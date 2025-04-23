// import React from "react"

// export default function Pagination({ currentPage, totalPages, onPageChange }) {
//   if (totalPages <= 1) return null

//   return (
//     <div className="mt-8 flex justify-center">
//       <div className="flex items-center space-x-1">
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded-md ${
//             currentPage === 1
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "bg-white text-blue-500 hover:bg-blue-50 border"
//           }`}
//         >
//           First
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded-md ${
//             currentPage === 1
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "bg-white text-blue-500 hover:bg-blue-50 border"
//           }`}
//         >
//           Prev
//         </button>

//         {/* Page numbers */}
//         {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
//           let pageNum
//           if (totalPages <= 5) {
//             pageNum = i + 1
//           } else if (currentPage <= 3) {
//             pageNum = i + 1
//           } else if (currentPage >= totalPages - 2) {
//             pageNum = totalPages - 4 + i
//           } else {
//             pageNum = currentPage - 2 + i
//           }

//           if (pageNum > 0 && pageNum <= totalPages) {
//             return (
//               <button
//                 key={pageNum}
//                 onClick={() => onPageChange(pageNum)}
//                 className={`px-3 py-1 rounded-md ${
//                   currentPage === pageNum ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-blue-50 border"
//                 }`}
//               >
//                 {pageNum}
//               </button>
//             )
//           }
//           return null
//         })}

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 rounded-md ${
//             currentPage === totalPages
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "bg-white text-blue-500 hover:bg-blue-50 border"
//           }`}
//         >
//           Next
//         </button>
//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 rounded-md ${
//             currentPage === totalPages
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "bg-white text-blue-500 hover:bg-blue-50 border"
//           }`}
//         >
//           Last
//         </button>
//       </div>
//     </div>
//   )
// }



import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // Create page buttons
  for (let i = 1; i <= totalPages; i++) {
    // Show first page, last page, current page, and pages around current page
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (
      (i === currentPage - 2 && currentPage > 2) ||
      (i === currentPage + 2 && currentPage < totalPages - 1)
    ) {
      // Add ellipsis
      pages.push("...");
    }
  }

  // Remove duplicate ellipses
  const uniquePages = [];
  for (let i = 0; i < pages.length; i++) {
    if (pages[i] !== "..." || (pages[i] === "..." && pages[i - 1] !== "...")) {
      uniquePages.push(pages[i]);
    }
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-end mt-2">
      <ul className="flex space-x-1">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-2 py-2 rounded-full ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed "
                : "bg-secondary text-white hover:bg-gray-300 "
            }`}
          >
            <FaChevronLeft />
          </button>
        </li>

        {uniquePages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-2 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-white border border-primary "
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-2 py-2 rounded-full ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-gray-300"
            }`}
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

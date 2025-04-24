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

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // Create page buttons
  for (let i = 1; i <= totalPages; i++) {
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
    <>
      {/* Mobile Pagination */}
      <div className="flex items-center justify-between gap-10 md:hidden -ml-3 mt-4">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded flex items-center gap-1 ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-secondary hover:text-secondary-dark"
          }`}
        >
          <FaChevronLeft className="text-sm" />
          <span className="whitespace-nowrap">Previous Page</span>
        </button>
        <div className="text-sm text-gray-600 flex items-center">
          <span className="border border-primary bg-white px-2 py-1 rounded-md mx-1">
            {currentPage}
          </span>
          <span>/</span>
          <span className="ml-1">{totalPages}</span>
        </div>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded flex items-center gap-1 ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-secondary hover:text-secondary-dark"
          }`}
        >
          <span className="whitespace-nowrap">Next Page</span>
          <FaChevronRight className="text-sm" />
        </button>
      </div>

      {/* Desktop Pagination */}
      <nav className="hidden md:flex justify-between items-center mt-2 w-full">
        <div className="text-sm text-neutral-600 mb-8">
          Showing {(currentPage - 1) * 10 + 1} -{" "}
          {Math.min(currentPage * 10, totalPages * 10)} ({totalPages * 10})
        </div>

        <ul className="flex space-x-1">
          <li>
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-1 py-1 rounded-full  text-xs h-[26px] w-[26px] ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-gray-300"
              }`}
              aria-label="Previous Page"
            >
              <FaChevronLeft className="ml-1 " />
            </button>
          </li>

          {uniquePages.map((page, index) => (
            <li key={index}>
              {page === "..." ? (
                <span className="px-1 py-1 h-[2px] w-[32px]" >....</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-2 py-1 rounded-md text-xs h-[26px] w-[26px] ${
                    currentPage === page
                      ? "bg-white border border-primary"
                      : "bg-white text-gray-700 hover:bg-neutral-100"
                  }`}
                  disabled={currentPage === page}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

          <li>
            <button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-1 py-1 rounded-full text-xs h-[26px] w-[26px] ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-gray-300"
              }`}
            >
              <FaChevronRight className="ml-1"/>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;

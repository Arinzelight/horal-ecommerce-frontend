import React from "react";

const ProgressTracker = ({ progress, formatDate }) => {
  return (
    <div className="w-full">
      {/* Mobile View - Vertical */}
      <div className="md:hidden">
        {progress.map((step, index) => (
          <div key={index} className="relative flex">
            {/* Progress indicator column */}
            <div className="flex flex-col items-center mr-4">
              {/* Circle */}
              <div
                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                  step.completed
                    ? "bg-[#22C55E] border-[#22C55E]"
                    : step.current
                    ? "bg-white border-[#22C55E]"
                    : "bg-white border-gray-300"
                }`}
              />
              {/* Connecting line - no gap */}
              {index < progress.length - 1 && (
                <div
                  className={`w-0.5 flex-1 min-h-[3rem] ${
                    step.completed ? "bg-[#22C55E]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>

            {/* Stage info */}
            <div className="flex-1 pb-6">
              <div
                className={`font-medium ${
                  step.current ? "text-[#22C55E]" : "text-gray-900"
                }`}
              >
                {step.stage}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {step.date ? formatDate(step.date) : step.expectedDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Horizontal */}
      <div className="hidden md:flex items-start">
        {progress.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            {/* Progress indicator row */}
            <div className="flex items-center w-full">
              <div
                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                  step.completed
                    ? "bg-[#22C55E] border-[#22C55E]"
                    : step.current
                    ? "bg-neutral-100 border-[#22C55E"
                    : "bg-white border-gray-300"
                }`}
              />
              {/* Connecting line - no gap */}
              {index < progress.length - 1 && (
                <div
                  className={`h-0.5 w-48 flex-1 ${
                    step.completed ? "bg-[#22C55E]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>

            {/* Stage info */}
            <div className="text-center mt-3 px-2 mr-24">
              <div
                className={`font-medium text-sm ${
                  step.current ? "text-[#22C55E]" : "text-neutral-900"
                }`}
              >
                {step.stage}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {step.date ? formatDate(step.date) : step.expectedDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
import React from "react";

const PasswordChecklist = ({ password }) => {
  const criteria = [
    {
      text: "At least 8 characters long",
      test: (pw) => pw.length >= 8,
    },
    {
      text: "Includes at least one uppercase letter (A-Z)",
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      text: "Includes at least one lowercase letter (a-z)",
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      text: "Contains at least one number (0-9)",
      test: (pw) => /[0-9]/.test(pw),
    },
    {
      text: "Has at least one special character",
      test: (pw) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  const renderCheckbox = (active) => (
    <div className="w-6 h-6 relative">
      <div className="w-6 h-6 absolute top-0 left-0 overflow-hidden">
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-sm ${
            active ? "bg-green-500" : "bg-neutral-300"
          }`}
        >
          {active && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mt-2">
      <div className="w-72 flex flex-col gap-2">
        {criteria.slice(0, 3).map((item, index) => {
          const active = item.test(password);
          return (
            <div key={index} className="flex items-center gap-1">
              {renderCheckbox(active)}
              <span className="text-xs text-black font-normal font-nunito">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-72 flex flex-col gap-2">
        {criteria.slice(3).map((item, index) => {
          const active = item.test(password);
          return (
            <div key={index} className="flex items-center gap-1">
              {renderCheckbox(active)}
              <span className="text-xs text-black font-normal font-nunito">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordChecklist;

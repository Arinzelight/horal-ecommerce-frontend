import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { IoAlertCircleOutline } from "react-icons/io5";
const ToastItem = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getToastStyles = () => {
    const baseStyles =
      "relative flex items-start px-4 sm:py-5 py-4  shadow-lg border backdrop-blur-sm transition-all duration-300 ease-out transform";

    const typeStyles = {
      success: "bg-primary-50/95 border-primary-100 text-primary-900",
      error: "bg-red-50/95 border-red-200 text-red-900",
      warning: "bg-amber-50/95 border-amber-200 text-amber-900",
      info: "bg-blue-50/95 border-blue-200 text-blue-900",
    };

    const animationStyles = isRemoving
      ? "translate-x-full opacity-0 scale-95"
      : isVisible
      ? "translate-x-0 opacity-100 scale-100"
      : "translate-x-full opacity-0 scale-95";

    return `${baseStyles} ${typeStyles[toast.type]} ${animationStyles}`;
  };

  const getIcon = () => {
    const iconProps = { size: 20, className: "flex-shrink-0 mt-0.5" };

    switch (toast.type) {
      case "success":
        return (
          <FiCheckCircle
            {...iconProps}
            className={`${iconProps.className} text-primary-700`}
          />
        );
      case "error":
        return (
          <IoAlertCircleOutline
            {...iconProps}
            className={`${iconProps.className} text-red-600`}
          />
        );
      case "warning":
        return (
          <FiAlertTriangle
            {...iconProps}
            className={`${iconProps.className} text-amber-600`}
          />
        );
      case "info":
        return (
          <IoMdInformationCircleOutline
            {...iconProps}
            className={`${iconProps.className} text-blue-600`}
          />
        );
    }
  };

  const getProgressBarColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-primary-900";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-amber-500";
      case "info":
        return "bg-blue-500";
    }
  };

  return (
    <div className={getToastStyles()}>
      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-xl overflow-hidden">
          <div
            className={`h-full ${getProgressBarColor()} transition-all ease-linear`}
            style={{
              animation: `shrink ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* Icon */}
      <div className="mr-3">{getIcon()}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm leading-5 mb-1">
          {toast.title}
        </div>
        {toast.message && (
          <div className="text-sm opacity-90 leading-4">{toast.message}</div>
        )}
      </div>

      {/* Close button */}
      {toast.dismissible && (
        <button
          onClick={handleRemove}
          className="ml-3 p-1 rounded-full hover:bg-black/10 transition-colors duration-200 flex-shrink-0"
        >
          <FaTimes size={16} className="opacity-60 hover:opacity-100" />
        </button>
      )}

      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
};

export default ToastItem;

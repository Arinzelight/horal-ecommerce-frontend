import PropTypes from "prop-types";

const StatusBadge = ({ status, size = "md", className = "" }) => {
  // Define status styles with different sizes
  const statusStyles = {
    processing: {
      bg: "bg-yellow-100",
      text: "text-yellow-400",
    },
    "on the way": {
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
    completed: {
      bg: "bg-green-100",
      text: "text-green-800",
    },
    canceled: {
      bg: "bg-red-100",
      text: "text-red-800",
    },
    default: {
      bg: "bg-gray-100",
      text: "text-gray4800",
    },
  };

  // Define size classes
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  // Get the current status style or default
  const currentStatus =
    statusStyles[status.toLowerCase()] || statusStyles.default;

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${currentStatus.bg} ${currentStatus.text} ${sizeClasses[size]} ${className}`}
    >
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default StatusBadge;

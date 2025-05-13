import React from "react";
import {FaRegBell, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaExclamationCircle, FaEnvelope} from "react-icons/fa";
import { notificationTypes } from "../../data/notification";


const NotificationIcon = ({ type, className = "" }) => {
  const iconProps = {
    size: 13,
    className,
  };

  switch (type) {
    case notificationTypes.SUCCESS:
      return (
        <FaCheckCircle {...iconProps} className={`text-green-500 ${className}`} />
      );
    case notificationTypes.WARNING:
      return (
        <FaExclamationTriangle
          {...iconProps}
          className={`text-secondary ${className}`}
        />
      );
    case notificationTypes.INFO:
      return <FaRegBell {...iconProps} className={`text-primary ${className}`} />;
    case notificationTypes.MESSAGE:
      return (
        <FaEnvelope
          {...iconProps}
          className={`text-secondary ${className}`}
        />
      );
    case notificationTypes.ERROR:
      return (
        <FaExclamationCircle {...iconProps} className={`text-red-500 ${className}`} />
      );
    default:
      return <FaInfoCircle {...iconProps} className={`text-gray-500 ${className}`} />;
  }
};

export default NotificationIcon;

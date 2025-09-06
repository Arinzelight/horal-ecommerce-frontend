export const getConfirmationContent = (status, isReturn) => {
  if (isReturn) {
    switch (status) {
      case "approved":
        return {
          title: "Approve Return Request",
          message:
            "Are you sure you want to approve this return request? This action will process the return and may trigger refund procedures.",
          confirmText: "Approve Return",
          isDestructive: false,
        };
      case "rejected":
        return {
          title: "Reject Return Request",
          message:
            "Are you sure you want to reject this return request? The customer will be notified that their return has been denied.",
          confirmText: "Reject Return",
          isDestructive: true,
        };
      default:
        return null;
    }
  } else {
    switch (status) {
      case "resolved":
        return {
          title: "Mark as Resolved",
          message:
            "Are you sure you want to mark this support ticket as resolved? The customer will be notified.",
          confirmText: "Mark Resolved",
          isDestructive: false,
        };
      case "unresolved":
        return {
          title: "Mark as Unresolved",
          message:
            "Are you sure you want to mark this support ticket as unresolved?",
          confirmText: "Mark Unresolved",
          isDestructive: false,
        };
      default:
        return null;
    }
  }
};

export const needsConfirmation = (status, isReturn) => {
  if (isReturn) {
    return ["approved", "rejected"].includes(status);
  } else {
    return ["resolved", "unresolved"].includes(status);
  }
};

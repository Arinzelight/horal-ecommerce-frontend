export const notificationTypes = {
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
  ERROR: "error",
  MESSAGE: "message",
};

export const notifications = [
  {
    id: 1,
    type: notificationTypes.SUCCESS,
    title: "KYC verification",
    intro: "Your KYC registration has been verified successfully",
    message:
      "Congratulations! Your KYC verification process has been completed and approved. You can now access all features of your account.",
    isRead: false,
    timestamp: "10 mins ago",
  },
  {
    id: 2,
    type: notificationTypes.WARNING,
    title: "Complete your profile",
    intro: "You have not completed your profile",
    message:
      "Please complete your profile to ensure you have access to all features. Missing information includes: profile picture, phone number, and address.",
    isRead: false,
    timestamp: "2 days ago",
  },
  {
    id: 3,
    type: notificationTypes.INFO,
    title: "KYC verification",
    intro: "You have not done your KYC verification",
    message:
      "To ensure account security and compliance, please complete your KYC verification process. This is required for all users.",
    isRead: false,
    timestamp: "10 mins ago",
  },
  {
    id: 4,
    type: notificationTypes.MESSAGE,
    title: "New message from Adebisi Kehinde",
    intro: "Please Sir, you have not sent me the retail price for t...",
    message:
      "Please Sir, you have not sent me the retail price for the new products. I need this information to update our catalog. Could you please send it as soon as possible?",
    isRead: true,
    timestamp: "10 mins ago",
  },
  {
    id: 5,
    type: notificationTypes.ERROR,
    title: "Message sent failed",
    intro: "Your message sent to Ebose Stan failed, try resending.",
    message:
      "The message you attempted to send to Ebose Stan failed to deliver. This might be due to network issues. Please try sending the message again.",
    isRead: true,
    timestamp: "10 mins ago",
  },
];

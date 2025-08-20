import React from "react";
import { useToast } from "./ToastContext";

// Create a singleton toast instance
let toastInstance= null;

export const initializeToast = (toastContext) => {
  toastInstance = toastContext;
};

const createToastFunction =
  (type) =>
  (
    title,
    message,
    options
  ) => {
    if (!toastInstance) {
      console.warn(
        "Toast not initialized. Make sure ToastProvider is wrapped around your app."
      );
      return;
    }

    toastInstance.addToast({
      type,
      title,
      message,
      ...options,
    });
  };

export const toast = {
  success: createToastFunction("success"),
  error: createToastFunction("error"),
  warning: createToastFunction("warning"),
  info: createToastFunction("info"),

  // Custom function for more control
  custom: (
    title,
    options = {}
  ) => {
    if (!toastInstance) {
      console.warn(
        "Toast not initialized. Make sure ToastProvider is wrapped around your app."
      );
      return;
    }

    toastInstance.addToast({
      type: "info",
      title,
      ...options,
    });
  },

  // Utility functions
  dismiss: (id) => {
    if (toastInstance) {
      toastInstance.removeToast(id);
    }
  },

  clear: () => {
    if (toastInstance) {
      toastInstance.clearToasts();
    }
  },
};

// Hook for components that need direct access to toast context
export const useToastActions = () => {
  const context = useToast();

  React.useEffect(() => {
    initializeToast(context);
  }, [context]);

  return {
    success: (title, message, options) =>
      context.addToast({ type: "success", title, message, ...options }),
    error: (title, message, options) =>
      context.addToast({ type: "error", title, message, ...options }),
    warning: (title, message, options) =>
      context.addToast({ type: "warning", title, message, ...options }),
    info: (title, message, options) =>
      context.addToast({ type: "info", title, message, ...options }),
  };
};

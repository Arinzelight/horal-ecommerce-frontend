import React from "react";
import { createPortal } from "react-dom";
import { useToast } from "./ToastContext";
import ToastItem from "./ToastItem";

const Toaster = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div className="absolute top-4 left-4 right-4 flex flex-col items-end space-y-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="w-full max-w-md pointer-events-auto">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default Toaster;

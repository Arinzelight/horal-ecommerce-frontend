import React from "react";
import { FaTimes } from "react-icons/fa";

const FilterModal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex flex-col">
    {/* Black semi-transparent overlay */}
    <div className="fixed inset-0 bg-black/60 z-40" aria-hidden="true"></div>
    {/* Modal content, with higher z-index */}
    <div className="relative z-50 bg-white rounded-t-xl mt-auto max-h-[80vh] flex flex-col w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={onClose} className="p-2">
          <FaTimes />
        </button>
      </div>
      <div className="overflow-y-auto p-4 flex-1">{children}</div>
      <div className="p-4 border-t">
        <button
          onClick={onClose}
          className="w-full bg-secondary text-white py-3 rounded-md font-bold hover:bg-orange-600"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
);

export default FilterModal;

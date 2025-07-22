
import React from "react";
import { LOADING_MESSAGES } from "./constants";

const FormActions = ({
  selectedCategory,
  isEditMode,
  creating,
  updating,
  handleDiscard,
}) => {
  if (!selectedCategory) return null;

  return (
    <div className="mt-8 flex flex-col md:flex-row justify-between space-x-4 gap-4">
      <button
        type="button"
        onClick={handleDiscard}
        disabled={creating || updating}
        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isEditMode ? "Cancel" : "Discard"}
      </button>

      <button
        type="submit"
        disabled={creating || updating}
        className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {creating || updating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {isEditMode ? LOADING_MESSAGES.UPDATING : LOADING_MESSAGES.CREATING}
          </>
        ) : isEditMode ? (
          LOADING_MESSAGES.UPDATE_PRODUCT
        ) : (
          LOADING_MESSAGES.PUBLISH_PRODUCT
        )}
      </button>
    </div>
  );
};

export default FormActions;

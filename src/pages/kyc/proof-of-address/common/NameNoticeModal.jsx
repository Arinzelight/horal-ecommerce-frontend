import { IoWarningOutline } from "react-icons/io5";

export default function NameNoticeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <IoWarningOutline className="text-yellow-500 w-7 h-7 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Important Notice
            </h3>
            <p className="text-sm text-gray-700 mt-1">
              Please ensure that the
              <span className="font-semibold">last name</span> you provide here
              is the same as the one registered with your bank. This is required
              for smooth bank verification and to avoid delays in processing.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-primary cursor-pointer text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

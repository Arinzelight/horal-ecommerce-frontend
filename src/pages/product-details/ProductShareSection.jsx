import { FaFacebook, FaWhatsapp, FaInstagram, FaLink } from "react-icons/fa";


export default function ProductShareSection({
  onCopyLink,
}) {
  return (
    <div className="mt-1 md:mt-0 mb-4">
      <h3 className="text-sm font-medium text-gray-700 uppercase mb-3">
        Share this product
      </h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={onCopyLink}
          className="flex items-center text-sm text-secondary hover:text-gray-800"
        >
          Copy link
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="ml-2"
          >
            <path
              fill="currentColor"
              d="M11 17H7q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h4zm-3-4v-2h8v2zm5 4v-2h4q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z"
            />
          </svg>
        </button>
        <a href="#" className="text-primary-700 hover:text-primary-900">
          <FaFacebook size={18} />
        </a>
        <a href="#" className="text-green-600 hover:text-green-800">
          <FaWhatsapp size={18} />
        </a>
        <a href="#" className="text-pink-600 hover:text-pink-800">
          <FaInstagram size={18} />
        </a>
      </div>
    </div>
  );
}

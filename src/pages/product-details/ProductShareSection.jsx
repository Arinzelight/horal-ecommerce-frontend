import { FaFacebook, FaWhatsapp, FaInstagram, FaLink } from "react-icons/fa";


export default function ProductShareSection({
  onCopyLink,
}) {
  return (
    <div className="my-8">
      <h3 className="text-sm font-medium text-gray-700 uppercase mb-3">
        Share this product
      </h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={onCopyLink}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          Copy link
          <FaLink className="ml-2" />
        </button>
        <a href="#" className="text-blue-600 hover:text-blue-800">
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

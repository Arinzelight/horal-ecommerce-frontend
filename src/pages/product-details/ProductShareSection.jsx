import { FaFacebook, FaWhatsapp, FaInstagram, FaLink, FaTiktok,  } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "../../components/toast";
export default function ProductShareSection({
  onCopyLink,
}) {
  const handleInstagramShare = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
  };

  const handleTikTokShare = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
  };
  const shareUrl = window.location.href;
  return (
    <div className="mt-1 md:mt-0 mb-4">
      <h3 className="text-sm font-medium text-gray-700 uppercase mb-3">
        Share this product
      </h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={onCopyLink}
          aria-label="Copy link"
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

        <FacebookShareButton url={shareUrl} aria-label="Share on Facebook">
          <FaFacebook
            size={18}
            className="text-primary-700 hover:text-primary-900"
          />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} aria-label="Share on X (Twitter)">
          <FaXTwitter size={18} className="text-blue-600 hover:text-blue-800" />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          className="text-green-600 hover:text-green-800"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp
            size={18}
            className="text-green-600 hover:text-green-800"
          />
        </WhatsappShareButton>
        <button
          onClick={handleInstagramShare}
          className="text-pink-600 hover:text-pink-800"
          aria-label="Copy link for Instagram"
        >
          <FaInstagram size={18} />
        </button>

        <button
          onClick={handleTikTokShare}
          className="text-black hover:text-gray-700"
          aria-label="Copy link for TikTok"
        >
          <FaTiktok size={18} />
        </button>
      </div>
    </div>
  );
}

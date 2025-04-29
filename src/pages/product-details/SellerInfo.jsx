import { FaPlay } from "react-icons/fa"
import { SlBadge } from "react-icons/sl";

export default function SellerInfo({ seller, hasVideo }) {
  return (
    <div className="md:grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
      {/* Seller information */}
      <div className="py-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
            {seller?.avatar ? (
              <img src={seller.avatar || "/placeholder.svg"} alt={seller.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
                {seller?.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{seller?.name}</h3>
            {seller?.isVerified && (
              <div className="flex items-center text-xs text-white bg-primary-900 rounded-full px-2 py-1">
                <SlBadge className="text-white mr-1" />
                <span>Verified Seller</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="grid grid-cols-5 gap-4">
            <p className="text-gray-600 col-span-2">Country:</p>
            <p className="col-span-3">{seller?.country || "N/A"}</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <p className="text-gray-600 col-span-2">State:</p>
            <p className="col-span-3">{seller?.state || "N/A"}</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <p className="text-gray-600 col-span-2">LGA:</p>
            <p className="col-span-3">{seller?.lga || "N/A"}</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <p className="text-gray-600 col-span-2">Address:</p>
            <p className="col-span-3">{seller?.address || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Video section (if available) */}
      {hasVideo && (
        <div className="mt-4 mr-24 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-md hover:shadow-lg transition-shadow">
              <FaPlay className="text-blue-600 ml-1" />
            </div>
            <p className="text-sm text-gray-600">Watch Product Video</p>
          </div>
        </div>
      )}
    </div>
  )
}

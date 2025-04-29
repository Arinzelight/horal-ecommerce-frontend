import { FaCheck, FaPlay } from "react-icons/fa";

export default function SellerInfo({ seller, hasVideo }) {
  return (
    <div className="md:grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
      {/* Seller information */}
      <div className="py-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
            {seller?.avatar ? (
              <img
                src={seller.avatar || "/placeholder.svg"}
                alt={seller.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
                {seller?.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{seller?.name}</h3>
            {seller?.isVerified && (
              <div className="flex items-center text-xs text-white bg-primary-900 rounded-full px-2 py-1 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="mr-1"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12.438 1.248c4.27 0 7.75 3.48 7.75 7.75c0 2.48-1.18 4.69-3 6.11v5.4c0 1.03 0 1.78-.69 2.12c-.17.08-.33.12-.49.12c-.5 0-.99-.36-1.61-.83l-1.21-.91l-.091-.067c-.283-.211-.57-.424-.66-.433c-.09.01-.376.222-.659.433l-.09.067l-1.2.9l-.027.02c-.816.61-1.4 1.046-2.084.7c-.69-.34-.69-1.09-.69-2.12v-5.4c-1.82-1.42-3-3.63-3-6.11c0-4.27 3.48-7.75 7.75-7.75m0 1.5c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25s6.25-2.8 6.25-6.25s-2.8-6.25-6.25-6.25m3.25 17.77v-4.49a7.7 7.7 0 0 1-6.5 0v4.99l.147-.109q.122-.089.242-.181l1.21-.91c.64-.48 1.07-.8 1.65-.8s1.01.32 1.65.8l1.2.9c.14.1.28.2.4.29zm-6.29-9.09l.25-1.68h.04l-1.15-1.2c-.3-.31-.4-.75-.26-1.16c.13-.4.47-.69.88-.76l1.57-.26l.73-1.5c.19-.39.58-.63 1-.63s.81.24 1 .63l.73 1.5l1.57.26c.41.07.75.36.88.76c.13.41.03.85-.26 1.16l-1.15 1.2l.25 1.68c.06.44-.12.86-.47 1.11c-.34.24-.79.27-1.16.07l-1.41-.75l-1.41.75c-.16.09-.34.13-.52.13c-.22 0-.45-.06-.64-.2c-.36-.25-.53-.68-.47-1.11m2.57-4.23c-.16.33-.47.56-.82.62l-1.09.18l.8.84c.24.25.35.61.3.96l-.17 1.13l.93-.49c.16-.09.34-.13.52-.13s.36.04.52.13l.93.49l-.17-1.13c-.05-.35.06-.71.3-.96l.8-.84l-1.09-.18a1.13 1.13 0 0 1-.82-.62l-.47-.97z"
                  />
                </svg>
                <span className="whitespace-nowrap">Verified Seller</span>
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
        <div className="border mt-4 rounded-lg p-4 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-md hover:shadow-lg transition-shadow">
              <FaPlay className="text-blue-600 ml-1" />
            </div>
            <p className="text-sm text-gray-600">Watch Product Video</p>
          </div>
        </div>
      )}
    </div>
  );
}

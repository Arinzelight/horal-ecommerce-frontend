import { FaPlay, FaCommentAlt } from "react-icons/fa";

export default function SellerInfo({ seller, hasVideo }) {
  return (
    <div className="flex flex-col lg:flex-row gap-2 md:gap-0 mb-8 md:h-[282px]">
      {/* Seller information */}
      <div className="py-4">
        <div className="flex items-start gap-24 md:gap-12 mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
              {seller?.profile_image ? (
                <img
                  src={seller.profile_image || "/placeholder.svg"}
                  alt={seller.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-500 text-white text-xl font-bold">
                  {seller?.full_name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium whitespace-nowrap md:text-sm">
                {seller?.full_name}
              </h3>
              {seller?.kyc.is_verified && (
                <div className="flex items-center text-xs text-white bg-primary-900 rounded-full px-2 py-1 w-fit mt-1">
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

          {/* Desktop Chat Seller Button */}
          <button
            className="hidden md:flex md:text-xs md:mr-6 items-center bg-primary text-white px-4 py-2 rounded-md hover:opacity-85 transition-colors"
            aria-label="Chat with seller"
          >
            <span className="whitespace-nowrap">Chat Seller</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="grid grid-cols-5 gap-4">
            <p className="text-gray-600 col-span-2">Country:</p>
            <p className="col-span-3">{seller?.location?.country || "N/A"}</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <p className="text-gray-600 col-span-2">State:</p>
            <p className="col-span-3">{seller?.location?.state || "N/A"}</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <p className="text-gray-600 col-span-2">LGA:</p>
            <p className="col-span-3">
              {seller?.location?.local_govt || "N/A"}
            </p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <p className="text-gray-600 col-span-2">Address:</p>
            <p className="col-span-3">
              {seller?.location?.street_address || "N/A"}
            </p>
          </div>
        </div>

        {/* Mobile Chat Seller Button */}
        <button className="md:hidden w-full mt-4 flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-md hover:opacity-85 transition-colors">
          <span>Chat Seller</span>
        </button>
      </div>

      <div>
        {/* Video section (if available) */}
        {hasVideo && (
          <div className="mt-4  md:my-6 md:mb-24 lg:ml-8">
            <div className="relative  overflow-hidden rounded-lg bg-black md:h-[200px] lg:h-[180px] lg:w-[547px] group">
              {/* <div className="aspect-video bg-gray-200 flex items-center  lg:h-[201px] lg:w-[547px]">
                <button className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                    <FaPlay className="text-primary-600 ml-1" size={20} />
                  </div>
                </button>
                <span className="sr-only">Play product video</span>
              </div> */}

              {/* replace with actual data later */}
              <video className="w-full h-full object-cover" controls>
              <source src={hasVideo} type="video/mp4" />
            
            </video>
            </div>
            <p className="text-sm text-gray-600 text-center mt-2">
              Watch Product Video
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { FiEdit } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import formatDate from "../../../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
const MyProfile = ({ profileData = {} }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/sellers-dashboard/account-edit");
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between lg:items-start items-center w-full gap-6">
      {/* Left Profile Card */}
      <div className="flex sm:min-w-95 w-full flex-col items-center">
        <div className="w-full py-4 bg-white sm:mx-5 rounded-lg shadow-md flex flex-col items-center gap-2">
          <div
            className={`h-56 flex flex-col items-center gap-2 justify-center
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src={
                  profileData?.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full"
              />
              <div className="text-neutral-900 text-2xl font-bold">
                {profileData?.full_name}
              </div>
            </div>

            {/* Seller Verification Badge - only show if isSeller */}
            {profileData?.kyc_data?.is_verified ? (
              <div className="px-2 py-1 bg-green-100 rounded-full border border-neutral-100 flex items-center gap-1">
                <span className="text-green-500 text-xs font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 inline-block mr-1"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12.438 1.248c4.27 0 7.75 3.48 7.75 7.75c0 2.48-1.18 4.69-3 6.11v5.4c0 1.03 0 1.78-.69 2.12c-.17.08-.33.12-.49.12c-.5 0-.99-.36-1.61-.83l-1.21-.91l-.091-.067c-.283-.211-.57-.424-.66-.433c-.09.01-.376.222-.659.433l-.09.067l-1.2.9l-.027.02c-.816.61-1.4 1.046-2.084.7c-.69-.34-.69-1.09-.69-2.12v-5.4c-1.82-1.42-3-3.63-3-6.11c0-4.27 3.48-7.75 7.75-7.75m0 1.5c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25s6.25-2.8 6.25-6.25s-2.8-6.25-6.25-6.25m3.25 17.77v-4.49a7.7 7.7 0 0 1-6.5 0v4.99l.147-.109q.122-.089.242-.181l1.21-.91c.64-.48 1.07-.8 1.65-.8s1.01.32 1.65.8l1.2.9c.14.1.28.2.4.29zm-6.29-9.09l.25-1.68h.04l-1.15-1.2c-.3-.31-.4-.75-.26-1.16c.13-.4.47-.69.88-.76l1.57-.26l.73-1.5c.19-.39.58-.63 1-.63s.81.24 1 .63l.73 1.5l1.57.26c.41.07.75.36.88.76c.13.41.03.85-.26 1.16l-1.15 1.2l.25 1.68c.06.44-.12.86-.47 1.11c-.34.24-.79.27-1.16.07l-1.41-.75l-1.41.75c-.16.09-.34.13-.52.13c-.22 0-.45-.06-.64-.2c-.36-.25-.53-.68-.47-1.11m2.57-4.23c-.16.33-.47.56-.82.62l-1.09.18l.8.84c.24.25.35.61.3.96l-.17 1.13l.93-.49c.16-.09.34-.13.52-.13s.36.04.52.13l.93.49l-.17-1.13c-.05-.35.06-.71.3-.96l.8-.84l-1.09-.18a1.13 1.13 0 0 1-.82-.62l-.47-.97z"
                    />
                  </svg>
                  verified Seller
                </span>
              </div>
            ) : (
              <div className="px-2 py-1 bg-red-100 rounded-full border border-neutral-100 flex items-center gap-1">
                <span className="text-red-500 text-xs font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 inline-block mr-1"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12.438 1.248c4.27 0 7.75 3.48 7.75 7.75c0 2.48-1.18 4.69-3 6.11v5.4c0 1.03 0 1.78-.69 2.12c-.17.08-.33.12-.49.12c-.5 0-.99-.36-1.61-.83l-1.21-.91l-.091-.067c-.283-.211-.57-.424-.66-.433c-.09.01-.376.222-.659.433l-.09.067l-1.2.9l-.027.02c-.816.61-1.4 1.046-2.084.7c-.69-.34-.69-1.09-.69-2.12v-5.4c-1.82-1.42-3-3.63-3-6.11c0-4.27 3.48-7.75 7.75-7.75m0 1.5c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25s6.25-2.8 6.25-6.25s-2.8-6.25-6.25-6.25m3.25 17.77v-4.49a7.7 7.7 0 0 1-6.5 0v4.99l.147-.109q.122-.089.242-.181l1.21-.91c.64-.48 1.07-.8 1.65-.8s1.01.32 1.65.8l1.2.9c.14.1.28.2.4.29zm-6.29-9.09l.25-1.68h.04l-1.15-1.2c-.3-.31-.4-.75-.26-1.16c.13-.4.47-.69.88-.76l1.57-.26l.73-1.5c.19-.39.58-.63 1-.63s.81.24 1 .63l.73 1.5l1.57.26c.41.07.75.36.88.76c.13.41.03.85-.26 1.16l-1.15 1.2l.25 1.68c.06.44-.12.86-.47 1.11c-.34.24-.79.27-1.16.07l-1.41-.75l-1.41.75c-.16.09-.34.13-.52.13c-.22 0-.45-.06-.64-.2c-.36-.25-.53-.68-.47-1.11m2.57-4.23c-.16.33-.47.56-.82.62l-1.09.18l.8.84c.24.25.35.61.3.96l-.17 1.13l.93-.49c.16-.09.34-.13.52-.13s.36.04.52.13l.93.49l-.17-1.13c-.05-.35.06-.71.3-.96l.8-.84l-1.09-.18a1.13 1.13 0 0 1-.82-.62l-.47-.97z"
                    />
                  </svg>
                  Un-verified Seller
                </span>
              </div>
            )}
            <div className="text-center text-zinc-800 text-xs font-bold">
              {formatDate(profileData?.shop?.created_at || "NA")}
            </div>
          </div>

          {/* Upgrade Badge Button - only show if isSeller */}

          <button className="px-6 py-2 bg-primary cursor-pointer hover:opacity-90 rounded text-white text-xs font-bold flex items-center mt-4">
            <span className="px-2">Basic (Upgrade)</span>
            <FaCrown className="text-lg" />
          </button>
        </div>
      </div>

      {/* Right Profile Info */}
      <div className="w-full flex flex-col items-end gap-8">
        {/* Edit Button */}
        <button
          onClick={handleEditClick}
          className="hidden md:flex w-40 h-8 px-2 bg-secondary cursor-pointer hover:opacity-90 rounded flex justify-center items-center gap-2"
        >
          <span className="text-white text-xs font-bold">Edit Profile</span>
          <FiEdit className="text-white" />
        </button>

        {/* Account Details */}
        <div className="w-full bg-white rounded-lg shadow-md flex flex-col gap-12 overflow-hidden">
          <div className="w-full flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-md">
              <h2 className="text-lg rounded-tl rounded-tr h-12 py-2.5 px-4 bg-primary-50 font-bold text-neutral-900 mb-6">
                My Account Details
              </h2>
              <div>
                <div className="p-4 flex flex-col gap-6 font-bold sm:text-lg text-sm">
                  <div className="flex justify-between gap-1">
                    <span className="text-neutral-400">Email:</span>
                    <span className="text-neutral-600 truncate">
                      {profileData?.email || "NA"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Phone:</span>
                    <span className="text-neutral-600">
                      {profileData?.phone_number || "NA"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="w-full bg-white rounded-lg shadow-md flex flex-col gap-12 overflow-hidden">
          <div className="w-full flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-md">
              <h2 className="text-lg rounded-tl rounded-tr h-12 py-2.5 px-4 bg-primary-50 font-bold text-neutral-900 mb-6">
                Location
              </h2>
              <div className="">
                <div className="p-4 flex flex-col gap-6 sm:text-lg text-base">
                  <div className="flex justify-between sm:flex-row flex-col">
                    <span className="text-neutral-400 font-bold">
                      Street Address
                    </span>
                    <span className="text-neutral-600 font-bold">
                      {profileData?.kyc_data?.address?.street || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between sm:flex-row flex-col">
                    <span className="text-neutral-400 font-bold">
                      Local Government
                    </span>
                    <span className="text-neutral-600 font-bold">
                      {profileData?.kyc_data?.address?.lga || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between sm:flex-row flex-col">
                    <span className="text-neutral-400 font-bold">State</span>
                    <span className="text-neutral-600 font-bold">
                      {profileData?.kyc_data?.address?.state || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between sm:flex-row flex-col gap-2">
                    <span className="text-neutral-400 font-bold">Landmark</span>
                    <span className="text-neutral-600 font-bold truncate">
                      {profileData?.kyc_data?.address?.landmark ||
                        "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleEditClick}
          className="md:hidden w-40 h-8 px-2 bg-secondary cursor-pointer hover:opacity-90 rounded flex justify-center items-center gap-2"
        >
          <span className="text-white text-xs font-bold">Edit Profile</span>
          <FiEdit className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MyProfile;

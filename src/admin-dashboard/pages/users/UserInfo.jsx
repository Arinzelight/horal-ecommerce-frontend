import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiExternalLink, FiFileText } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { mockUsers } from "../../../data/mockUsers";
import DetailsHeader from "../../component/DetailsHeader";

const UserInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = mockUsers.find((u) => u.id === Number.parseInt(id));
    setUser(foundUser);
  }, [id]);

  if (!user) {
    return (
      <div className="max-w-full overflow-x-auto min-h-screen w-full flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            User not found
          </h2>
          <p className="text-gray-600 mb-4">
            The user you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/admin/users")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const handleApproveKYC = () => {
    setUser((prev) => ({
      ...prev,
      kycStatus: "Verified",
      kycDate: new Date().toLocaleDateString(),
    }));
    console.log("KYC approved for user:", user.name);
  };

  const handleRejectKYC = () => {
    setUser((prev) => ({ ...prev, kycStatus: "Rejected", kycDate: null }));
    console.log("KYC rejected for user:", user.name);
  };

  const getKYCStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-sm text-xs font-medium";
    switch (status?.toLowerCase()) {
      case "verified":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="lg:max-w-full sm:max-w-[95vw] max-w-[90vw] overflow-x-auto w-full flex flex-col gap-3 justify-start py-4 rounded-lg shadow-[...] overflow-hidden">
      {/* Header */}
      <DetailsHeader
        user={user}
        onBack={() => navigate(-1)}
        formatDate={(date) => new Date(date).toLocaleDateString()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* User Information */}
        <div className="bg-white rounded-[16px] shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200">
            USER'S INFORMATION
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 ">
              <span className="text-gray-600 text-[14px]">Email Address</span>
              <span className="text-gray-900 text-[14px]">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 ">
              <span className="text-gray-600 text-[14px]">Phone Number</span>
              <span className="text-gray-900 text-[14px]">{user.phone}</span>
            </div>
          </div>
        </div>

        {/* User Address*/}
        {user.role=== "seller" && (
          <div className="bg-white rounded-[16px] shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200">
            USER'S ADDRESS
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 ">
              <span className="text-gray-600 text-[14px]">ttreet Addres</span>
              <span className="text-gray-900 text-[14px]">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 ">
              <span className="text-gray-600 text-[14px]">Local Government</span>
              <span className="text-gray-900 text-[14px]">{user.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 text-[14px]">State</span>
              <span className="text-gray-900 text-[14px]">{user.role}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 text-[14px]">Landmark</span>
              <span className="text-gray-900 text-[14px]">
                {user.lastLogin}
              </span>
            </div>
          </div>
        </div>
        )}
        
        {/* Social Links */}
        {user.role === "seller" && (
          <div className="flex flex-col md:flex-row gap-6 justify-between w-full">
          {/* KYC Verification */}
          <div className="bg-white rounded-md shadow-sm p-6 w-1/2">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                KYC VERIFICATION
              </h2>
              <span className={getKYCStatusBadge(user.kycStatus)}>
                {user.kycStatus}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 ">
                <span className="text-gray-600">Verification Date</span>
                <span className="text-gray-900">
                  {user.kycDate || "Not verified"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Documents Uploaded</span>
                <span className="text-gray-900">{user.documentsUploaded}</span>
              </div>

              {/* Document previews */}
              <div className="flex gap-3 mt-4">
                {Array.from({ length: user.documentsUploaded }, (_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-3 border border-gray-200 rounded-lg"
                  >
                    <FiFileText className="h-8 w-8  mb-2" />
                    <span className="text-xs text-gray-600">Filename.pdf</span>
                    <span className="text-xs text-gray-500">2mb</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 w-1/2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200">
              SOCIAL LINKS
            </h2>
            <div className="space-y-3">
              {user.socialLinks?.facebook && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <FaFacebook className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-900">Facebook</span>
                  </div>
                  <a
                    href={user.socialLinks?.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
              {user.socialLinks?.instagram && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <FaInstagram className="h-5 w-5 text-pink-600 mr-3" />
                    <span className="text-gray-900">Instagram</span>
                  </div>
                  <a
                    href={user.socialLinks?.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
              {user.socialLinks?.tiktok && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <FaTiktok className="h-5 w-5 text-black mr-3" />
                    <span className="text-gray-900">Tiktok</span>
                  </div>
                  <a
                    href={user.socialLinks?.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>)}
        
      </div>

  {/* KYC Actions */}
  {user && user.role === "seller" && user.kycStatus !== "Verified" && (
    <div className="flex gap-3 justify-end">
      <button
        onClick={handleRejectKYC}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
      >
        Reject KYC
      </button>
      <button
        onClick={handleApproveKYC}
        className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Approve KYC
      </button>
    </div>
  )}
    </div>
  );
}
export default UserInfoPage;

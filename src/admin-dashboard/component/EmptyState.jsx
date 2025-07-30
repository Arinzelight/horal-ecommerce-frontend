
import {FaSearch, FaUser, FaStore} from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
const EmptyState = ({ type }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case "sellers":
        return {
          icon: <FaStore className="w-16 h-16 text-gray-300" />,
          title: "No Sellers Found",
          message: "There are currently no sellers registered on the platform.",
          
        };
      case "admins":
        return {
          icon: <FaShield className="w-16 h-16 text-gray-300" />,
          title: "No Admins Found",
          message: "There are currently no admin users in the system.",
         
        };
      case "search":
        return {
          icon: <FaSearch className="w-16 h-16 text-gray-300" />,
          title: "No Results Found",
          message: "Try adjusting your search terms or check for typos.",
         
        };
      default:
        return {
          icon: <FaUser className="w-16 h-16 text-gray-300" />,
          title: "No Users Found",
          message: "There are currently no users registered on the platform.",
          actionLabel: "Add User",
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center">
        <div className="flex justify-center">{content.icon}</div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {content.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 max-w-sm">{content.message}</p>
        
      </div>
    </div>
  );
};
export default EmptyState;
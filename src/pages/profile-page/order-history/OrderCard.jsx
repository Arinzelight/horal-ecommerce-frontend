import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../../utils/formatDate";

const OrderCard = ({ order, activeTab }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/profile-page/order/${order.id}`);
  };

  // Helper function to determine order status
  const getOrderStatus = () => {
    switch (activeTab) {
      case "delivered":
        return { text: "Delivered", className: "text-green-600 bg-green-50" };
      case "pending":
        return { text: "Pending", className: "text-yellow-600 bg-yellow-50" };
      case "paid":
        return { text: "Paid", className: "text-blue-600 bg-blue-50" };
      case "cancelled":
        return { text: "Cancelled", className: "text-red-600 bg-red-50" };
      default:
        return { text: "Processing", className: "text-blue-600 bg-blue-50" };
    }
  };
//get the status from backend

  const status = order.status ? getOrderStatus() : { text: "Processing", className: "text-blue-600 bg-blue-50" };

  return (
    <div className="rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex items-start space-x-4">
        <Link
          to={`/product/${order.productSlug}`}
          className="flex-shrink-0 group"
          aria-label={`View ${order.productName} product details`}
        >
          <div className="relative overflow-hidden rounded-md">
            <img
              src={
                order.productImage || "/placeholder.svg?height=126&width=130"
              }
              alt={order.productName}
              className="w-[130px] h-[126px] object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header section */}
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-900">
                Order ID:
                <span className="text-primary ml-1">
                  #HOR{String(order.id).slice(0, 4)}
                </span>
              </h3>
              <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
              {/* Status badge */}
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${status.className}`}
              >
                {order.status}
              </span>
            </div>

            {/* Desktop actions/info */}
            <div className="hidden md:block">
              <div className="flex flex-col items-end space-y-2">
                {/* {activeTab === "delivered" && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Delivered on</p>
                    <p className="text-sm font-medium text-secondary">
                      {formatDate(order.dateDelivered || order.date)}
                    </p>
                  </div>
                )} */}
                <button
                  onClick={handleViewDetails}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                  aria-label={`View details for order ${order.id}`}
                >
                  View Details
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mb-3">
            <Link
              to={`/product/${order.productSlug}`}
              className="text-sm font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2"
            >
              {order.productName}
            </Link>
            {order.quantity && (
              <p className="text-xs text-gray-500 mt-1">
                Quantity: {order.quantity}
              </p>
            )}
          </div>

          {/* Price and mobile actions */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-gray-900">
                Total: ₦{order?.price?.toLocaleString()}
              </p>
            </div>

            {/* Mobile actions/info */}
            <div className="md:hidden">
              <div className="flex flex-col items-end space-y-2">
                {/* {activeTab === "delivered" && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Delivered</p>
                    <p className="text-sm font-medium text-secondary">
                      {formatDate(order.dateDelivered || order.date)}
                    </p>
                  </div>
                )} */}
                <button
                  onClick={handleViewDetails}
                  className="text-sm font-medium text-primary hover:text-blue-800 flex items-center gap-1"
                  aria-label={`View details for order ${order.id}`}
                >
                  Details
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

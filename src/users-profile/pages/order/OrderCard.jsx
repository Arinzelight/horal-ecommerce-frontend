import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, activeTab }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "ongoing":
      case "processing":
        return "text-blue-600 bg-blue-50";
      case "delivered":
        return "text-green-600 bg-green-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleViewDetails = () => {
    navigate(`/profile/orders/${order.orderId}`);
  };

  return (
    <div className="bg-white rounded-sm shadow-xs border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={order.productImage || "/placeholder.svg?height=60&width=60"}
            alt={order.productName}
            className="w-[150px] h-[146px] object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 mt-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-900">
                Order #{order.orderId}
              </h3>
              <p className="text-sm text-gray-600">Order Date: {order.date}</p>
            </div>
            {activeTab === "delivered" ? (
              <div className="hidden md:block text-sm text-secondary">
                Delivered on: {order.dateDelivered || order.date}
              </div>
            ) : (
              <button
                onClick={handleViewDetails}
                className="hidden md:flex items-center gap-1 text-primary hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </button>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-gray-900">
                ₦ {order.price.toLocaleString()}
              </p>
              {activeTab === "delivered" ? (
                <div className="md:hidden text-sm text-secondary mt-3">
                  Delivered on: {order.dateDelivered || order.date}
                </div>
              ) : (
                <button
                  onClick={handleViewDetails}
                  className="md:hidden mt-3 flex items-center gap-1 text-primary hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

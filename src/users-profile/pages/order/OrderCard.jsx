import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../../utils/formatDate";
const OrderCard = ({ order, activeTab }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/profile-page/order/${order.id}`);
  };

 

  return (
    <div className=" rounded-sm    border border-gray-200 p-2 hover:shadow transition-shadow">
      <div className="flex items-start space-x-4">
        <Link to={`/product/${order.productSlug}`}>
        <div className="flex-shrink-0">
          <img
            src={order.productImage || "/placeholder.svg?height=60&width=60"}
            alt={order.productName}
            className="w-[130px] h-[126px] object-cover"
          />
        </div>
        </Link>

        <div className="flex-1 min-w-0 mt-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                OrderId:{" "}
                <span className="text-primary text-sm">#{order.id}</span>
              </h3>
              <p className="text-sm text-gray-600">
                Order Date: {formatDate(order.date)}
              </p>
            </div>
            {activeTab === "delivered" ? (
              <div className="hidden md:block text-sm text-secondary">
                Delivered on: {formatDate(order.dateDelivered || order.date)}
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
              <p className="text-sm font-bold text-gray-900">
                ₦ {order?.price?.toLocaleString()}
              </p>
              {activeTab === "delivered" ? (
                <div className="md:hidden text-sm text-secondary mt-3">
                  Delivered on: {order?.dateDelivered || order?.date}
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

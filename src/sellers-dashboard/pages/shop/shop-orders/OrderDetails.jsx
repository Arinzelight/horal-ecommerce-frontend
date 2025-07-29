import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockOrders } from "../../../../data/mockOrder";
import {FaArrowLeft} from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import Loader from "../../../../components/Loader"
import useSeller from "../../../../hooks/useSeller";
import { getOrderDetails } from "../../../../redux/order/orderSlice";
import { useDispatch } from "react-redux";

export default function OrderDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { orders, loadingOrders } = useSeller();
  useEffect(() => {
      if (params?.id) {
        dispatch(getOrderDetails(params.id));
      }
    }, [params?.id, dispatch]);

 

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="p-6 bg-white rounded-lg shadow"><Loader /></div>;
  }

  if (!order) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">Order not found</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
      >
        <FaArrowLeft className="h-4 w-4 mr-2" />
        Back to Orders
      </button>

      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-2">Order Details</h1>
        <p className="text-gray-500">Order ID: {order.orderId}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Product Information</h2>
          <div className="flex items-start">
            <img
              src={order.productImage || "/placeholder.svg?height=80&width=80"}
              alt={order.productName}
              className="w-20 h-20 object-cover mr-4"
            />
            <div>
              <h3 className="font-medium">{order.productName}</h3>
              <p className="text-gray-500 mt-1">
                Price: ₦{order.price.toLocaleString()}
              </p>
              <div className="mt-2">
                <StatusBadge status={order.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Buyer Information</h2>
          <div className="flex items-start">
            <img
              src={order.buyerAvatar || "/placeholder.svg?height=60&width=60"}
              alt={order.buyerName}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-medium">{order.buyerName}</h3>
              <p className="text-gray-500 mt-1">
                Email: {order.buyerEmail || "buyer@example.com"}
              </p>
              <p className="text-gray-500">
                Phone: {order.buyerPhone || "+234 123 456 7890"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 mb-8">
        <h2 className="text-lg font-medium mb-4">Order Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">Order Placed</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
          </div>

          {order.status !== "Pending" && (
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
                  <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Processing</p>
                <p className="text-sm text-gray-500">
                  Order is being processed
                </p>
              </div>
            </div>
          )}

          {(order.status === "In Transit" || order.status === "Delivered") && (
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a4 4 0 00-4-4h-3V4a1 1 0 00-1-1H3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">In Transit</p>
                <p className="text-sm text-gray-500">Order is on the way</p>
              </div>
            </div>
          )}

          {order.status === "Delivered" && (
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Delivered</p>
                <p className="text-sm text-gray-500">
                  Order has been delivered
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        {order.status === "Pending" && (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Process Order
          </button>
        )}
        {order.status === "Processing" && (
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors">
            Mark as Shipped
          </button>
        )}
        {order.status === "In Transit" && (
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Mark as Delivered
          </button>
        )}
        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          Contact Buyer
        </button>
      </div>
    </div>
  );
}

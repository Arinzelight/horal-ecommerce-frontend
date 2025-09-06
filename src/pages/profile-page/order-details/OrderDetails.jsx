import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderHeader from "./OrderHeader";
import OrderInfoCard from "./OrderInfoCard";
import ProductsSection from "./ProductSection";
import InitialLoader from "../../../components/InitialLoader";
import OrderStepper from "../../../pages/order-details/OrderStepper";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../../redux/order/orderSlice";
import OrderStatusCard from "../../../pages/order-details/OrderStatusCard";
import formatDate from "../../../utils/formatDate";

export default function UserOrderDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (params?.orderId) {
      dispatch(getOrderDetails(params.orderId));
    }
  }, [params?.orderId, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <InitialLoader />;
  if (error) return <NotFound onBack={handleBack} />;
  if (!currentOrder) return <NotFound onBack={handleBack} />;
  if (!currentOrder.items || currentOrder.items.length === 0)
    return <NoItems onBack={handleBack} />;

  const transformedOrder = {
    id: currentOrder.id,
    orderId: currentOrder.id,
    date: formatDate(currentOrder.created_at),
    status: currentOrder.status,
    total_amount: currentOrder.total_amount,
    created_at: currentOrder.created_at,
    user_email: currentOrder.user_email,
    items: currentOrder.items,
    shipping_address: currentOrder.shipping_address,
    orderInfo: {
      shipping: "Standard Delivery",
      paymentMethod: "Horal Escrow (Debit card)",
    },
    deliveryInfo: {
      address: `${currentOrder.shipping_address?.street_address}, ${currentOrder.shipping_address?.local_govt}, ${currentOrder.shipping_address?.state}, ${currentOrder.shipping_address?.country}`,
      deliveryMethod: "Horal Logistics",
      pickupLocation: currentOrder.shipping_address?.landmark || "N/A",
    },
  };

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg border-[1.5px] border-gray-200 overflow-hidden">
      <OrderHeader
        order={currentOrder}
        onBack={handleBack}
        formatDate={formatDate}
      />
      <OrderStatusCard />

      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OrderInfoCard
            title="ORDER INFO"
            items={[
              { label: "Shipping", value: transformedOrder.orderInfo.shipping },
              {
                label: "Payment Method",
                value: transformedOrder.orderInfo.paymentMethod,
              },
              {
                label: "Status",
                value:
                  transformedOrder.status.charAt(0).toUpperCase() +
                  transformedOrder.status.slice(1),
              },
              {
                label: "Total Amount",
                value: `₦${parseFloat(
                  transformedOrder.total_amount
                ).toLocaleString()}`,
              },
            ]}
          />

          <OrderInfoCard
            title="DELIVERY INFO"
            items={[
              {
                label: "Address",
                value: transformedOrder.deliveryInfo.address,
              },
              {
                label: "Delivery Method",
                value: transformedOrder.deliveryInfo.deliveryMethod,
              },
              {
                label: "Pickup Location",
                value: transformedOrder.deliveryInfo.pickupLocation,
              },
            ]}
          />
        </div>
      </div>

      <ProductsSection order={transformedOrder} />
    </div>
  );
}

// Additional small components for error states
const NotFound = ({ onBack }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <div className="text-center py-10">
      <p className="text-gray-500 text-lg mb-4">Order not found</p>
      <button
        onClick={onBack}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Back to Orders
      </button>
    </div>
  </div>
);

const NoItems = ({ onBack }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <div className="text-center py-10">
      <p className="text-gray-500 text-lg mb-4">No items in this order</p>
      <button
        onClick={onBack}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Back to Orders
      </button>
    </div>
  </div>
);

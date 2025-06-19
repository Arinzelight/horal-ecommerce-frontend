import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orders } from "../../../data/mockUserOrder";
import OrderHeader from "./OrderHeader";
import OrderInfoCard from "./OrderInfoCard";
import ProductsSection from "./ProductSection";
import ProgressTracker from "./Progress";
import Loader from "../../../components/Loader";

export default function UserOrderDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      const foundOrder = orders.find((o) => o.orderId === params.id);
      setOrder(foundOrder || null);
      setLoading(false);
    }
  }, [params]);

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <Loader />;
  if (!order) return <NotFound onBack={handleBack} />;
  if (!order.items || order.items.length === 0)
    return <NoItems onBack={handleBack} />;

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-sm overflow-hidden">
      <OrderHeader order={order} onBack={handleBack} formatDate={formatDate} />

      <ProgressTracker progress={order.progress} formatDate={formatDate} />

      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OrderInfoCard
            title="ORDER INFO"
            items={[
              { label: "Shipping", value: order.orderInfo.shipping },
              { label: "Payment Method", value: order.orderInfo.paymentMethod },
            ]}
          />

          <OrderInfoCard
            title="DELIVERY INFO"
            items={[
              { label: "Address", value: order.deliveryInfo.address },
              {
                label: "Delivery Method",
                value: order.deliveryInfo.deliveryMethod,
              },
              {
                label: "Pickup Location",
                value: order.deliveryInfo.pickupLocation,
              },
            ]}
          />
        </div>
      </div>

      <ProductsSection order={order}  />
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

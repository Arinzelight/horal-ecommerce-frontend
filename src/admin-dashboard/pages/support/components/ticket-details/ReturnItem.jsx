import { FaBox, FaTag, FaDollarSign } from "react-icons/fa";
import formatDate from "../../../../../utils/formatDate";

const ReturnItemDetails = ({ ticketDetails }) => {
  const { ticket_data } = ticketDetails;
  const orderItem = ticket_data?.order_item;
  const product = orderItem?.product;
  const variant = orderItem?.variant_detail;

  if (!orderItem) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaBox className="w-5 h-5 text-blue-600" />
          Return Item Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image and Basic Info */}
          <div className="space-y-4">
            {product?.image && (
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {product?.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <FaTag className="w-3 h-3 text-gray-400" />
                <span className="text-sm text-gray-600 capitalize">
                  {product?.category} • {product?.subcategory}
                </span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Quantity</label>
                <p className="font-medium">{orderItem.quantity}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Unit Price</label>
                <p className="font-medium flex items-center gap-1">
                  <FaDollarSign className="w-3 h-3" />
                  {orderItem.unit_price}
                </p>
              </div>
            </div>

            {variant && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  Product Variant
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {variant.color && (
                    <div>
                      <span className="text-gray-500">Color:</span>
                      <span className="ml-2 font-medium capitalize">
                        {variant.color}
                      </span>
                    </div>
                  )}
                  {variant.custom_size && (
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="ml-2 font-medium">
                        {variant.custom_size}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Delivered:</span>
                  <span className="ml-2 font-medium">
                    {formatDate(orderItem.delivered_at)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Total Price:</span>
                  <span className="ml-2 font-medium flex items-center gap-1">
                    <FaDollarSign className="w-3 h-3" />
                    {orderItem.total_price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return Reason */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium text-gray-800 mb-2">Return Reason</h4>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-700">{ticket_data.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnItemDetails;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnItemModal from "./ReturnModal";
import { FiRotateCcw } from "react-icons/fi";
import { CiCircleCheck, CiClock2 } from "react-icons/ci";
import useSupport from "../../../hooks/useSupport";
import { toast } from "../../../components/toast";

const ProductTable = ({ items, orderId }) => {
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [returningItems, setReturningItems] = useState(new Set());

  const navigate = useNavigate();
  const { cancelOrder } = useSupport();

  const formatPrice = (price) => {
    return parseFloat(price || 0).toLocaleString();
  };

  const handleRowClick = (item) => {
    navigate(`/product/${item.product?.slug}`);
  };

  const handleReturnClick = (e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setShowReturnModal(true);
  };

  const handleReturnSubmit = async (orderItemId, reason, attachments) => {
    setReturningItems((prev) => new Set([...prev, orderItemId]));

    try {
      await cancelOrder(orderItemId, reason, attachments);
      toast.success("Return request submitted successfully!");
      setShowReturnModal(false);
      setSelectedItem(null);

      // refresh the page 
      window.location.reload();
    } catch (error) {
      console.error("Error submitting return request:", error);
      toast.error("Failed to submit return request. Please try again.");
    } finally {
      setReturningItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderItemId);
        return newSet;
      });
    }
  };

  const getReturnStatus = (item) => {
    if (item.is_returned) {
      return {
        status: "returned",
        label: "Returned",
        icon: CiCircleCheck,
        color: "text-green-600",
      };
    }
    if (item.is_return_requested) {
      return {
        status: "requested",
        label: "Return Requested",
        icon: CiClock2,
        color: "text-orange-600",
      };
    }
    return null;
  };

  const isWithinReturnWindow = (deliveredAt) => {
    if (!deliveredAt) return false;

    const deliveryDate = new Date(deliveredAt);
    const currentDate = new Date();
    const timeDifference = currentDate - deliveryDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference <= 3;
  };

  const canReturn = (item) => {
    return (
      item.delivered_at &&
      !item.is_returned &&
      !item.is_return_requested &&
      isWithinReturnWindow(item.delivered_at)
    );
  };

  const getReturnWindowStatus = (item) => {
    if (!item.delivered_at) {
      return "Not delivered";
    }
    if (item.is_returned) {
      return "Returned";
    }
    if (item.is_return_requested) {
      return "Return pending";
    }
    if (!isWithinReturnWindow(item.delivered_at)) {
      return "Non-returnable";
    }
    return "N/A";
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide py-3">
                  Items
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide py-3">
                  Price (per unit)
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide py-3">
                  Quantity
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wide py-3">
                  Amount
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wide py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-neutral-800 text-[14px]">
              {items?.map((item, index) => {
                const returnStatus = getReturnStatus(item);
                const isReturning = returningItems.has(item.id);

                return (
                  <tr
                    key={item.id || index}
                    className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4" onClick={() => handleRowClick(item)}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                          {item.product?.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product?.title || "Product"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">📦</span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-gray-900">
                            {item.product?.title || "Unknown Product"}
                          </span>
                          {item.variant_detail && (
                            <div className="text-xs text-gray-500 mt-1">
                              {item.variant_detail.color && (
                                <span>Color: {item.variant_detail.color}</span>
                              )}
                              {(item.variant_detail.custom_size || item.variant_detail.size || item.variant_detail.standard_size) && (
                                <span className="ml-2">
                                  Size: {item.variant_detail.custom_size || item.variant_detail.size || item.variant_detail.standard_size} {item?.variant_detail?.custom_size_unit}
                                </span>
                              )}
                            </div>
                          )}
                          {/* Return Status */}
                          {returnStatus && (
                            <div className="flex items-center gap-1 mt-1">
                              <returnStatus.icon
                                className={`w-3 h-3 ${returnStatus.color}`}
                              />
                              <span className={`text-xs ${returnStatus.color}`}>
                                {returnStatus.label}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td
                      className="py-4 text-[14px] text-neutral-800"
                      onClick={() => handleRowClick(item)}
                    >
                      #{orderId?.slice(0, 8)}
                    </td>
                    <td
                      className="py-4 text-sm text-gray-900"
                      onClick={() => handleRowClick(item)}
                    >
                      ₦{formatPrice(item.unit_price)}
                    </td>
                    <td
                      className="py-4 text-sm text-gray-900"
                      onClick={() => handleRowClick(item)}
                    >
                      {item.quantity}
                    </td>
                    <td
                      className="py-4 text-sm text-gray-900 text-right"
                      onClick={() => handleRowClick(item)}
                    >
                      ₦{formatPrice(item.total_price)}
                    </td>
                    <td className="py-4 text-center">
                      {canReturn(item) ? (
                        <button
                          onClick={(e) => handleReturnClick(e, item)}
                          disabled={isReturning}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isReturning ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <FiRotateCcw className="w-3 h-3" />
                              Return Item
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">
                          {getReturnWindowStatus(item)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Return Item Modal */}
      <ReturnItemModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        item={selectedItem}
        onSubmit={handleReturnSubmit}
        isSubmitting={returningItems.has(selectedItem?.id)}
      />
    </>
  );
};

export default ProductTable;

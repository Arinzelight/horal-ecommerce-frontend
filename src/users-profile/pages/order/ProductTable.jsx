import { useNavigate } from "react-router-dom";

const ProductTable = ({ items, orderId }) => {
  const formatPrice = (price) => {
    return parseFloat(price || 0).toLocaleString();
  };
  const navigate = useNavigate();

  const handleRowClick = (item) => {
    // Navigate to the product details page
    navigate(`/product/${item.product?.slug}`);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
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
            </tr>
          </thead>
          <tbody className="text-neutral-800 text-[14px]">
            {items?.map((item, index) => (
              <tr
                onClick={() => handleRowClick(item)}
                key={item.id || index} className="cursor-pointer border-b border-gray-100">
                <td className="py-4">
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
                          {item.variant_detail.custom_size && (
                            <span className="ml-2">
                              Size: {item.variant_detail.custom_size}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-[14px] text-neutral-800">
                  #{orderId?.slice(0, 8)}
                </td>
                <td className="py-4 text-sm text-gray-900">
                  ₦{formatPrice(item.unit_price)}
                </td>
                <td className="py-4 text-sm text-gray-900">{item.quantity}</td>
                <td className="py-4 text-sm text-gray-900 text-right">
                  ₦{formatPrice(item.total_price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

const ProductTable = ({ items }) => {
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
            {items.map((item, index) => (
              <tr key={index}>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">📦</span>
                    </div>
                    <span className="text-[14px] font-medium text-gray-900">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-[14px] text-neutral-800">
                  {item.productId}
                </td>
                <td className="py-4 text-sm text-gray-900">
                  ₦{item.price.toLocaleString()}
                </td>
                <td className="py-4 text-sm text-gray-900">{item.quantity}</td>
                <td className="py-4 text-sm text-gray-900 text-right">
                  ₦{((item.price * item.quantity).toLocaleString())}
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
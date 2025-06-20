const OrderInfoCard = ({ title, items }) => {
  return (
    <div className="rounded-2xl p-4 shadow-sm border-[1px] border-neutral-200 bg-white">
      <h3 className="text-sm pb-1 border-b border-neutral-700 font-semibold text-gray-900 mb-4 uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm text-gray-900 text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderInfoCard;
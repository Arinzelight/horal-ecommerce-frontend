import ProductTable from './ProductTable';
import OrderSummary from './OrderSummary';

const ProductsSection = ({ order }) => {
  return (
    <div className="mt-6 rounded-2xl px-6 py-6 shadow-sm border-[1px] border-neutral-200 bg-white">
      <h3 className="text-sm pb-1 border-b border-neutral-700 font-semibold text-gray-900 mb-4 uppercase tracking-wide">
        PRODUCT
      </h3>

      <ProductTable items={order.items} orderId={order.id} />
      <OrderSummary order={order} />
    </div>
  );
};
export default ProductsSection;


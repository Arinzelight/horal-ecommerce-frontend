import React, { useMemo } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { format } from "date-fns";
import useSellerAnalytics from "../../hooks/useSellerAnalytics";

const ProductTable = () => {
  const { analytics, loading, error } = useSellerAnalytics();

  const products = useMemo(() => {
    if (!analytics?.top_selling_products) return [];

    return analytics.top_selling_products.map((product, index) => ({
      id: index,
      name: product.title,
      image: product.product_image,
      orderId: `#${product.product_index_id.slice(0, 8).toUpperCase()}`,
      price: product.price,
      unitsSold: product.total_quantity_sold,
      publishedDate: format(new Date(product.latest_order_date), "MM-dd-yyyy"),
    }));
  }, [analytics]);

  if (loading) {
    return (
      <div className="w-full px-4 py-6 bg-white rounded-2xl border border-neutral-200 flex items-center justify-center">
        <p className="text-sm text-neutral-600">
          Loading top selling products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-6 bg-white rounded-2xl border border-neutral-200 flex items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 py-2 bg-white rounded-2xl border border-neutral-200 flex flex-col gap-4">
      {/* Table Header */}
      <div className="py-2.5 border-b border-neutral-400 flex justify-between items-center">
        <h2 className="text-neutral-900 text-xs font-medium">
          MY TOP SELLING PRODUCTS
        </h2>
        <button className="text-sky-500 text-xs font-bold">View all</button>
      </div>

      {/* Scrollable Table Container */}
      <div className="h-96 overflow-x-auto scrollbar-hide overflow-y-auto w-full">
        <div className="min-w-[800px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="w-56 px-4 py-3.5 text-left">
                  <div className="text-neutral-700 text-xs font-normal">
                    Items
                  </div>
                </th>
                <th className="w-40 px-4 py-3.5 text-left">
                  <div className="text-neutral-700 text-xs font-normal">
                    Order ID
                  </div>
                </th>
                <th className="w-28 px-4 py-3.5 text-left">
                  <div className="text-neutral-700 text-xs font-normal">
                    Price (per unit)
                  </div>
                </th>
                <th className="px-4 py-3.5 text-left">
                  <div className="text-neutral-700 text-xs font-normal">
                    Units Sold
                  </div>
                </th>
                <th className="w-44 px-4 py-3.5 text-left">
                  <div className="text-neutral-700 text-xs font-normal">
                    Published Date
                  </div>
                </th>
                <th className="px-4 py-3.5 text-left">
                  <div className="text-neutral-700 text-xs font-normal">
                    Option
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-neutral-200">
                  <td className="w-56 py-0">
                    <div className="flex items-center">
                      <div className="p-1.5">
                        <img
                          className="w-10 h-10 rounded-sm"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="px-4 py-3.5">
                        <div className="text-neutral-800 text-sm font-bold">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="w-40 px-4 py-3.5">
                    <div className="text-neutral-800 text-sm font-normal">
                      {product.orderId}
                    </div>
                  </td>

                  <td className="w-28 px-4 py-3.5">
                    <div className="text-neutral-800 text-sm font-bold">
                      ₦{product.price.toLocaleString()}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="text-neutral-800 text-sm font-bold">
                      {product.unitsSold}
                    </div>
                  </td>

                  <td className="w-44 px-4 py-3.5">
                    <div className="text-neutral-800 text-sm font-normal">
                      {product.publishedDate}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <button className="p-2 bg-neutral-100 rounded border border-neutral-300">
                      <HiOutlineDotsVertical />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-sm text-neutral-500"
                  >
                    No top selling products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;

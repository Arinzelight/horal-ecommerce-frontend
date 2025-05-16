import React from "react";

const ProductTable = () => {
  const products = [
    {
      id: 1,
      name: "Nike Snookers",
      image: "https://placehold.co/39x39",
      orderId: "#HOR12345678",
      price: "500",
      unitsSold: "5",
      publishedDate: "05-05-2025",
    },
    {
      id: 2,
      name: "Nike Air Max",
      image: "https://placehold.co/39x39",
      orderId: "#HOR12345679",
      price: "450",
      unitsSold: "8",
      publishedDate: "05-04-2025",
    },
    {
      id: 3,
      name: "Adidas Superstar",
      image: "https://placehold.co/39x39",
      orderId: "#HOR12345680",
      price: "350",
      unitsSold: "12",
      publishedDate: "05-03-2025",
    },
    {
      id: 4,
      name: "Puma RS-X",
      image: "https://placehold.co/39x39",
      orderId: "#HOR12345681",
      price: "400",
      unitsSold: "6",
      publishedDate: "05-02-2025",
    },
    {
      id: 5,
      name: "Reebok Classic",
      image: "https://placehold.co/39x39",
      orderId: "#HOR12345682",
      price: "380",
      unitsSold: "9",
      publishedDate: "05-01-2025",
    },
    {
      id: 6,
      name: "New Balance 574",
      image: "https://placehold.co/39x39",
      orderId: "#HOR12345683",
      price: "420",
      unitsSold: "7",
      publishedDate: "04-30-2025",
    },
  ];

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
      <div className="h-96 overflow-x-auto scrollbar-hide overflow-y-auto w-full ">
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
                  {/* Item */}
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

                  {/* Order ID */}
                  <td className="w-40 px-4 py-3.5">
                    <div className="text-neutral-800 text-sm font-normal">
                      {product.orderId}
                    </div>
                  </td>

                  {/* Price with Naira symbol */}
                  <td className="w-28 px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <div className="text-neutral-800 text-sm font-bold">
                        ₦{product.price}
                      </div>
                    </div>
                  </td>

                  {/* Units Sold */}
                  <td className="px-4 py-3.5">
                    <div className="text-neutral-800 text-sm font-bold">
                      {product.unitsSold}
                    </div>
                  </td>

                  {/* Published Date */}
                  <td className="w-44 px-4 py-3.5">
                    <div className="text-neutral-800 text-sm font-normal">
                      {product.publishedDate}
                    </div>
                  </td>

                  {/* Options */}
                  <td className="px-4 py-3.5">
                    <button className="p-2 bg-neutral-100 rounded border border-neutral-300">
                      <div className="w-4 h-4 relative">
                        <div className="w-0.5 h-2.5 left-[7px] top-[3px] absolute bg-neutral-800"></div>
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;

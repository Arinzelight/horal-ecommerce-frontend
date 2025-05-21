// import React from "react";
import SectionHeader from "../../../components/SectionHeader";

// const ShopProducts = () => {
//   return (
//     <div>
//       <div className="max-w-full overflow-x-auto w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-[...] overflow-hidden">
//         <SectionHeader title="Add Product" />
//       </div>
//     </div>
//   );
// };

// export default ShopProducts;


import { useState } from "react";
import ProductList from "../../../components/ProductList";
import AddProduct from "./AddProduct";
import EmptyProductState from "../../../components/EmptyProduct";
import { mockProducts } from "../../../../data/mockProducts";

const ShopProducts = () => {
  const [activeTab, setActiveTab] = useState("myProduct");
  const [products, setProducts] = useState(mockProducts);

  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      //should be done on the backend
      id: Date.now(),
      status: true,
    };
    setProducts([...products, productWithId]);
    setActiveTab("myProduct");
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleToggleStatus = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, status: !product.status }
          : product
      )
    );
  };

  return (
    <div className=" max-w-full overflow-x-auto w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-[...] overflow-hidden">
      {/* Header */}
      {/* Display section title based on active tab */}
      {activeTab === "myProduct" ? (
        <SectionHeader title="My Products" />
      ) : (
        <SectionHeader title="Add Product" />
      )}
      {/* Tabs */}
      <div className="flex justify-between w-full items-center mb-4">
        <button
          className={`pb-2 px-4 font-medium w-full ${
            activeTab === "myProduct"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("myProduct")}
        >
          My Products
        </button>
        <button
          className={`pb-2 px-4 font-medium w-full ${
            activeTab === "addProduct"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("addProduct")}
        >
          Add Product
        </button>
      </div>

      {/* Content based on active tab */}
      <div>
        {activeTab === "myProduct" && (
          <>
            {products.length > 0 ? (
              <ProductList
                products={products}
                onDelete={handleDeleteProduct}
                onToggleStatus={handleToggleStatus}
              />
            ) : (
              <EmptyProductState
                onAddProduct={() => setActiveTab("addProduct")}
              />
            )}
          </>
        )}

        {activeTab === "addProduct" && (
          <>
            <AddProduct onAddProduct={handleAddProduct} />
          </>
        )}
      </div>
    </div>
  );
};

export default ShopProducts;


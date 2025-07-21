// import React from "react";
import SectionHeader from "../../../components/SectionHeader";

import { useEffect, useState } from "react";
import ProductList from "../../shop/shop-products/product-list/ProductList";
import AddProduct from "./add-product/AddProduct";
import EmptyProductState from "../../../components/EmptyProduct";
import useSeller from "../../../../hooks/useSeller";
import { fetchShopItems } from "../../../../redux/shop/shopThunk";
import { useSelector, useDispatch } from "react-redux"; // ✅ Add useDispatch

const ShopProducts = () => {
  const [activeTab, setActiveTab] = useState("myProduct");
  const seller = useSeller();
  const dispatch = useDispatch(); 
  const { items } = useSelector((state) => state.shop);
  const shop_id = seller.profile?.shop?.id;

  useEffect(() => {
    if (shop_id) {
      dispatch(fetchShopItems(shop_id)); 
    }
  }, [shop_id, dispatch]); 

  const handleAddProduct = async () => {
    if (shop_id) {
      dispatch(fetchShopItems(shop_id)); 
    }
    setActiveTab("myProduct"); 
  };

  const handleDeleteProduct = (productId) => {
    // dispatch(deleteProduct(productId)).then(() => dispatch(fetchShopItems(shop_id)));

    
    console.warn("Delete functionality needs backend integration");
  };

  const handleToggleStatus = (productId) => {
   //implement toggle status functionality later
    // dispatch(toggleProductStatus(productId)).then(() => dispatch(fetchShopItems(shop_id)));

    console.warn("Toggle status");
  };

  return (
    <div className=" max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-[...] overflow-hidden">
     
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
              ? "text-secondary border-b-2 border-orange-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("myProduct")}
        >
          My Products
        </button>
        <button
          className={`pb-2 px-4 font-medium w-full ${
            activeTab === "addProduct"
              ? "text-secondary border-b-2 border-orange-500"
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
            {/* ✅ Use items from Redux instead of local products state */}
            {items.length > 0 ? (
              <ProductList
                products={items} // ✅ Use items from Redux
                onDelete={handleDeleteProduct}
                onToggleStatus={handleToggleStatus}
              />
            ) : (
              <EmptyProductState
                animationSrc="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
                message="You do not have any product on record"
                actionButton={{
                  label: "Add Product",
                  onClick: () => setActiveTab("addProduct"),
                }}
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

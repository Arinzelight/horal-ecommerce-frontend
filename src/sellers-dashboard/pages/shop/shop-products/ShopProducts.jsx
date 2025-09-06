import SectionHeader from "../../../components/SectionHeader";
import { useEffect, useState } from "react";
import ProductList from "../../shop/shop-products/product-list/ProductList";
import AddProduct from "./add-product/AddProduct";
import EmptyProductState from "../../../components/EmptyProduct";
import useSeller from "../../../../hooks/useSeller";
import { fetchShopItems } from "../../../../redux/shop/shopThunk";
import { deleteProduct } from "../../../../redux/product/thunks/productThunk";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "../../../../components/toast";
import {
  clearDeleteSuccess,
  clearError,
  clearProduct,
} from "../../../../redux/product/slices/productSlice";
import { resetShop } from "../../../../redux/shop/shopSlice";
import InitialLoader from "../../../../components/InitialLoader";
import { fetchProductBySlug } from "../../../../redux/product/thunks/productThunk";

const ShopProducts = () => {
  const [activeTab, setActiveTab] = useState("myProduct");
  const [editingProductSlug, setEditingProductSlug] = useState(null); // Store slug
  const seller = useSeller();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.shop);
  const {
    deleting,
    deleteSuccess,
    error,
    product: currentProduct,
    loading: fetchingProduct,
    error: fetchProductError,
  } = useSelector((state) => state.products);

  const shop_id = seller.profile?.shop?.id;

  useEffect(() => {
    if (shop_id) {
      dispatch(resetShop());
      dispatch(fetchShopItems(shop_id));
    }
  }, [shop_id, dispatch]);

  // Handle delete success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Product deleted successfully!");
      dispatch(clearDeleteSuccess());
    }
  }, [deleteSuccess, dispatch]);

  const handleAddProduct = async () => {
    if (shop_id) {
      dispatch(fetchShopItems(shop_id));
    }
    setActiveTab("myProduct");
  };

  const handleUpdateProduct = async () => {
    if (shop_id) {
      dispatch(fetchShopItems(shop_id));
    }
    setEditingProductSlug(null);
    setActiveTab("myProduct");
    // Clear the current product from state
    dispatch(clearProduct());
  };

  const handleDeleteProduct = async (productId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // Find the product to get its category
      const productToDelete = items.find((item) => item.id === productId);
      if (!productToDelete) {
        toast.error("Product not found");
        return;
      }

      await dispatch(
        deleteProduct({
          category_name: productToDelete.category_name,
          id: productId,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleToggleStatus = (productId) => {
    // Implement toggle status functionality later
    console.warn("Toggle status functionality needs to be implemented");
  };

  const handleEditProduct = (productSlug) => {
    setEditingProductSlug(productSlug);
    setActiveTab("editProduct");
    // Fetch the product data by slug
    dispatch(fetchProductBySlug({ slug: productSlug }));
  };

  const handleCancelEdit = () => {
    setEditingProductSlug(null);
    setActiveTab("myProduct");
    // Clear the current product from state
    dispatch(clearProduct());
  };

  const getTabTitle = () => {
    if (activeTab === "editProduct") {
      return "Edit Product";
    } else if (activeTab === "addProduct") {
      return "Add Product";
    } else {
      return "My Products";
    }
  };

  const getTabContent = () => {
    if (activeTab === "editProduct") {
      // Show loading state while fetching product
      if (fetchingProduct) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="">
              <InitialLoader />
              <p className="text-center mt-2">Loading product details...</p>
            </div>
          </div>
        );
      }

      // Show error state if fetch failed
      if (fetchProductError) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">
                Error loading product: {fetchProductError}
              </p>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      }

      // Show edit form with fetched product data
      return (
        <AddProduct
          productToEdit={currentProduct} // Pass the actual product object, not the slug
          onUpdateProduct={handleUpdateProduct}
          onCancel={handleCancelEdit}
        />
      );
    } else if (activeTab === "addProduct") {
      return <AddProduct onAddProduct={handleAddProduct} />;
    } else {
      return (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="">
                <InitialLoader />
              </div>
            </div>
          ) : items.length > 0 ? (
            <ProductList
              products={items}
              onDelete={handleDeleteProduct}
              onEdit={handleEditProduct}
              onToggleStatus={handleToggleStatus}
              deleting={deleting}
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
      );
    }
  };

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg ">
      {/* Display section title based on active tab */}
      <SectionHeader title={getTabTitle()} />

      {/* Tabs - Only show when not editing */}
      {activeTab !== "editProduct" && (
        <div className="flex justify-between w-full items-center mb-4">
          <button
            className={`pb-2 px-4 font-medium w-full ${
              activeTab === "myProduct"
                ? "text-secondary border-b-2 border-secondary"
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
      )}

      {/* Content based on active tab */}
      <div>{getTabContent()}</div>
    </div>
  );
};

export default ShopProducts;

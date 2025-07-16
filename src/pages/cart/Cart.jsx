import React, { useState, useEffect } from "react";
import { FaChevronRight, FaSpinner, FaTrash } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import CartCard from "./CartCard";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import toast from "react-hot-toast";
import { useCart } from "../../hooks/useCart";
import { fetchWishlist } from "../../redux/wishlist/wishlistThunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRecentlyViewedProduct } from "../../redux/product/thunks/productThunk";
import { useCheckout } from "../../hooks/useCheckout";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("NGN", "₦");

const Cart = () => {
  const dispatch = useDispatch();
  const { handleCheckout, isCheckingOut } = useCheckout();
  const { data } = useSelector((state) => state.wishlist);
  const [isClearing, setIsClearing] = useState(false);
  const {
    cartItems,
    cartTotal: subtotal,
    itemCount,
    error,
    clearCart,
    loadCart,
  } = useCart();
  const { recentlyViewedProducts } = useSelector((state) => state.products);
  const wishlistItems = data?.items?.map((item) => item.product) || [];
  const wishlistCount = wishlistItems.length;
  const navigate = useNavigate();
  const viewedProducts = recentlyViewedProducts?.slice(0, 4) || [];

  useEffect(() => {
    dispatch(fetchUserRecentlyViewedProduct());
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleQuantityChange = (itemId, newQuantity) => {
    console.log(`Quantity changed for item ${itemId}: ${newQuantity}`);
  };

  const handleClearCart = async () => {
    if (isClearing || cartItems.length === 0) return;

    const confirmClear = window.confirm(
      "Are you sure you want to clear your entire cart? This action cannot be undone."
    );

    if (!confirmClear) return;

    setIsClearing(true);
    try {
      await clearCart();
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error(error.message || "Failed to clear cart. Please try again.");
    } finally {
      setIsClearing(false);
    }
  };

  const deliveryFee = itemCount > 0 ? 2000 : 0;
  const total = subtotal + deliveryFee;

  const EmptyCartMessage = () => (
    <div className="text-center py-16">
      <h2 className="text-[20px] text-gray-900 font-semibold mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-900 mb-4 text-[16px] font-medium">
        Looks like you haven't added anything yet.
      </p>
      <div className="text-6xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="mx-auto text-primary w-[60px] h-[60px]"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <circle cx="9.549" cy="19.049" r="1.701" />
            <circle cx="16.96" cy="19.049" r="1.701" />
            <path d="m5.606 5.555l2.01 6.364c.309.978.463 1.467.76 1.829c.26.32.599.567.982.72c.435.173.947.173 1.973.173h3.855c1.026 0 1.538 0 1.972-.173c.384-.153.722-.4.983-.72c.296-.362.45-.851.76-1.829l.409-1.296l.24-.766l.331-1.05a2.5 2.5 0 0 0-2.384-3.252zm0 0l-.011-.037a7 7 0 0 0-.14-.42a2.92 2.92 0 0 0-2.512-1.84C2.84 3.25 2.727 3.25 2.5 3.25" />
          </g>
        </svg>
      </div>
      <Link
        to="/products"
        className="bg-primary w-full md:w-90 text-white px-12 py-3 rounded-sm hover:opacity-85 transition inline-block"
      >
        Browse Products
      </Link>
    </div>
  );

  const ProductList = ({ title, items, link, showSeeAll = true }) => (
    <div className="mt-12 text-left">
      <div className="flex justify-between items-end border-b-[1.50px] border-neutral-400">
        <h2 className="text-neutral-900 text-xl font-bold">{title}</h2>
        {showSeeAll && (
          <Link
            to={link || "/products"}
            className="text-primary-500 hover:text-primary-700 flex items-center gap-1 w-fit pb-1"
          >
            See all <FaChevronRight size={16} />
          </Link>
        )}
      </div>
      <div className="pb-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );

  const CartContent = () => (
    <div className="flex sm:flex-col md:flex-col lg:flex-row flex-col md:justify-between gap-12 justify-start">
      <div className="flex-1 space-y-4 lg:w-[70%]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      </div>

      {itemCount > 0 && (
        <div className="w-full lg:w-[28%] flex flex-col gap-4">
          <div className="bg-white shadow-sm p-4 sticky top-4">
            <h2 className="font-semibold mb-4 border-b">Cart Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-3">Sub-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-3">Delivery Fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={itemCount === 0 || isCheckingOut}
              className={`w-full bg-secondary text-white py-3 rounded-lg mt-4 flex items-center justify-center hover:opacity-85 whitespace-nowrap ${
                itemCount === 0 || isCheckingOut
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isCheckingOut ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Checkout
                  <MdOutlineShoppingCartCheckout size={18} className="ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen lg:mx-auto">
      <div className="pt-8 mb-8">
        <h1 className="border-b-[1.50px] border-gray-200 mb-6 pb-2 text-neutral-900 text-xl font-bold">
          Cart ({itemCount})
        </h1>

        {itemCount === 0 ? (
          <>
            <EmptyCartMessage />
            {wishlistCount > 0 ? (
              <ProductList
                title="My Wishlist"
                link="/wishlist"
                items={wishlistItems}
              />
            ) : (
              <ProductList title="Recently viewed" items={viewedProducts} />
            )}
          </>
        ) : (
          <>
            <CartContent />
            {viewedProducts.length > 0 && (
              <ProductList
                title={`Recently Viewed (${viewedProducts.length})`}
                items={viewedProducts}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;

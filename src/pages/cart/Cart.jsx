import React, { useState, useEffect } from "react";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import { mockWishlistItems } from "../../data/cartData";
import CartCard from "./CartCard";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, fetchCart } from "../../redux/cart/thunk/cartThunk";
import toast from "react-hot-toast";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("NGN", "₦");
};

const products = [
  {
    id: 1,
    title: "iPhone XS ProMax | Phantom Black",
    price: 50000.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    category_object: { category: { name: "Gadgets" } },
    condition: "brand_new",
    state: "Lagos",
    local_govt: "Ikorodu",
    rating: 4.5,
    isHot: true,
    isVerified: true,
  },
  {
    id: 2,
    title: "Nike Super Fast Sneaker | Phantom Black",
    price: 50000.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      },
    ],
    category_object: { category: { name: "Fashion" } },
    condition: "brand_new",
    state: "Oyo",
    local_govt: "Dugbe",
    rating: 4.4,
    isHot: true,
    isVerified: true,
  },
  {
    id: 3,
    title: "Lux Kids Wrist Watch | Phantom Black",
    price: 50000.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
      },
    ],
    category_object: { category: { name: "Gadgets" } },
    condition: "brand_new",
    state: "Oyo",
    local_govt: "Bodija",
    rating: 4.3,
    isHot: true,
    isVerified: true,
  },
  {
    id: 4,
    title: "OGOO Hero Bus | White & Black",
    price: 50000.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    category_object: { category: { name: "Vehicles" } },
    condition: "brand_new",
    state: "Sokoto",
    local_govt: "Kaba",
    rating: 4.5,
    isHot: true,
    isVerified: true,
  },
];

const Cart = () => {
  const [wishlistItems] = useState(mockWishlistItems);
  const [isClearing, setIsClearing] = useState(false);
  const dispatch = useDispatch();
  const {
    id: cartId,
    items: cartItems,
    error,
    total_price,
  } = useSelector((state) => state.cart);

  // Fetch cart items on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleQuantityChange = (itemId, newQuantity) => {
    console.log(`Quantity changed for item ${itemId}: ${newQuantity}`);
  };

  const handleClearCart = async () => {
    if (isClearing || cartItems.length === 0 || !cartId) return;

    const confirmClear = window.confirm(
      "Are you sure you want to clear your entire cart? This action cannot be undone."
    );

    if (!confirmClear) return;

    setIsClearing(true);

    try {
      await dispatch(deleteCart({ cart_id: cartId })).unwrap();
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error(error.message || "Failed to clear cart. Please try again.");
    } finally {
      setIsClearing(false);
    }
  };

  // Calculate subtotal from cart items
  const subtotal = total_price || 0;
  const deliveryFee = cartItems.length > 0 ? 2000 : 0;
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
        aria-label="Go to product category page"
        className="bg-primary w-full md:w-90 text-white px-12 py-3 rounded-sm hover:opacity-85 transition inline-block"
      >
        Browse Products
      </Link>
    </div>
  );

  const ProductList = ({ title, items, showSeeAll = true }) => (
    <div className="mt-12 text-left">
      <div className="flex justify-between items-end border-b-[1.50px] border-neutral-400  ">
        <h2 className="text-neutral-900 text-xl font-bold">{title}</h2>
        {showSeeAll && (
          <Link
            to="/wishlist"
            className="text-primary-500 hover:text-primary-700 flex items-center gap-1 w-fit pb-1"
          >
            See all <FaChevronRight size={16} />
          </Link>
        )}
      </div>
      <div className="pb-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );

  const CartContent = () => (
    <div className="flex sm:flex-col md:flex-col lg:flex-row flex-col md:justify-between gap-12 justify-start">
      <div className="flex-1 space-y-4 lg:w-[70%]">
        {cartItems.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={handleClearCart}
              disabled={isClearing || !cartId}
              className="flex items-center gap-2 px-2 py-1 lg:px-4 lg:py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaTrash size={14} />
              {isClearing ? "Clearing..." : "Clear Cart"}
            </button>
          </div>
        )}

        {/* Cart Items */}
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

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="w-full lg:mt-15 lg:w-[28%] flex flex-col gap-4">
          <div className="bg-white shadow-sm p-4 sticky top-4">
            <h2 className="font-semibold mb-4 border-b">Order Summary</h2>
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
            <Link
              to="/checkout"
              className={`w-full bg-secondary text-white py-3 rounded-lg mt-4 flex items-center justify-center hover:opacity-85 whitespace-nowrap ${
                cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => {
                if (cartItems.length === 0) {
                  e.preventDefault();
                }
              }}
            >
              Proceed to Payment
              <MdOutlineShoppingCartCheckout size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen lg:mx-auto">
      <div className="pt-8">
        <h1 className="border-b-[1.50px] border-neutral-400 mb-6 pb-2 text-neutral-900 text-xl font-bold">
          My Shopping Cart ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <>
            <EmptyCartMessage />
            {wishlistItems.length > 0 ? (
              <ProductList title="My Wishlist" items={wishlistItems} />
            ) : (
              <ProductList title="Top Selling Products" items={products} />
            )}
          </>
        ) : (
          <>
            <CartContent />
            {wishlistItems.length > 0 && (
              <ProductList
                title={`My Wishlist (${wishlistItems.length})`}
                items={wishlistItems}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;

import React, { useState } from "react";
import {
  FaTimes,
  FaMinusCircle,
  FaPlusCircle,
  FaChevronRight,
} from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import ProductCard from "../../components/ProductCard";
import useMobile from "../../hooks/use-mobile";
import { Link } from "react-router-dom";
import { mockCartItems, mockWishlistItems } from "../../data/cartData";
import CartCard from "./CartCard";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

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

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [wishlistItems] = useState(mockWishlistItems);
  const isMobile = useMobile();

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const deliveryFee = 2000;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 lg:max-w-6xl lg:mx-auto lg:px-12 mt-8">
        <h1 className="text-[20px] font-bold mb-8 border-b">
          My Shopping Cart (0)
        </h1>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 inline-block"
          >
            Browse Products
          </Link>

          {wishlistItems.length > 0 && (
            <div className="mt-16 text-left">
              <h2 className="text-xl font-bold mb-6">Top Selling Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wishlistItems.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
              <Link
                to="/wishlist"
                className="text-blue-500 hover:text-blue-600 flex items-center gap-1 mt-4 w-fit"
              >
                See all <FaChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 lg:max-w-6xl mx-4 lg:mx-auto lg:px-12 mt-8">
      <h1 className="text-[20px] font-bold mb-8 border-b">
        My Shopping Cart ({cartItems.length})
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <div className="lg:w-80">
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
            <button className="w-full bg-secondary text-white py-3 rounded-lg mt-4 hover:bg-orange-600 flex items-center justify-center">
              Proceed to Payment
              <MdOutlineShoppingCartCheckout size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {wishlistItems.length > 0 && (
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              My Wishlist ({wishlistItems.length})
            </h2>
            <Link
              to="/wishlist"
              className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              See all <FaChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wishlistItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;

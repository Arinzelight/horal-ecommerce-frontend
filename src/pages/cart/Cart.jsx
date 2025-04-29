import React from "react";
import { cartItems, wishlistItems } from "../../data/cartData";
import { FaTimes, FaMinusCircle, FaPlusCircle, FaChevronRight } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
const CartPage = () => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 2000;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">
        My Shopping Cart ({cartItems.length})
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything yet.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[200px] h-[211px] object-cover rounded-lg"
                    />
                    <div className="flex-1 bg-white">
                      <div className="font-semibold">
                        ₦{item.price.toLocaleString()}
                      </div>
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaTimes size={20} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <span>{item.condition}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-4">
                        <CiStar
                          className="fill-yellow-400 text-yellow-400"
                          size={16}
                        />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">
                          View Product
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <FaMinusCircle size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <FaPlusCircle size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sub-total</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 hover:bg-orange-600">
                Proceed to Payment
              </button>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Delivery Option</h3>
                <button className="w-full border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50">
                  <span>Contact Seller</span>
                  <FaChevronRight size={20} />
                </button>
                <button className="w-full border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50">
                  <span>Use Horal Logistics</span>
                  <FaChevronRight size={20} />
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Returns & Refunds Policy</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Return items within 14 days of delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Must be unused & in original condition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Refund processed within 5-7 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Section */}
      {cartItems.length > 0 && wishlistItems.length > 0 && (
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              My Wishlist ({wishlistItems.length})
            </h2>
            <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
              See all <FaChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-medium mb-2">{item.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <span>{item.condition}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <CiStar
                    className="fill-yellow-400 text-yellow-400"
                    size={16}
                  />
                  <span className="text-sm">{item.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-semibold">
                    ₦{item.price.toLocaleString()}
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

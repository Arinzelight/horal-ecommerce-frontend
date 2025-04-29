import React from "react";
import { Link } from "react-router-dom";
import { SlBadge } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { FaTimes, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const CartCard = ({ item }) => {
  const [quantity, setQuantity] = React.useState(item.quantity || 1);

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="px-1 relative ">
      <div className="flex flex md:flex-row gap-4">
        {/* Product Image */}
        <div className="w-full md:w-auto">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full md:w-[200px] h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="mb-1">
            <div className="text-base font-semibold text-blue-600">
              ₦ {item?.price?.toLocaleString("en-NG")}
            </div>
            <h3 className="font-medium text-sm">{item.name}</h3>
            {/* Close button */}
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <CiStar className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="text-xs">{item.rating}</span>
          </div>

          <div className="flex flex-wrap gap-x-1 text-xs">
            <span className="text-blue-600">{item.brand}</span>
            <span className="text-gray-600">{item.location}</span>
          </div>

          <div className="mt-3">
            <Link
              to={`/product/${item.id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              View Product
            </Link>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col md:flex-col  mt-12 items-end">
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="text-sm font-medium text-gray-700 md:mb-2">
              Quantity
            </div>
            <div>
              <button
                onClick={handleQuantityDecrease}
                className="p-1 hover:bg-gray-100 rounded text-blue-500"
                aria-label="Decrease quantity"
              >
                <FaMinusCircle size={20} />
              </button>
              <span className="text-base font-medium w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={handleQuantityIncrease}
                className="p-1 hover:bg-gray-100 rounded text-blue-500"
                aria-label="Increase quantity"
              >
                <FaPlusCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

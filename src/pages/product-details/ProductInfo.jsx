import { useState } from "react"
import { FaStar, FaRegStar, FaStarHalfAlt, FaCheck, FaPlusCircle, FaMinusCircle } from "react-icons/fa"


export default function ProductInfo({
  name,
  category,
  rating,
  reviews,
  price,
  colors = [],
  sizes = [],
}) {
  const [selectedColor, setSelectedColor] = useState(colors[0] || null)
  const [selectedSize, setSelectedSize] = useState(sizes[1] || null)
  const [quantity, setQuantity] = useState(1)

  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const renderRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-secondary" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-secondary" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-secondary" />)
      }
    }
    return stars
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">{name}</h1>
      <p className="text-gray-600 mb-2 text-sm">{category}</p>

      {/* Ratings */}
      <div className="flex items-center mb-4">
        <div className="flex mr-2">{renderRatingStars(rating)}</div>
        <span className="text-gray-600 text-sm">({reviews || 0} Reviews)</span>
      </div>

      {/* Price */}
      <div className="text-2xl font-bold mb-4 mt-12">
        ₦{" "}
        {price.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
        })}
      </div>

      {/* Color options */}
      {colors.length > 0 && (
        <div className="my-8">
          <div className="flex justify-between items-center mb-5 mr-12">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-bold">Available color</div>
              <div className="flex space-x-4">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedColor === color ? "ring-2 ring-secondary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorSelect(color)}
                    aria-label={color.name}
                  >
                    {selectedColor === color && <FaCheck className="text-white text-xs" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-sm font-bold -ml-4">Quantity</div>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="w-6 h-6 text-xl flex items-center justify-center rounded-full"
                >
                  <FaMinusCircle className="text-xl text-primary" />
                </button>
                <span className="w-8 text-center text-xl font-semibold">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-6 h-6 text-xl flex items-center justify-center rounded-full"
                >
                  <FaPlusCircle className="text-xl text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Size options */}
      {sizes.length > 0 && (
        <div className="mb-6 mt-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Available Size: <span className="font-normal">{selectedSize}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-1 text-sm rounded-4xl border ${
                  selectedSize === size ? "bg-primary text-white" : "bg-white text-gray-800 border-primary"
                }`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex mt-12 flex-col sm:flex-row gap-3 mb-8">
        <button className="flex-1 bg-secondary hover:bg-orange-700 text-white py-3 rounded-md font-medium transition-colors">
          Add to Cart
        </button>
        <button className="flex-1 text-orange border border-secondary text-secondary hover:border-gray-400 py-3 rounded-md font-medium transition-colors">
          Add to Wishlist
        </button>
      </div>
    </div>
  )
}

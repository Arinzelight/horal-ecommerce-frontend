import { useState, useEffect } from "react";
import Nike1 from "../../assets/images/bag1.png";
import Nike2 from "../../assets/images/lapy1.png";
import Nike3 from "../../assets/images/shirt1.png";
import Nike4 from "../../assets/images/bag1.png";
import { FaFire } from "react-icons/fa";

const hotProducts = [
  {
    id: 1,
    title: "Rivr Coated Bag",
    category: "Fashion",
    price: 125000,
    image: Nike1,
    location: "Calabar",
    condition: "New",
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max",
    category: "Electronics",
    price: 750000,
    image: Nike2,
    location: "Lagos",
    condition: "New",
  },
  {
    id: 3,
    title: "Nike Air Jordan",
    category: "Fashion",
    price: 85000,
    image: Nike3,
    location: "Abuja",
    condition: "New",
  },
  {
    id: 4,
    title: "MacBook Pro M2",
    category: "Electronics",
    price: 950000,
    image: Nike4,
    location: "Lagos",
    condition: "New",
  },
];

const bgColors = [
  "bg-emerald-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-blue-500",
];

const HotProductBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % hotProducts.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentProduct = hotProducts[currentIndex];

  return (
    <div className="w-full  max-w-full mx-auto">
      <div className={`relative mb-8  ${bgColors[currentIndex]}`}>
        {/* Hot Price Tag */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center bg-red-500 text-white px-2 py-1 rounded-full shadow-lg">
            <span className="font-bold mr-1 text-sm whitespace-nowrap">
              Hot Price
            </span>
            <FaFire className="text-yellow-300" />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 md:p-8 lg:p-8 h-[170px] md:h-[190px] lg:h-[230px] mt-3">
          {/* Product Info */}
          <div className="flex-1 pr-2 md:mx-16 lg:mx-16">
            <h3 className="text-xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2 lg:mb-4 truncate">
              {currentProduct.title}
            </h3>
            <p className="text-white/80 mb-1 md:mb-2 text-sm md:text-base lg:text-lg">
              {currentProduct.category}
            </p>
            <div className="flex gap-2 mb-4">
              <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">
                {currentProduct.condition}
              </span>
              <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">
                {currentProduct.location}
              </span>
            </div>
            <div className="flex items-center gap-4 md:gap-4 lg:gap-8">
              <span className="text-xl mb-2 md:text-5xl lg:text-6xl whitespace-nowrap font-bold text-white">
                ₦{currentProduct.price.toLocaleString()}
              </span>
              <button className="bg-secondary text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors whitespace-nowrap">
                Shop now
              </button>
            </div>
          </div>

          {/* Product Image */}
          <div
            className={`w-1/2 md:w-1/3 md:mx-16 lg:mx-18 transition-all duration-500 transform ${
              isAnimating
                ? "-translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="w-full h-auto object-contain max-h-[130px] sm:h-[300px] md:max-h-[160px] lg:max-h-[190px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProductBanner;

// import { useState, useEffect, useRef } from "react"
// import { FaFire } from "react-icons/fa"
// import Nike1 from "../../assets/images/nike1.png";
// import Nike2 from "../../assets/images/lapy1.png";
// import Nike3 from "../../assets/images/shirt1.png";
// import Nike4 from "../../assets/images/bag1.png";
// import { FaFire } from "react-icons/fa";

// // Sample products (you can replace this with your actual data)
// const sampleProducts = [
//   {
//     id: "1",
//     name: "Rivr Coated Bag",
//     category: "Fashion",
//     price: 125000,
//     image: Nike1,
//     isNew: true,
//     location: "Calabar",
//   },
//   {
//     id: "2",
//     name: "Premium Watch",
//     category: "Accessories",
//     price: 85000,
//     image: Nike2,
//     location: "Lagos",
//   },
//   {
//     id: "3",
//     name: "Wireless Headphones",
//     category: "Electronics",
//     price: 45000,
//     image: Nike3,
//     isNew: true,
//     location: "Abuja",
//   },
//   {
//     id: "4",
//     name: "Designer Sneakers",
//     category: "Footwear",
//     price: 65000,
//     image: Nike4,
//     location: "Port Harcourt",
//   },
//   {
//     id: "5",
//     name: 'Smart TV 55"',
//     category: "Electronics",
//     price: 350000,
//     image: Nike1,
//     isNew: true,
//     location: "Kano",
//   },
//   {
//     id: "6",
//     name: "Leather Wallet",
//     category: "Accessories",
//     price: 15000,
//     image: Nike3,
//     location: "Enugu",
//   },
// ]

// // Background colors to rotate through
// const backgroundColors = [
//   "bg-blue-500", // Blue
//   "bg-purple-500", // Purple
//   "bg-yellow-500", // Yellow
//   "bg-green-500", // Green
// ]

// export default function HotProductBanner({ products = sampleProducts, interval = 5000 }) {
//   // State for the currently displayed product
//   const [currentProductIndex, setCurrentProductIndex] = useState(0)
//   const [selectedProducts, setSelectedProducts] = useState([])
//   const [showImage, setShowImage] = useState(true)
//   const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0])
//   const timerRef = useRef(null)

//   // Select 4 random products on component mount
//   useEffect(() => {
//     if (products.length > 0) {
//       // Shuffle and select up to 4 products
//       const shuffled = [...products].sort(() => 0.5 - Math.random())
//       setSelectedProducts(shuffled.slice(0, Math.min(4, products.length)))
//     }
//   }, [products])

//   // Rotate through products
//   useEffect(() => {
//     if (selectedProducts.length === 0) return

//     // Function to update the current product
//     const rotateProduct = () => {
//       setShowImage(false) // Hide image for animation

//       // Wait for animation to complete before changing product
//       setTimeout(() => {
//         setCurrentProductIndex((prev) => (prev + 1) % selectedProducts.length)
//         setBackgroundColor(backgroundColors[currentProductIndex])
//         setShowImage(true) // Show image with animation
//       }, 500)
//     }

//     // Set up the interval
//     timerRef.current = setInterval(rotateProduct, interval)

//     // Clean up on unmount
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current)
//       }
//     }
//   }, [selectedProducts, currentProductIndex, interval])

//   // If no products are selected yet, show loading or nothing
//   if (selectedProducts.length === 0) {
//     return null
//   }

//   const product = selectedProducts[currentProductIndex]
//   const formattedPrice = new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   })
//     .format(product.price)
//     .replace("NGN", "N")

//   return (
//     <div className="relative mt-8 mb-8 ">
//       {/* Hot Price Tag */}
//   <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
//     <div className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
//       <span className="font-bold mr-1">Hot Price</span>
//       <FaFire className="text-yellow-300" />
//     </div>
//   </div>

//       {/* Product Banner */}
//       <div
//         className={`relative overflow-hidden rounded-lg shadow-xl transition-colors duration-1000 ${backgroundColor}`}
//       >
//         <div className="flex md:flex-row p-6 items-center">
//           {/* Product Info */}
//           <div className="flex-1 text-white mb-6 md:mb-0">
//             <h2 className="text-4xl font-bold mb-1">{product.name}</h2>
//             <p className="text-xl mb-4">{product.category}</p>

//             <div className="flex gap-2 mb-6">
//               {product.isNew && <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">New</span>}
//               {product.location && (
//                 <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">{product.location}</span>
//               )}
//             </div>

//             <div className="mb-6">
//               <span className="text-5xl font-bold">{formattedPrice}</span>
//             </div>

//             <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
//               Shop now
//             </button>
//           </div>

//           {/* Product Image */}
//           <div className="w-full md:w-1/2 flex justify-center">
//             <div
//               className={`transition-all duration-500 transform ${
//                 showImage ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
//               }`}
//             >
//               <img
//                 src={product.image || "/placeholder.svg"}
//                 alt={product.name}
//                 className="max-h-[250px] object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

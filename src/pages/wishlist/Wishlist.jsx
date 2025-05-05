import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import { mockWishlistItems } from "../../data/cartData";
import WishlistCard from "./WishlistCard";
import { FaRegHeart } from "react-icons/fa";

const Wishlist = () => {
  const [wishlistItems] = useState(mockWishlistItems);

    return (
      <main className="min-h-screen bg-gray-50 lg:max-w-6xl lg:mx-auto lg:px-12 mt-8">
        <h1 className="text-[20px] font-bold mb-8 border-b">
          {wishlistItems.length === 0
            ? "My Wishlist (0)"
            : `My Wishlist (${wishlistItems.length})`}
        </h1>
        <div>
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold mb-2">
                Save the items you love and shop later
              </h2>
              <div className="text-6xl mb-4">
                <FaRegHeart className="mx-auto text-primary w-[60px] h-[60px]" />
              </div>
              <p className="text-gray-600 mb-8">
                You haven't added any item yet.
              </p>
              <p>Tap the heart icon on any product to add it here</p>
              <Link
                to="/"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 inline-block"
              >
                Start SHopping
              </Link>

            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                {wishlistItems.map((item) => (
                  <WishlistCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 text-left">
                  <h2 className="text-xl font-bold mb-6">You May Like</h2>
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
      </main>
    );
  }

//   return (
//     <main className="min-h-screen bg-gray-50 lg:max-w-6xl mx-4 lg:mx-auto lg:px-12 mt-8">
//       <h1 className="text-[20px] font-bold mb-8 border-b">
//         My My Wishlist ({wishlistItems.length})
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-6">
//         <div className="flex-1 space-y-4">
//           {wishlistItems.map((item) => (
//             <CartCard key={item.id} item={item} />
//           ))}
//         </div>
//       </div>

//       {wishlistItems.length > 0 && (
//         <div className="mt-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold">
//               My Wishlist ({wishlistItems.length})
//             </h2>
//             <Link
//               to="/wishlist"
//               className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
//             >
//               See all <FaChevronRight size={16} />
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {wishlistItems.map((item) => (
//               <ProductCard key={item.id} product={item} />
//             ))}
//           </div>
//         </div>
//       )}
//     </main>
//   );

export default Wishlist;

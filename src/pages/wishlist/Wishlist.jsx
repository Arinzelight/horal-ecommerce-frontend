import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import { mockWishlistItems } from "../../data/cartData";
import WishlistCard from "./WishlistCard";
import { FaRegHeart } from "react-icons/fa";
import SimilarProducts from "../../components/SimilarProduct";

const products = [
  {
    id: 1,
    name: "iPhone XS ProMax | Phantom Black",
    price: 50000.0,
    image:
      "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?auto=format&fit=crop&w=800&q=80",
    category: "Gadgets",
    condition: "Brand New",
    location: "Lagos",
    localGvt: "Ikorodu",
    rating: 4.5,
    isHot: true,
    isVerified: true,
  },
  {
    id: 2,
    name: "Nike Super Fast Sneaker | Phantom Black",
    price: 50000.0,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    condition: "Brand New",
    location: "Oyo",
    localGvt: "Dugbe",
    rating: 4.4,
    isHot: true,
    isVerified: true,
  },
  {
    id: 3,
    name: "Lux Kids Wrist Watch | Phantom Black",
    price: 50000.0,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    category: "Gadgets",
    condition: "Brand New",
    location: "Oyo",
    localGvt: "Bodija",
    rating: 4.3,
    isHot: true,
    isVerified: true,
  },
  {
    id: 4,
    name: "OGOO Hero Bus | White 7 Black",
    price: 50000.0,
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    category: "Vehicles",
    condition: "Brand New",
    location: "Sokoto",
    localGvt: "Kaba",
    rating: 4.5,
    isHot: true,
    isVerified: true,
  },
];

const Wishlist = () => {
  const [wishlistItems] = useState(mockWishlistItems);

  const EmptyCartMessage = () => (
    <div className="text-center py-16">
      <h2 className="text-xl text-gray-900 font-semibold mb-2">
        Save the items you love and shop later
      </h2>
      <div className="text-6xl mb-4">
        <FaRegHeart className="mx-auto text-primary w-[60px] h-[60px]" />
      </div>
      <h6 className="text-gray-900 mb-2 text-base font-medium">
        You haven't added any item yet.
      </h6>
      <p className="text-gray-600 mb-4">
        Tap the heart icon on any product to add it here
      </p>

      <Link
        to="/category"
        className="bg-primary w-full md:w-90 text-white px-12 py-3 rounded-sm hover:opacity-85 transition inline-block"
      >
        Browse Products
      </Link>
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">
        My Wishlist ({wishlistItems.length})
      </h1>

      {wishlistItems.length === 0 ? (
        <EmptyCartMessage />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {wishlistItems.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Recommended Products Section */}
      <div className="mt-12">
        {/* write logic to get similar products as products in wishlist */}
        <SimilarProducts products={products} title={"You May Also Like"} link={"/wishlist"} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
